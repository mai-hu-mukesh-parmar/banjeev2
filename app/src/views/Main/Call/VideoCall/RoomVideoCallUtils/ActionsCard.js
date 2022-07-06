import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AudioVoiceChanger } from "react-native-agora";
import { Text } from "native-base";
import AppFabButton from "../../../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import AppMenu from "./AppMenu";
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";
import { SocketContext } from "../../../../../Context/Socket";

import voiceChangerArray from "./voiceChangerArray";
import { useSelector } from "react-redux";

function ActionsCard(props) {
  const {
    _engine,
    currentView,
    setCurrentView,
    actionState,
    setActionState,
    room,
  } = props;

  const { navigate } = useNavigation();
  const {
    systemUserId,
    name,
    currentUser: { mobile, firstName },
    currentUser,
    avtarUrl,
  } = useSelector((state) => state.registry);
  const socket = React.useContext(SocketContext);

  const refRBSheet = React.useRef(null);
  const emojiSheet = React.useRef(null);
  const scrollViewRef = React.useRef(null);

  const [emojiData, setEmojiData] = React.useState([]);
  const [offset, setOffset] = React.useState(0);

  const muteLocalVideoStreamFun = async (props) => {
    await _engine?.muteLocalVideoStream(props);
    await _engine?.enableLocalVideo(!props);
  };

  const cameraFlipFun = async (props) => {
    await _engine?.switchCamera();
    setActionState((prev) => ({
      ...prev,
      camera: !actionState.camera,
    }));
  };

  const videoMuteUnmuteFun = () => {
    setActionState((prev) => ({
      ...prev,
      video: !actionState.video,
    }));
    muteLocalVideoStreamFun(actionState.video);

    socket.on("connect", () => {
      console.log("socket.connected", socket.connected);
    });
    console.log("socket emit video mute/unmute", {
      roomId: room?.chatroomId,
      fromUserId: currentUser?.id,
      initiator: {
        ...currentUser,
        avtarImageUrl: avtarUrl,
        firstName: firstName ? firstName : name,
        username: name,
      },
      eventType: actionState.video ? "VIDEO_MUTE" : "VIDEO_UNMUTE",
      iceCandidate: null,
      offer: null,
      answer: null,
      mediaStream: null,
      responseMessage: "Video Mute/Unmute Successfull",
      callDuration: null,
      callType: "group",
      groupName: null,
      toAvatarSrc: null,
      groupMemberCounts: 0,
      groupCreatorId: null,
      addToCall: false,
    });
    socket.emit("SIGNALLING_SERVER", {
      roomId: room?.chatroomId,
      fromUserId: currentUser?.id,
      initiator: {
        ...currentUser,
        avtarImageUrl: avtarUrl,
        firstName: firstName ? firstName : name,
        username: name,
      },
      eventType: actionState.video ? "VIDEO_MUTE" : "VIDEO_UNMUTE",
      iceCandidate: null,
      offer: null,
      answer: null,
      mediaStream: null,
      responseMessage: "Video Mute/Unmute Successfull",
      callDuration: null,
      callType: "group",
      groupName: null,
      toAvatarSrc: null,
      groupMemberCounts: 0,
      groupCreatorId: null,
      addToCall: false,
    });
  };

  const muteLocalAudioStreamFun = async (props) => {
    await _engine?.muteLocalAudioStream(props);
    await _engine?.enableLocalAudio(!props);
  };

  const audioMuteUnmuteFun = () => {
    setActionState((prev) => ({ ...prev, mic: !actionState.mic }));
    muteLocalAudioStreamFun(actionState.mic);
    socket.emit("SIGNALLING_SERVER", {
      roomId: room?.chatroomId,
      fromUserId: currentUser?.id,
      initiator: {
        ...currentUser,
        avtarImageUrl: avtarUrl,
        firstName: firstName ? firstName : name,
        username: name,
      },
      eventType: actionState.mic ? "MUTE" : "UNMUTE",
      iceCandidate: null,
      offer: null,
      answer: null,
      mediaStream: null,
      responseMessage: "Audio Mute/Unmute Successfull",
      callDuration: "00",
      callType: "Video",
      groupName: room?.groupName,
      toAvatarSrc: null,
      groupMemberCounts: 0,
      groupCreatorId: null,
      addToCall: false,
    });
  };

  const raiseHandFun = () => {
    socket.emit("SIGNALLING_SERVER", {
      eventType: "RAISE_HAND",
      canDownload: false,
      content: {
        base64Content: null,
        caption: systemUserId,
        height: 0,
        length: 0,
        mediaDesignType: 0,
        mimeType: "image/jpg",
        src: "61e7d352374f282c5b4caba9",
        sequenceNumber: 0,
        sizeInBytes: 0,
        title: "61e7d352374f282c5b4caba9",
        width: 0,
      },
      destructiveAgeInSeconds: null,
      expired: false,
      expiryAgeInHours: 24,
      group: false,
      roomId: room.chatroomId,
      secret: false,
      selfDestructive: false,
      sender: {
        ...currentUser,
        avtarImageUrl: avtarUrl,
        firstName: firstName ? firstName : name,
      },
      initiator: {
        ...currentUser,
        avtarImageUrl: avtarUrl,
        firstName: firstName ? firstName : name,
      },
      senderId: systemUserId,
    });
  };

  const voiceChangerFun = async (props) => {
    await _engine?.setLocalVoiceChanger(AudioVoiceChanger[props]);
  };

  const getEmoji = React.useCallback(() => {
    const url = `https://api.giphy.com/v1/emoji?api_key=BjrzaTUXMRi27xIRU0xZIGRrNztyuNT8&limit=25&offset=${offset}`;
    axios
      .get(url)
      .then((res) => {
        setEmojiData((prev) => [
          ...new Set([
            ...prev,
            ...res.data.data.map((ele) => ele.images?.preview_gif.url),
          ]),
        ]);
      })
      .catch((err) => console.warn(err));
  }, [offset]);

  React.useEffect(() => {
    getEmoji();
  }, [getEmoji]);

  const sendEmojiFun = (data) => {
    socket.emit("CREATE_CHAT_MESSAGE", {
      canDownload: false,
      content: {
        base64Content: null,
        caption: systemUserId,
        height: 0,
        length: 0,
        mediaDesignType: 0,
        mimeType: "image/gif",
        src: data,
        sequenceNumber: 0,
        sizeInBytes: 0,
        title: data,
        width: 0,
      },
      destructiveAgeInSeconds: null,
      expired: false,
      expiryAgeInHours: 24,
      group: false,
      roomId: room.chatroomId,
      secret: false,
      selfDestructive: false,
      sender: {
        ...currentUser,
        avtarImageUrl: avtarUrl,
        firstName: firstName ? firstName : name,
        username: name,
      },
      initiator: {
        ...currentUser,
        avtarImageUrl: avtarUrl,
        firstName: firstName ? firstName : name,
        username: name,
      },
      senderId: systemUserId,
    });
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          width: "95%",
          height: 130,
          borderRadius: 8,
          left: 10,
          right: 0,
        }}
      >
        <Image
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 130,
            borderRadius: 8,
          }}
          resizeMode="cover"
          source={require("../../../../../../assets/EditDrawerIcon/chat_room_bg.png")}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            flex: 1,
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => setCurrentView("members")}
            style={{
              flexGrow: 6,
              borderTopLeftRadius: 8,
              backgroundColor:
                currentView === "members" ? "#FFF" : "rgba(255,255,255,0.5)",
              height: 40,
            }}
          >
            <Text
              onPress={() => setCurrentView("members")}
              style={{
                color: currentView === "members" ? "#000" : "#FFF",
                textAlign: "center",
                lineHeight: 35,
              }}
            >
              Members
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentView("feedback")}
            style={{
              flexGrow: 6,
              backgroundColor:
                currentView === "feedback" ? "#FFF" : "rgba(255,255,255,0.5)",
              height: 40,
              borderTopEndRadius: 8,
            }}
          >
            <Text
              onPress={() => setCurrentView("feedback")}
              style={{
                color: currentView === "feedback" ? "#000" : "#FFF",
                textAlign: "center",
                lineHeight: 35,
              }}
            >
              Feedback
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 90,
            width: "100%",
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <AppFabButton
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              height: 40,
              width: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={videoMuteUnmuteFun}
            icon={
              actionState.video ? (
                <MaterialCommunityIcons
                  size={25}
                  color="#FFF"
                  name="video-outline"
                />
              ) : (
                <MaterialCommunityIcons
                  size={25}
                  color="#FFF"
                  name="video-off-outline"
                />
              )
            }
          />
          <AppFabButton
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              height: 40,
              width: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={audioMuteUnmuteFun}
            icon={
              actionState.mic ? (
                <MaterialCommunityIcons
                  size={25}
                  color="#FFF"
                  name="microphone"
                />
              ) : (
                <MaterialCommunityIcons
                  size={25}
                  color="#FFF"
                  name="microphone-off"
                />
              )
            }
          />
          <AppFabButton
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              height: 40,
              width: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              refRBSheet?.current?.open();
            }}
            icon={
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../../../../../../assets/EditDrawerIcon/elements_icons_icons_white_alien.png")}
              />
            }
          />
          <AppFabButton
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              height: 40,
              width: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={cameraFlipFun}
            icon={
              <MaterialCommunityIcons
                size={25}
                color="#FFF"
                name="camera-flip-outline"
              />
            }
          />
          {/* <AppFabButton
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              height: 40,
              width: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigate("SelectBanjee", { addUser: "addUser" });
            }}
            icon={
              <MaterialCommunityIcons
                size={25}
                color="#FFF"
                name="account-plus-outline"
                style={{ transform: [{ scaleX: -1 }] }}
              />
            }
          /> */}
          <AppFabButton
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              height: 40,
              width: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              emojiSheet?.current?.open();
            }}
            icon={<Entypo name="emoji-happy" size={25} color="#FFF" />}
          />
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 50,
              height: 40,
              width: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <AppMenu
              menuColor="#FFF"
              // iconSize={25}
              menuContent={[
                {
                  icon: "hand-left",
                  label: "Raise Hand",
                  onPress: () => raiseHandFun(),
                },
              ]}
            /> */}
            <AppMenu
              style={{
                left: "55%",
                top: "84%",
              }}
              menuColor={"#FFF"}
              menuContent={[
                {
                  icon: "account-plus-outline",
                  label: "Add Member",
                  // onPress: () => console.log("Add member"),
                  onPress: () =>
                    navigate("SelectBanjee", { addUser: "addUser" }),
                },
                {
                  icon: "hand-back-left",
                  label: "Raise Hand",
                  onPress: () => raiseHandFun(),
                },
              ]}
            />
          </View>
        </View>
      </View>
      <RBSheet
        customStyles={{ container: { borderRadius: 10 } }}
        height={280}
        ref={refRBSheet}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        draggableIcon
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 20,
          }}
        >
          {voiceChangerArray.map((ele, index) => (
            <TouchableOpacity
              key={index}
              style={{
                height: 40,
                width: "50%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
                marginVertical: 2,
              }}
              onPress={() => {
                voiceChangerFun(ele.value);
                setActionState((prev) => ({ ...prev, voice: false }));
                refRBSheet?.current?.close();
              }}
            >
              <MaterialCommunityIcons
                name="account-voice"
                size={24}
                color="black"
              />
              <Text
                onPress={() => {
                  voiceChangerFun(ele.value);
                  setActionState((prev) => ({ ...prev, voice: false }));
                  refRBSheet?.current?.close();
                }}
                style={{ marginLeft: 10 }}
              >
                {ele.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </RBSheet>
      <RBSheet
        customStyles={{
          container: { borderRadius: 10 },
        }}
        height={310}
        ref={emojiSheet}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        draggableIcon
      >
        <ScrollView
          onScrollEndDrag={() => setOffset((prev) => prev + 1)}
          ref={scrollViewRef}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {emojiData &&
              emojiData.length > 0 &&
              emojiData.map((ele, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const newData = ele.substring(31, 49);
                      sendEmojiFun(newData);
                      emojiSheet?.current?.close();
                    }}
                  >
                    <Image
                      source={{ uri: ele }}
                      style={{ height: 60, width: 60, margin: 5 }}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </RBSheet>
    </>
  );
}

export default ActionsCard;
