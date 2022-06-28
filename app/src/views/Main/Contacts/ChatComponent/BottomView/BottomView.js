import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import AppFabButton from "../../../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../../../../../constants/env/color";
import { Audio } from "expo-av";
import BottomAudioButton from "./BottomAudioButton";
import * as FileSystem from "expo-file-system";
import OverlayDrawer from "../../../../../constants/components/ui-component/OverlayDrawer";
import ShowImage from "../../../../../constants/components/ShowImage";
import GifComponent from "./GifComponent";
import { useSelector } from "react-redux";
// import BottomSheet from "react-native-bottomsheet-reanimated";

function BottomView({
  setImageModal,
  roomId,
  imageUri,
  setImageUri,
  sendData,
}) {
  const {
    systemUserId,
    avtarUrl,
    currentUser: { mobile, email, username, userName, firstName },
  } = useSelector((state) => state.registry);

  const [audio, setAudio] = React.useState("");
  const [icons, setIcons] = React.useState("play");
  const [player] = React.useState(new Audio.Sound());
  const [open, setOpen] = React.useState(false);

  const sheetRef = React.useRef(null);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <AppText>Swipe down to close</AppText>
    </View>
  );
  const loadSound = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    let localUri = "";

    localUri = audio;

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
  };

  const stopPlayer = () => {
    player
      .unloadAsync()
      .then((res) => {
        setIcons("play");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const deleteAudio = async () => {
    setAudio("");
    stopPlayer();
  };

  React.useEffect(() => {
    async () => {
      setAudio("");
      setIcons("play");
      stopPlayer();
    };
  }, []);
  //``````````````````````````` Play Effect

  async function playSoundFunc() {
    const result = await player.getStatusAsync();
    if (result.isLoaded) {
      if (result.isPlaying === false) {
        player.playAsync().then((res) => {
          // console.log("Playing res", res);
          setIcons("pause");
          setTimeout(async () => {
            stopPlayer();
          }, res.durationMillis);
        });
      } else {
        stopPlayer();
      }
    }
  }

  async function playAudio() {
    console.log("loading sound");
    const result = await player.getStatusAsync();

    if (!result.isLoaded) {
      await loadSound();
    } else {
      await playSoundFunc();
    }
  }

  const animation = React.useRef(new Animated.Value(0)).current;
  const up = () => {
    Animated.spring(animation, {
      toValue: 1,
      duration: 1200,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const down = () => {
    Animated.spring(animation, {
      toValue: 0,
      duration: 800,

      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (audio) {
      up();
    } else {
      down();
    }
  }, [audio]);

  const sendInChat = React.useCallback(
    (data, fileName, mimeType) => {
      console.log("data, fileName, mimeType", data, fileName, mimeType);

      let content;
      if (mimeType === "image/gif") {
        content = {
          base64Content: null,
          caption: systemUserId,
          height: 0,
          length: 0,
          mediaDesignType: 0,
          mimeType,
          src: data,
          sequenceNumber: 0,
          sizeInBytes: 0,
          title: fileName,
          width: 0,
        };
      } else {
        content = {
          base64Content: data,
          caption: systemUserId,
          height: 0,
          length: 0,
          mediaDesignType: 0,
          mimeType,
          sequenceNumber: 0,
          sizeInBytes: 0,
          title: fileName,
          width: 0,
        };
      }
      const payloadData = {
        canDownload: false,
        content,
        destructiveAgeInSeconds: null,
        expired: false,
        expiryAgeInHours: 24,
        group: false,
        roomId,
        secret: false,
        selfDestructive: false,
        sender: {
          age: 0,
          avtarImageUrl: avtarUrl,
          domain: "banjee",
          email,
          firstName: userName,
          id: systemUserId,
          mobile,
          username,
        },
        senderId: systemUserId,
      };
      // console.log(
      // 	"Message sended",
      // 	JSON.stringify({
      // 		...payloadData,
      // 		content: { ...payloadData.content, base64Content: null },
      // 	})
      // );

      sendData.emit("CREATE_CHAT_MESSAGE", payloadData);
    },
    [sendData]
  );
  const sendAudio = async () => {
    stopPlayer();
    const fileName = audio.split("/")[audio.split("/").length - 1];

    let data = await FileSystem.readAsStringAsync(audio, {
      encoding: FileSystem.EncodingType.Base64,
    });

    sendInChat(data, fileName, "audio/mp3");

    deleteAudio();
  };

  const sendImage = async (hideModal) => {
    const fileName = imageUri.split("/")[imageUri.split("/").length - 1];

    let data = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    sendInChat(data, fileName, "image/jpg");

    hideModal();
  };

  return (
    <React.Fragment>
      {audio ? (
        <View style={styles.bottomView}>
          <View
            style={{
              flexDirection: "row",
              width: "80%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Animated.View
              style={{
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [70, 0],
                    }),
                  },
                ],
              }}
            >
              <AppFabButton
                size={18}
                style={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  marginTop: 2,
                  width: 37,

                  elevation: 2,
                  height: 37,
                }}
                icon={
                  <MaterialCommunityIcons
                    name={"delete"}
                    size={20}
                    color={"#47129E"}
                  />
                }
                onPress={async () => {
                  console.log("Delete");
                  deleteAudio();
                }}
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [10, 70, 0],
                    }),
                  },
                ],
              }}
            >
              <AppFabButton
                size={18}
                style={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  marginTop: 2,
                  width: 37,
                  elevation: 2,
                  height: 37,
                }}
                icon={
                  <MaterialCommunityIcons
                    name={icons}
                    size={30}
                    color={"#47129E"}
                  />
                }
                onPress={async () => {
                  console.log("Play");
                  playAudio();
                }}
              />
            </Animated.View>
            <Animated.View
              style={{
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [10, 60, 0],
                    }),
                  },
                ],
              }}
            >
              <AppFabButton
                onPress={async () => {
                  console.log("Send");
                  sendAudio();
                }}
                size={20}
                icon={
                  <Image
                    source={require("../../../../../../assets/EditDrawerIcon/ic_send_message_round.png")}
                    style={{ height: 35, width: 35 }}
                  />
                }
              />
            </Animated.View>
            <Animated.View
              style={{
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [10, 40, 0],
                    }),
                  },
                ],
              }}
            >
              <AppFabButton
                size={20}
                onPress={() => {
                  console.log("Timmer");
                }}
                icon={
                  <Image
                    source={require("../../../../../../assets/EditDrawerIcon/ic_distructive.png")}
                    style={{ height: 35, width: 35 }}
                  />
                }
              />
            </Animated.View>
          </View>
        </View>
      ) : (
        <View style={styles.bottomView}>
          <View style={styles.iconView}>
            <AppFabButton
              size={25}
              onPress={() => {
                setOpen(true);
                sheetRef?.current?.open();
              }}
              icon={
                <MaterialCommunityIcons
                  name="gif"
                  size={24}
                  color={color.white}
                />
              }
            />
            <BottomAudioButton setAudioUrl={setAudio} />
            <AppFabButton
              onPress={() => setImageModal(true)}
              size={25}
              icon={
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={24}
                  color={color.white}
                />
              }
            />
          </View>
        </View>
      )}
      {imageUri && (
        <OverlayDrawer
          transparent
          visible={Boolean(imageUri)}
          onClose={() => setImageUri(null)}
          closeOnTouchOutside
          animationType="fadeIn"
          containerStyle={{
            backgroundColor: "rgba(238, 238, 255, 0.7)",
            padding: 0,
            height: "100%",
            width: "100%",
          }}
          childrenWrapperStyle={{
            width: "100%",
            padding: 0,
            height: "100%",
          }}
          animationDuration={100}
        >
          {(hideModal) => (
            <ShowImage
              hideModal={() => {
                sendImage(hideModal);
              }}
              image={imageUri}
            />
          )}
        </OverlayDrawer>
      )}
      {open && <GifComponent sendInChat={sendInChat} refRBSheet={sheetRef} />}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    height: 70,
    backgroundColor: "#303031",
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconView: {
    flexDirection: "row",
    width: 172,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default BottomView;
