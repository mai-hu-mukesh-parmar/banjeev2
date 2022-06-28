import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { profileUrl } from "../../../../utils/util-func/constantExport";

export default function ImageComp({ isSender, src, mimeHandler }) {
  const renderImage = () => {
    if (mimeHandler[1] === "gif") {
      return (
        <Image
          style={{
            width: 105,
            height: 105,
            position: "absolute",
            top: isSender ? 25 : 15,
            right: 22,
          }}
          resizeMode="contain"
          source={{
            uri: "http://media1.giphy.com/media/" + src + "/giphy.gif",
          }}
        />
      );
    } else {
      return (
        <Image
          style={{
            width: 105,
            height: 105,
            position: "absolute",
            top: isSender ? 25 : 15,
            right: 22,
          }}
          resizeMode="contain"
          source={{
            uri: profileUrl(src),
          }}
        />
      );
    }
  };
  return (
    <View
      style={{
        width: 150,
        height: 160,
      }}
    >
      {isSender ? (
        <Image
          style={{
            width: 150,
            height: 160,
            position: "absolute",
            top: 5,
          }}
          resizeMode="contain"
          source={require("../../../../../assets/EditDrawerIcon/sender.png")}
        />
      ) : (
        <Image
          style={{
            width: 150,
            height: 160,
            position: "absolute",
            top: 5,
          }}
          resizeMode="contain"
          source={require("../../../../../assets/EditDrawerIcon/reciver.png")}
        />
      )}
      {renderImage()}
    </View>
  );
}

const styles = StyleSheet.create({});
