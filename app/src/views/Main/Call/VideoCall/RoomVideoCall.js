import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, PermissionsAndroid, Platform, View } from "react-native";
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
} from "react-native-agora";
import axios from "axios";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../../Context/Socket";
import { AddMemberInGroup } from "../../../../helper/services/AddMemberInGroup";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";

// Components
import Header from "./RoomVideoCallUtils/Header";
import ActionsCard from "./RoomVideoCallUtils/ActionsCard";
import VideoCallScreen from "./RoomVideoCallUtils/VideoCallScreen";
import FeedbackScreen from "./RoomVideoCallUtils/FeedbackScreen";

export default function RoomVideoCall() {
  const { setOptions, goBack } = useNavigation();
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    console.log("SocketStatus", socket.connected);

    socket.on("Room Video Call Error", (error) => {
      console.log("error--------->room erroe", error);
    });
    socket.on("connect_error", (error) => {
      console.log("connect_error------------connect err", error);
    });

    socket.on("reconnect", (attempt) => {
      console.log("attempt err", attempt);
    });
  }, [socket]);

  const {
    systemUserId,
    name,
    currentUser: { mobile, firstName },
    currentUser,
    avtarUrl,
  } = useSelector((state) => state.registry);

  const { params } = useRoute();
  const [room, setRoom] = React.useState(params?.room);
  const [userCount, setUserCount] = React.useState(0);
  React.useEffect(() => {
    if (params?.room) {
      setRoom(params?.room);
    }
    if (params?.checkUser) {
      AddMemberInGroup({
        chatroomId: room?.chatroomId,
        groupId: room?.id,
        toUserId: params?.checkUser?.[0]?.id,
      })
        .then((res) => {
          setUserCount(userCount + 1);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [params]);

  const getUid = React.useCallback(() => {
    if (mobile.length > 7) {
      let reverseMobile = mobile.split("").reverse();
      let newMobile = reverseMobile.slice(0, 7);
      return parseInt(newMobile.reverse().join(""));
    } else {
      return parseInt(mobile);
    }
  }, [mobile]);

  const getUserUid = React.useCallback(
    (userMobile) => {
      if (userMobile.length > 7) {
        let reverseMobile = userMobile.split("").reverse();
        let newMobile = reverseMobile.slice(0, 7);
        return parseInt(newMobile.reverse().join(""));
      } else {
        return parseInt(userMobile);
      }
    },
    [mobile]
  );

  const [config, setConfig] = React.useState({
    appId: "444b62a2786342678d99ace84ace53c5",
    token: null,
    channelId: room?.chatroomId,
    uid: getUid(),
    stringUid: "0",
  });

  let [_engine, setEngine] = React.useState();
  const [state, setState] = React.useState({
    channelId: room?.chatroomId,
    isJoined: false,
    remoteUid: [],
    switchCamera: true,
    switchRender: true,
  });
  const [currentView, setCurrentView] = React.useState("members");
  const [actionState, setActionState] = React.useState({
    video: true,
    mic: true,
    voice: false,
    camera: true,
  });
  const [groupActionState, setGroupActionState] = React.useState({});
  const [feedbackData, setFeedbackData] = React.useState([]);
  const [raisHandTimer, setRaisHandTimer] = React.useState(false);
  const [emojiTimer, setEmojiTimer] = React.useState(false);

  const _initEngine = React.useCallback(async () => {
    if (_engine) {
      _addListeners();
      await _engine.enableVideo();
      await _engine.startPreview();
      await _engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
      await _engine.setClientRole(ClientRole.Broadcaster);
      _joinChannel();
    } else {
      let engine = await RtcEngine.createWithContext(
        new RtcEngineContext(config.appId)
      );
      setEngine(engine);
    }
  }, [_engine, _joinChannel]);

  const _addListeners = React.useCallback(() => {
    _engine?.addListener("Warning", (warningCode) => {
      console.info("Warning", warningCode);
    });
    _engine?.addListener("Error", (errorCode) => {
      console.info("Error", errorCode);
    });
    _engine?.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
      console.info("JoinChannelSuccess", channel, uid, elapsed);
      setState((prev) => ({ ...prev, isJoined: true }));
    });
    _engine?.addListener("UserJoined", (uid, elapsed) => {
      console.info("UserJoined", uid, elapsed);

      setState((prev) => ({ ...prev, remoteUid: [...prev.remoteUid, uid] }));
    });
    _engine?.addListener("UserOffline", (uid, reason) => {
      setState((prev) => ({
        ...prev,
        remoteUid: prev.remoteUid.filter((value) => value !== uid),
      }));
    });
    _engine?.addListener("LeaveChannel", (stats) => {
      setState((prev) => ({ ...prev, isJoined: false, remoteUid: [] }));
    });
  }, [_engine]);

  const _joinChannel = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
    await _engine?.joinChannel(config.token, state.channelId, null, config.uid);
  };

  const _leaveChannel = async () => {
    await _engine?.leaveChannel();
    goBack();
  };

  const getToken = React.useCallback(() => {
    console.warn(
      `https://agora.banjee.org/rtc/${
        room?.chatroomId
      }/publisher/uid/${getUid()}/`
    );
    axios
      .get(
        `https://agora.banjee.org/rtc/${
          room?.chatroomId
        }/publisher/uid/${getUid()}/`
      )
      .then((res) => {
        setConfig((prev) => ({ ...prev, token: res.data.rtcToken }));

        setTimeout(() => {
          _initEngine();
        }, 2000);
      })
      .catch((err) => {
        console.warn("----------------->", JSON.stringify(err, null, 2));
      });
  }, [_initEngine, getUid]);

  const getRoomStatusApiCall = React.useCallback(async () => {
    if (room) {
      try {
        const result = await axios.get(
          "https://gateway.banjee.org/services/message-broker/api/live-group/" +
            room?.chatroomId
        );
        if (result && result.data && result.data.onCall) {
          socket.emit("SIGNALLING_SERVER", {
            roomId: room?.chatroomId,
            fromUserId: currentUser?.id,
            initiator: {
              ...currentUser,
              avtarImageUrl: avtarUrl,
              firstName: firstName ? firstName : name,
              username: name,
            },
            eventType: result.data.onCall.length > 0 ? "ENTER" : "JOIN",
            iceCandidate: null,
            offer: null,
            answer: null,
            mediaStream: null,
            responseMessage: "Room joined succesfully",
            callDuration: null,
            callType: "group",
            groupName: null,
            toAvatarSrc: null,
            groupMemberCounts: 0,
            groupCreatorId: null,
            addToCall: false,
          });
        }
      } catch (err) {
        console.log("errr", err);
      }
    }
  }, [room]);

  React.useEffect(() => {
    getToken();
    getRoomStatusApiCall();
    setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Header
          chatroomId={room?.chatroomId}
          groupName={room?.groupName}
          roomUserCount={room?.connectedUsers?.length}
          userCount={userCount}
          goBack={goBack}
          _leaveChannel={_leaveChannel}
          profileUrlSrc={room?.imageContent?.src}
        />
      ),
    });
    return () => {
      _engine?.destroy();
    };
  }, [getToken, userCount, getRoomStatusApiCall]);

  React.useEffect(() => {
    socket.on("VIDEO_MUTE", (result) => {
      console.log("socket video_mute recive");
      setGroupActionState((prev) => ({
        ...prev,
        [getUserUid(result.initiator.mobile)]: {
          ...prev[getUserUid(result.initiator.mobile)],
          video: true,
          avtarImageUrl: result.initiator.avtarImageUrl,
          name: result?.initiator?.firstName
            ? result?.initiator?.firstName
            : result?.initiator?.username
            ? result?.initiator?.username
            : "",
          userObj: result,
        },
      }));
    });
    socket.on("VIDEO_UNMUTE", (result) => {
      console.log("socket video_unmute recive");
      setGroupActionState((prev) => ({
        ...prev,
        [getUserUid(result.initiator.mobile)]: {
          ...prev[getUserUid(result.initiator.mobile)],
          video: false,
          avtarImageUrl: result.initiator.avtarImageUrl,
          name: result?.initiator?.firstName
            ? result?.initiator?.firstName
            : result?.initiator?.username
            ? result?.initiator?.username
            : "",
          userObj: result,
        },
      }));
    });
    socket.on("MUTE", (result) => {
      console.log("socket audio_mute recive");
      setGroupActionState((prev) => ({
        ...prev,
        [getUserUid(result.initiator.mobile)]: {
          ...prev[getUserUid(result.initiator.mobile)],
          audio: true,
          avtarImageUrl: result.initiator.avtarImageUrl,
          name: result?.initiator?.firstName
            ? result?.initiator?.firstName
            : result?.initiator?.username
            ? result?.initiator?.username
            : "",
          userObj: result,
        },
      }));
    });
    socket.on("UNMUTE", (result) => {
      console.log("socket audio_unmute recive");
      setGroupActionState((prev) => ({
        ...prev,
        [getUserUid(result.initiator.mobile)]: {
          ...prev[getUserUid(result.initiator.mobile)],
          audio: false,
          avtarImageUrl: result.initiator.avtarImageUrl,
          name: result?.initiator?.firstName
            ? result?.initiator?.firstName
            : result?.initiator?.username
            ? result?.initiator?.username
            : "",
          userObj: result,
        },
      }));
    });
    socket.on("RAISE_HAND", (result) => {
      console.log("socket raise_hand recive");
      setRaisHandTimer(true);
      setGroupActionState((prev) => ({
        ...prev,
        [getUserUid(result.initiator.mobile)]: {
          ...prev[getUserUid(result.initiator.mobile)],
          avtarImageUrl: result.initiator.avtarImageUrl,
          name: result?.initiator?.firstName
            ? result?.initiator?.firstName
            : result?.initiator?.username
            ? result?.initiator?.username
            : "",
          raiseHand: true,
          userObj: result,
        },
      }));
      setTimeout(() => {
        setRaisHandTimer(false);
      }, 5000);
    });
    socket.on("CHAT_MESSAGE", (result) => {
      console.log("socket chat_message recive");
      if (
        result.content.mimeType === "image/gif" &&
        result.roomId === room?.chatroomId
      ) {
        setEmojiTimer(true);
        setGroupActionState((prev) => ({
          ...prev,
          [getUserUid(result.sender.mobile)]: {
            ...prev[getUserUid(result.sender.mobile)],
            emoji: result.content.src,
            userObj: result,
          },
        }));
        setTimeout(() => {
          setEmojiTimer(false);
        }, 5000);
        setFeedbackData((prev) => [
          ...prev,
          {
            userId: result.sender.id,
            createdOn: result.createdOn,
            userName: result?.sender?.firstName
              ? result?.sender?.firstName
              : result?.sender?.username,
            avtarImageUrl: result?.sender?.avtarImageUrl,
            content: result?.content,
          },
        ]);
      }
    });
  }, []);

  if (state.isJoined) {
    return (
      // <AuthSocket>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        {currentView === "members" ? (
          <VideoCallScreen
            state={state}
            _engine={_engine}
            actionState={actionState}
            groupActionState={groupActionState}
            emojiTimer={emojiTimer}
            raisHandTimer={raisHandTimer}
          />
        ) : (
          <FeedbackScreen
            feedbackData={feedbackData}
            systemUserId={systemUserId}
          />
        )}
        <ActionsCard
          _engine={_engine}
          room={room}
          currentView={currentView}
          setCurrentView={setCurrentView}
          actionState={actionState}
          setActionState={setActionState}
        />
      </View>
      // </AuthSocket>
    );
  } else {
    return <AppLoading visible={!state.isJoined} />;
  }
}

// const _switchCamera = () => {
// 	_engine
// 		?.switchCamera()
// 		.then(() => {
// 			setState((prev) => ({...prev, switchCamera: !prev.switchCamera}));
// 		})
// 		.catch((err) => {
// 			console.warn("switchCamera", err);
// 		});
// };

// const _switchRender = () => {
// 	const {switchRender, remoteUid} = state;
// 	setState((prev) => ({
// 		...prev,
// 		switchRender: !switchRender,
// 		remoteUid: remoteUid.reverse(),
// 	}));
// };
