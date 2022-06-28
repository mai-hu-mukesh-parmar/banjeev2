import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import { Video } from "expo-av";
import { profileUrl } from "../../../../utils/util-func/constantExport";

export default function VideoComp({ src }) {
  return (
    <Video
      style={{
        width: 150,
        height: 160,
        position: "absolute",
        top: 5,
      }}
      source={{
        uri: profileUrl(src),
      }}
      useNativeControls
      resizeMode="contain"
      isLooping
    />
  );
}

const styles = StyleSheet.create({});
