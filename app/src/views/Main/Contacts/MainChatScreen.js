import React from "react";
import { View, StyleSheet, VirtualizedList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { chatHistory } from "../../../helper/services/ChatService";
import ImageModal from "../../Others/ImageModal";
import HearderLeft from "./ChatHeader/HearderLeft";
import HeaderRight from "./ChatHeader/HeaderRight";
import ChatFragment from "./ChatComponent/ChatFragment";
import BottomView from "./ChatComponent/BottomView/BottomView";
import AppLoading from "../../../constants/components/ui-component/AppLoading";
// import ReportUser from "../../../Screens/Home/Cards/ReportUser";
import { profileUrl } from "../../../utils/util-func/constantExport";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { SocketContext } from "../../../Context/Socket";
import ConfirmModal from "./ChatComponent/ConfirmModal";
import { BlockUser } from "../../../helper/services/Service";
import { unfriend } from "../../../helper/services/UnfriendService";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getApiChatMessage,
//   clearChatMessageState,
// } from "../../../redux/store/action/chatMessageActions";

function MainChatScreen() {
  const { setOptions, addListener } = useNavigation();

  const dispatch = useDispatch();

  const storeChat = useSelector((state) => state.chatMessage);

  const socket = React.useContext(SocketContext);

  const {
    params: { item: user },
  } = useRoute();

  // console.log("user?.chatroomId", user?.chatroomId);

  const { systemUserId } = useSelector((state) => state.registry);
  const [reportModal, setReportModal] = React.useState(false);

  const [mediaPlayer, setMediaPlayer] = React.useState({
    src: null,
    play: false,
  });

  const [page, setPage] = React.useState(0);

  const [loading, setLoading] = React.useState(true);
  const [imageModal, setImageModal] = React.useState(false);
  const [imageUri, setImageUri] = React.useState(false);

  const [blockModal, setBlockModal] = React.useState(false);
  const [userChat, setUserChat] = React.useState([]);
  const [unfriendModal, setUnfriendModal] = React.useState(false);
  const { goBack } = useNavigation();
  const { listContact } = useSelector((state) => state.contact);

  const unfriendUser = () => {
    unfriend(user.userId)
      .then(() => {
        goBack();
        // user?.listUser();
        listContact();
      })
      .catch((err) => console.log(err));
  };
  const blockUser = () => {
    BlockUser(user.userId)
      .then(() => {
        goBack();
        listContact();
        console.warn(listContact());
        // user?.listUser();
      })
      .catch((err) => console.warn(err));
  };

  const chatWaliHistory = React.useCallback(
    (pageNumber) => {
      setLoading(true);
      console.warn("chatwali history called");
      chatHistory({
        page: pageNumber,
        pageSize: 10,
        roomId: user?.chatroomId,
        sortBy: "createdOn desc",
      })
        .then((res) => {
          // console.log("chatwali history response -------->", res);
          // if (res.content?.length > 0) {
          //   dispatch(
          //     getApiChatMessage({
          //       chatroomId: user.chatroomId,
          //       items: res.content.map((ele) => ({
          //         ...ele,
          //         key: Math.random(),
          //         isSender: systemUserId !== ele?.sender?.id,
          //       })),
          //     })
          //   );
          // }
          setUserChat((prev) => [
            ...prev,
            ...res.content.map((ele) => ({
              ...ele,
              key: Math.random(),
              isSender: systemUserId !== ele?.sender?.id,
            })),
          ]);
          setLoading(false);
          setPage(res.pageable.pageNumber + 1);
        })
        .catch((err) => {
          console.warn(err);
          setLoading(false);
        });
    },
    [user?.chatroomId]
  );

  React.useEffect(() => {
    addListener("focus", () => chatWaliHistory(0));
    // return () => {
    //   dispatch(clearChatMessageState());
    // };
  }, []);

  const [player] = React.useState(new Audio.Sound());

  const loadSound = async () => {
    try {
      const { src } = mediaPlayer;
      const audio = src ? profileUrl(src) : null;
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: false,
      });
      let localUri = "";
      if (audio?.split("/").includes("iwantcdn")) {
        const downloadResumable = FileSystem.createDownloadResumable(
          audio,
          FileSystem.documentDirectory + "sample.mp4"
        );
        const { uri } = await downloadResumable.downloadAsync();
        localUri = uri;
      } else {
        localUri = audio;
      }

      player
        .loadAsync(
          {
            uri: localUri,
          },
          Platform.OS === "ios" ? true : false
        )
        .then(async (res) => {
          if (res.isLoaded) {
            await playSoundFunc();
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    } catch (err) {
      console.warn(err);
    }
  };

  const stopPlayer = () => {
    player
      .unloadAsync()
      .then((res) => {
        setMediaPlayer((prev) => {
          return {
            src: null,
            play: false,
          };
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  //``````````````````````````` Play Effect

  async function playSoundFunc() {
    const result = await player.getStatusAsync();
    if (result.isLoaded) {
      if (result.isPlaying === false) {
        player.playAsync().then((res) => {
          setTimeout(() => {
            stopPlayer();
          }, res.durationMillis);
        });
      } else {
        stopPlayer();
      }
    }
  }

  async function playAudio() {
    const result = await player.getStatusAsync();
    if (!result.isLoaded) {
      await loadSound();
    } else {
      await playSoundFunc();
    }
  }

  React.useEffect(async () => {
    setOptions({
      headerLeft: () => <HearderLeft chatUser={user} />,
      headerRight: () => (
        <HeaderRight
          friendList={user?.listUser}
          chatUser={user}
          setReportModal={setReportModal}
          setBlockModal={setBlockModal}
          setUnfriendModal={setUnfriendModal}
        />
      ),
    });
    // if (mediaPlayer.src && mediaPlayer.play) {
    //   await playAudio();
    // }
  }, []);

  const onChatMessageRecive = React.useCallback((data) => {
    setLoading(false);
    setUserChat((prev) => [
      {
        ...data,
        key: Math.random(),
        isSender: systemUserId !== data?.sender?.id,
      },
      ...prev,
    ]);
    socket.emit("CREATE_MESSAGE_SIGNAL", {
      type: "SEEN",
      user: data.sender,
      userId: systemUserId,
      messageId: data.id,
    });
  }, []);

  const onReactionMessageRecive = React.useCallback((data) => {
    setLoading(false);
    setUserChat((prev) =>
      prev.map((ele) => {
        if (ele?.id === data?.id) {
          return {
            ...data,
            key: Math.random(),
            isSender: systemUserId !== data?.sender?.id,
          };
        } else return ele;
      })
    );
  }, []);

  socket.on("ON_JOIN", (data) => {
    console.log("ON_JOIN", data);
  });

  const msgDeleteHandler = React.useCallback((data) => {
    setLoading(false);
    setUserChat((prev) => prev.filter((ele) => ele.id !== data.id));
  }, []);

  const onDistructiveMessageReceiver = React.useCallback((data) => {
    setUserChat((prev) => prev.filter((ele) => ele.id !== data.id));
  }, []);

  const msgSeenHandler = React.useCallback((data) => {
    // console.log("seenData", data);
    setUserChat((prev) =>
      prev.map((ele) => {
        if (ele.id === data.messageId) {
          return {
            ...ele,
            messageSeen: true,
          };
        } else return ele;
      })
    );
  }, []);

  React.useEffect(() => {
    socket.on("connect_error", (err) => {
      console.warn(err);
    });
    // socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
    socket.on("CHAT_MESSAGE", onChatMessageRecive);
    socket.on("REACTION_MESSAGE", onReactionMessageRecive);
    socket.on("CHAT_MESSAGE_DELETED", msgDeleteHandler);
    socket.on("DESTRUCTIVE_MESSAGE", onDistructiveMessageReceiver);
    socket.on("CHAT_MESSAGE_SEEN", msgSeenHandler);
    return () => {};
  }, [systemUserId, socket, onChatMessageRecive, msgDeleteHandler]);

  function renderItem({ item }) {
    return (
      <ChatFragment
        setLoading={setLoading}
        mediaPlayer={mediaPlayer}
        setMediaPlayer={async (data) => {
          const audioData = data();
          if (audioData.src === mediaPlayer.src) {
            if (mediaPlayer.play && !audioData.play) {
              stopPlayer();
            } else {
              await playAudio();
            }
          } else {
            if (audioData.src !== mediaPlayer.src) {
              if (mediaPlayer.play && audioData.play) {
                stopPlayer();
                setTimeout(() => {
                  setMediaPlayer(audioData);
                }, 100);
              } else {
                setMediaPlayer(audioData);
              }
            }
          }
        }}
        chatContent={item}
      />
    );
  }

  return (
    <React.Fragment>
      {loading && <AppLoading visible={loading} />}

      <View style={styles.container}>
        {imageModal && (
          <ImageModal
            imageModal={true}
            item={user}
            imageModalHandler={(data) => {
              setImageModal(false);
            }}
            imageUriHandler={(data) => {
              setImageUri(data);
            }}
          />
        )}
        <View style={{ paddingBottom: 70, height: "100%" }}>
          <VirtualizedList
            getItemCount={(userChat) => userChat.length}
            getItem={(data, index) => data[index]}
            showsVerticalScrollIndicator={false}
            data={userChat}
            // data={storeChat?.[user?.chatroomId] || []}
            scrollEnabled={true}
            keyExtractor={(item) => item.key}
            onEndReached={() => chatWaliHistory(page)}
            onEndReachedThreshold={0.5}
            inverted
            renderItem={renderItem}
          />
        </View>

        <BottomView
          setLoading={setLoading}
          roomId={user?.chatroomId}
          setImageModal={setImageModal}
          setImageUri={setImageUri}
          imageUri={imageUri}
          sendData={socket}
        />
      </View>
      {/* {reportModal && (
          <ReportUser
            setModalVisible={setReportModal}
            systemUserId={systemUserId}
          />
        )} */}

      {unfriendModal && (
        <ConfirmModal
          title={`Are you sure, you want to unfriend ${user?.firstName} ?`}
          setModalVisible={setUnfriendModal}
          btnLabel={"Unfriend"}
          message={"Unfriend User"}
          onPress={unfriendUser}
        />
      )}
      {blockModal && (
        <ConfirmModal
          firstName={`Are you sure, you want to block ${user?.firstName} ?`}
          setModalVisible={setBlockModal}
          btnLabel={"Block"}
          message={"Block User"}
          onPress={blockUser}
        />
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: { position: "relative", flex: 1 },
});

export default MainChatScreen;
