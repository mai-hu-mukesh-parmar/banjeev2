import React from "react";
import { Video, Audio } from "expo-av";
import { Image, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Viewport } from "@skele/components";
import { useNavigation } from "@react-navigation/native";
import usePlayPauseAudio from "../../../utils/hooks/usePlayPauseAudio";
import FeedZoom from "./FeedZoom";
import { cloudinaryFeedUrl } from "../../../utils/util-func/constantExport";

const ViewportAwareImage = Viewport.Aware(View);

function ContentViewer({ mimeType, src }) {
  const { icons, playAudio, stopPlayer } = usePlayPauseAudio(src, false);
  const videoRef = React.useRef(null);
  const { addListener } = useNavigation();

  React.useEffect(() => {
    const unsubscribe = addListener("blur", (e) => {
      // e.preventDefault();
      videoRef?.current?.stopAsync();
      stopPlayer();
    });
    return unsubscribe;
  }, [stopPlayer]);

  const renderComp = () => {
    if (mimeType && src) {
      switch (mimeType) {
        case "video/mp4":
          return (
            <Video
              ref={videoRef}
              source={{ uri: cloudinaryFeedUrl(src, "video") }}
              resizeMode="contain"
              useNativeControls={true}
              style={{
                width: "100%",
                aspectRatio: 1,
              }}
              onError={(err) => {
                console.log(err);
              }}
            />
          );
        case "audio/mp3":
          return (
            <View
              style={{
                height: 364,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                  height: 60,
                }}
              >
                <Image
                  style={{ width: "100%", borderRadius: 4, height: "100%" }}
                  source={require("../../../../assets/EditDrawerIcon/feedAudioBg.png")}
                />
                <View
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    height: 60,
                    width: "100%",
                    padding: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => playAudio(src, "feed_audio")}
                  >
                    <View
                      style={{
                        marginRight: 10,
                        width: 44,
                        height: 44,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFF",
                        borderRadius: 50,
                      }}
                    >
                      <MaterialCommunityIcons name={icons} size={30} />
                    </View>
                  </TouchableOpacity>
                  {icons === "pause" && (
                    <Image
                      style={{
                        height: "80%",
                        width: "85%",
                        alignSelf: "center",
                      }}
                      source={require("../../../../assets/Animations/wave.gif")}
                    />
                  )}
                </View>
              </View>
            </View>
          );
        case "image/jpg":
          return <FeedZoom imageUri={cloudinaryFeedUrl(src, "image")} />;
      }
    } else return null;
  };

  return (
    <ViewportAwareImage
      onViewportEnter={() => {
        if (mimeType === "video/mp4") {
          videoRef?.current?.playAsync();
        } else {
          playAudio();
        }
      }}
      onViewportLeave={() => {
        if (mimeType === "video/mp4") {
          videoRef?.current?.stopAsync();
        } else {
          stopPlayer();
        }
      }}
      style={{ flex: 1 }}
    >
      {renderComp()}
    </ViewportAwareImage>
  );
}

export default ContentViewer;
