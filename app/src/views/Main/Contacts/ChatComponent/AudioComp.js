import { Image, StyleSheet, View } from "react-native";
import React from "react";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AudioComp({
  isSender,
  mediaPlayer: play,
  setMediaPlayer: setPlay,
  src,
}) {
  return (
    <View
      style={{
        width: 230,
        height: 80,
      }}
    >
      {isSender ? (
        <Image
          style={{
            width: 230,
            height: 80,
            position: "absolute",
            // top: 5,
          }}
          resizeMode="contain"
          source={require("../../../../../assets/EditDrawerIcon/audio_sender.png")}
        />
      ) : (
        <Image
          style={{
            width: 230,
            height: 80,
            position: "absolute",
            // top: 5,
          }}
          resizeMode="contain"
          source={require("../../../../../assets/EditDrawerIcon/audio_reciver.png")}
        />
      )}
      <View
        style={{
          position: "absolute",
          top: isSender ? 20 : 10,
          left: isSender ? 5 : 4,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <AppFabButton
          size={17}
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            marginTop: 3,
            marginLeft: 3,
            width: 34,
            height: 34,
          }}
          icon={
            <View
              style={{
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 50,
              }}
            >
              <MaterialCommunityIcons
                name={src === play.src && play.play ? "pause" : "play"}
                size={20}
                color={"black"}
              />
            </View>
          }
          onPress={() => {
            setPlay((prev) => {
              return {
                src: src,
                play: true,
              };
            });
          }}
        />

        {src === play.src && play.play && (
          <Image
            resizeMode="cover"
            source={require("../../../../../assets/Animations/wave.gif")}
            style={{
              opacity: play ? 1 : 0,
              width: 160,
              height: 20,
              marginTop: 9,
              marginLeft: 5,
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
