import React from "react";
import { View, StyleSheet, Switch, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "native-base";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import color from "../../../../constants/env/color";
import { useDispatch, useSelector } from "react-redux";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import {
  createRoom,
  updateRoom,
} from "../../../../helper/services/CreateRoomService";
import { showToast } from "../../../../redux/store/action/toastAction";
import { setRoomData } from "../../../../redux/store/action/roomAction";

function FilterCreateRoom(props) {
  const {
    allCanSwitchVideo,
    allCanReact,
    allCanSpeak,
    allCanAddBanjees,
    recordSession,
    seekPermission,
    allUseVoiceFilters,
    onlyAudioRoom,
  } = useSelector((state) => state.room);
  console.warn(
    allCanSwitchVideo,
    allCanReact,
    allCanSpeak,
    allCanAddBanjees,
    recordSession,
    seekPermission,
    allUseVoiceFilters,
    onlyAudioRoom
  );
  // const {
  // 	params: {
  // 		update,
  // 		data,
  // 		data: { editRoom, userCount },
  // 	},
  // } = useRoute();

  const { setOptions, navigate } = useNavigation();
  const [disable, setDisable] = React.useState(false);
  const dispatch = useDispatch();

  const {
    userObject: { id, avtarUrl },
  } = useSelector((state) => state.registry);

  const user = useSelector((state) => state.user);
  const roomdata = useSelector((state) => state.room);

  const btnClick = React.useCallback(() => {
    setDisable(true);

    if (roomdata.editRoom) {
      // console.warn(
      //   "Imagecontettgfgdfgdfg",
      //   data?.roomUri?.base64Content === undefined
      //     ? {
      //         ...editRoom?.imageContent,
      //         mimeType: "image/jpg",
      //       }
      //     : {
      //         aspectRatio: null,
      //         base64Content: data.roomUri.imageBase64,
      //         caption: null,
      //         description: null,
      //         height: 0,
      //         length: 0,
      //         mediaDesignType: 0,
      //         mediaSource: null,
      //         mimeType: "image/jpg",
      //         sequenceNumber: 0,
      //         sizeInBytes: 0,
      //         src: null,
      //         subTitle: null,
      //         tags: null,
      //         title: data.roomUri.url,
      //         type: null,
      //         width: 0,
      //       }
      // );
      // 'console.log(',console.log(
      //   "data.roomUri",
      //   data?.roomUri?.base64Content,
      //   "data.audioUri.base64Content",
      //   data.audioUri?.base64Content,
      //   "data.audioUri.url",
      //   data.audioUri?.url
      // );
      console.log("Update Apicall");

      updateRoom({
        allCanAddBanjees: allCanAddBanjees,
        allCanReact: allCanReact,
        allCanSpeak: allCanSpeak,
        allCanSwitchVideo: allCanSwitchVideo,
        allUseVoiceFilters: allUseVoiceFilters,
        category: null, //reamining
        categoryId: roomdata.categoryId,
        categoryName: roomdata.categoryName,
        chatroomId: roomdata?.chatroomId, //remaining
        communityType: roomdata.communityType,
        connectedUserIds: roomdata.connectedUsers.map((ele) =>
          ele.id.toString()
        ),
        connectedUsers: roomdata.connectedUsers, //remaining
        connectionReq: null, //remaining
        content:
          roomdata?.audioUri?.audioBase64 === undefined ||
          roomdata?.audioUri?.audioBase64 === null
            ? roomdata?.content
            : {
                aspectRatio: null,
                base64Content: roomdata?.audioUri?.audioBase64,
                caption: null,
                description: null,
                height: 0,
                length: 0,
                mediaDesignType: 0,
                mediaSource: null,
                mimeType: "audio/mp3",
                sequenceNumber: 0,
                sizeInBytes: 0,
                src: null,
                subTitle: null,
                tags: null,
                title: roomdata.audioUri.url,
                type: null,
                width: 0,
              },
        createdOn: roomdata?.createdOn,
        domain: roomdata?.domain,
        group: true,
        groupName: roomdata.groupName,
        id: roomdata?.id,
        imageCommunityUrl: null,
        imageContent:
          roomdata?.imageContent?.imageBase64 === undefined
            ? {
                ...roomdata?.imageContent,
                base64Content: roomdata?.imageContent?.src,
                mimeType: "image/jpg",
              }
            : {
                aspectRatio: null,
                base64Content: roomdata?.imageContent?.imageBase64,
                caption: null,
                description: null,
                height: 0,
                length: 0,
                mediaDesignType: 0,
                mediaSource: null,
                mimeType: "image/jpg",
                sequenceNumber: 0,
                sizeInBytes: 0,
                src: null,
                subTitle: null,
                tags: null,
                title: roomdata?.imageContent?.name,
                type: null,
                width: 0,
              },
        lastUpdatedBy: null,
        lastUpdatedOn: null,
        likes: 0,
        onlyAudioRoom: onlyAudioRoom,
        playing: false,
        recordSession: recordSession,
        seekPermission: seekPermission,
        subCategoryId: roomdata.subCategoryId,
        subCategoryName: roomdata.subCategoryName,
        unreadMessages: 0,
        user: user,
        userId: id,
        userIds: [id],
      })
        .then((res) => {
          dispatch(
            showToast({ open: true, description: "Room Updated Successfully" })
          );
          navigate("Room");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("EditApiCall");
      createRoom({
        allCanAddBanjees: allCanAddBanjees,
        allCanReact: allCanReact,
        allCanSpeak: allCanSpeak,
        allCanSwitchVideo: allCanSwitchVideo,
        allUseVoiceFilters: allUseVoiceFilters,
        category: null, //reamining
        categoryId: roomdata.categoryId,
        categoryName: roomdata.categoryName,
        chatroomId: null, //remaining
        communityType: roomdata.communityType,
        connectedUserIds: roomdata.connectedUsers.map((ele) => ele.id),
        connectedUsers: roomdata.connectedUsers, //remaining
        connectionReq: null, //remaining
        content: {
          aspectRatio: null,
          base64Content: null,
          caption: null,
          description: null,
          height: 0,
          length: 0,
          mediaDesignType: 0,
          mediaSource: null,
          mimeType: "audio/mp3",
          sequenceNumber: 0,
          sizeInBytes: 0,
          src: null,
          subTitle: null,
          tags: null,
          title: null,
          type: null,
          width: 0,
        },
        createdOn: null,
        domain: "banjee",
        group: true,
        groupName: roomdata.groupName,
        id: null,
        imageCommunityUrl: null,
        imageContent: {
          aspectRatio: null,
          base64Content: roomdata.imageContent.imageBase64,
          caption: null,
          description: null,
          height: 0,
          length: 0,
          mediaDesignType: 0,
          mediaSource: null,
          mimeType: "image/jpg",
          sequenceNumber: 0,
          sizeInBytes: 0,
          src: null,
          subTitle: null,
          tags: null,
          title: roomdata.imageContent.name,
          type: null,
          width: 0,
        },
        lastUpdatedBy: null,
        lastUpdatedOn: null,
        likes: 0,
        onlyAudioRoom: toggle.audio_only,
        playing: false,
        recordSession: recordSession,
        seekPermission: seekPermission,
        subCategoryId: roomdata.subCategoryId,
        subCategoryName: roomdata.subCategoryName,
        unreadMessages: 0,
        user: null,
        userId: id,
        userIds: [id],
      })
        // .then((res) => console.log(res))
        .then((res) => {
          console.warn("room createde");
          console.log("room created and its response", res);

          // navigate("RoomVideoCall", { room: res });
        })
        .catch((err) => console.log(err));
    }
  }, [toggle, roomdata]);

  React.useEffect(() => {
    return setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ elevation: 1, borderRadius: 20, marginRight: 10 }}>
            <Image
              source={
                // userData.avatarUrl
                { uri: profileUrl(avtarUrl) }
                // : require("../../assets/EditDrawerIcon/neutral_placeholder.png")
              }
              style={styles.profile}
            />
          </View>
          <Text>{roomdata.editRoom ? "Update Room" : "Create Room"}</Text>
        </View>
      ),
    });
  }, []);

  const [toggle, setToggle] = React.useState({
    audio_only: onlyAudioRoom ? onlyAudioRoom : false,
    speak: allCanSpeak ? allCanSpeak : false,
    permission: seekPermission ? seekPermission : false,
    voice_filter: allUseVoiceFilters ? allUseVoiceFilters : false,
    feedback: allCanReact ? allCanReact : false,
    switch_video: allCanSwitchVideo ? allCanSwitchVideo : false,
    add_banjee: allCanAddBanjees ? allCanAddBanjees : false,
    record_session: recordSession ? recordSession : false,
  });

  console.log("toggleleeeDataaaaa", {
    allCanAddBanjees: allCanAddBanjees,
    allCanReact: allCanReact,
    allCanSpeak: allCanSpeak,
    allCanSwitchVideo: allCanSwitchVideo,
    allUseVoiceFilters: allUseVoiceFilters,
    seekPermission: seekPermission,
    recordSession: recordSession,
    onlyAudioRoom: onlyAudioRoom,
  });

  const content = [
    {
      title: "All can Speak",
      isEnabled: allCanSpeak,
      id: 0,
      setIsEnable: () => dispatch(setRoomData({ allCanSpeak: !allCanSpeak })),
    },
    {
      title: "seek permission",
      id: 1,
      isEnabled: seekPermission,
      setIsEnable: () =>
        dispatch(setRoomData({ seekPermission: !seekPermission })),
    },
    {
      title: "All can use Voice Filters",
      id: 2,
      isEnabled: allUseVoiceFilters,
      setIsEnable: () =>
        dispatch(setRoomData({ allUseVoiceFilters: !allUseVoiceFilters })),
    },
    {
      title: "Feedback",
      id: 3,
      isEnabled: allCanReact,
      setIsEnable: () => dispatch(setRoomData({ allCanReact: !allCanReact })),
    },
    {
      title: "All can switch on Video",
      isEnabled: allCanSwitchVideo,
      id: 4,
      setIsEnable: () =>
        dispatch(setRoomData({ allCanSwitchVideo: !allCanSwitchVideo })),
    },
    {
      title: "All can add Banjee",
      id: 5,
      isEnabled: allCanAddBanjees,
      setIsEnable: () =>
        dispatch(setRoomData({ allCanAddBanjees: !allCanAddBanjees })),
    },
    {
      title: "Record the Session",
      id: 6,
      isEnabled: recordSession,
      setIsEnable: () =>
        dispatch(setRoomData({ recordSession: !recordSession })),
    },
    {
      title: "Audio only",
      id: 7,
      isEnabled: onlyAudioRoom,
      setIsEnable: () =>
        dispatch(setRoomData({ onlyAudioRoom: !onlyAudioRoom })),
    },
  ];

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ textAlign: "center", marginBottom: 24 }}>
            You have selected {roomdata.connectedUserIds?.length} members for
            your {roomdata?.groupName} Room
          </Text>
          <Text>Set appropriate permissions for others</Text>
        </View>

        <View
          style={{
            width: "80%",
            marginTop: 36,
            alignSelf: "center",
            borderTopWidth: 1,
            borderColor: "#d8d8d8",
          }}
        >
          {content.map((item, i) => (
            <View
              key={i}
              style={{
                justifyContent: "center",
                width: "100%",
                height: 48,
                borderBottomWidth: 1,
                borderColor: "#d8d8d8",
                position: "relative",
              }}
            >
              <Text style={{ fontSize: 14 }}>{item.title}</Text>

              <Switch
                style={{
                  width: 50,

                  alignSelf: "flex-end",
                  position: "absolute",
                }}
                trackColor={{ false: "#7b7b7b", true: "#608582" }}
                thumbColor={item.isEnabled ? "#80cbc4" : "#bdbdbd"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => item.setIsEnable()}
                value={item.isEnabled}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.btnGrp}>
        <AppButton
          disabled={disable}
          style={{ width: 160 }}
          title={roomdata.editRoom ? "Update Room" : "Go Live Now"}
          onPress={() => {
            console.log("Called");
            btnClick();
          }}
        />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: color.primary,
    borderWidth: 1,
  },
  container: {
    width: "75%",
    alignSelf: "center",
  },
  btnGrp: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 36,
  },
});

export default FilterCreateRoom;
