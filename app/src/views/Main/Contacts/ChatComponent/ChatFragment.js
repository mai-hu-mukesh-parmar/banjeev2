import { View } from "react-native";
import React from "react";
import RenderMedia from "./RenderMedia";
import RenderCall from "./RenderCall";

export default function ChatFragment({
  chatContent,
  mediaPlayer,
  setMediaPlayer,
}) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        backgroundColor:
          chatContent?.isSender && chatContent?.content?.type !== "OTHER"
            ? "#F0F0FF"
            : "#fff00",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {chatContent?.content.type === "OTHER" ? (
        <RenderCall chatContent={chatContent} />
      ) : (
        <RenderMedia
          chatContent={chatContent}
          mediaPlayer={mediaPlayer}
          setMediaPlayer={setMediaPlayer}
        />
      )}
    </View>
  );
}
