import { View, StyleSheet, Image, Platform } from "react-native";
import React from "react";
import {
  listProfileUrl,
  profileUrl,
} from "../../../../utils/util-func/constantExport";
import checkUserStatus from "./checkUserStatus";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import ImageComp from "./ImageComp";
import VideoComp from "./VideoComp";
import AudioComp from "./AudioComp";
import { Text } from "native-base";
import { useRoute } from "@react-navigation/native";
import { deleteChat } from "../../../../helper/services/ChatService";
import { SocketContext } from "../../../../Context/Socket";

export default function RenderMedia({
  chatContent,
  mediaPlayer,
  setMediaPlayer,
}) {
  const {
    params: {
      item: { id: avtarUrl, firstName },
    },
  } = useRoute();

  const socket = React.useContext(SocketContext);
  const { isSender, content, createdOn, id, messageSeen } = chatContent;

  const renderContent = () => {
    //  MIME_TEXT_PLAIN = "text/plain";
    //  MIME_TEXT_HTML = "text/html";
    //  MIME_IMAGE = "image/jpg";
    //  MIME_VIDEO = "video/mp4";
    //  MIME_AUDIO = "audio/mp3";
    //  MIME_DOCUMENT = "document";
    //  MIME_LOCATION = "location";
    //  MIME_IMAGE_GIF = "image/gif";

    const { mimeType, src } = content;
    const mimeHandler = mimeType?.split("/");
    const type = mimeHandler?.[0];
    switch (type) {
      case "text":
        return <Text>This is for text</Text>;
      case "image":
        return (
          <ImageComp src={src} isSender={isSender} mimeHandler={mimeHandler} />
        );

      case "video":
        return <VideoComp src={src} isSender={isSender} />;
      case "audio":
        return (
          <AudioComp
            src={src}
            isSender={isSender}
            mediaPlayer={mediaPlayer}
            setMediaPlayer={setMediaPlayer}
          />
        );
      case "document":
        return <Text>This is for document</Text>;
      case "location":
        return <Text>This is for location</Text>;
      default:
        return null;
    }
  };
  socket?.on("CHAT_MESSAGE_DELETED", (data) => {
    // console.log(data);
  });
  const deleteChatFun = (id) => {
    deleteChat(id)
      .then((res) => {
        // console.log(id);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <React.Fragment>
      {isSender && (
        <Image
          source={{ uri: listProfileUrl(avtarUrl) }}
          style={styles.profileImg}
        />
      )}
      <View>
        {isSender && (
          <Text
            style={{
              marginLeft: 5,
              marginTop: 10,
              fontSize: Platform.OS === "ios" ? 11 : 12,
              fontWeight: Platform.OS === "ios" ? "normal" : "bold",
            }}
          >
            {firstName} {checkUserStatus(createdOn, false)}
          </Text>
        )}

        <View
          style={{
            display: "flex",
            width: "100%",

            flexDirection: isSender ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View style={{}}>
            <AppFabButton
              onPress={() => {
                deleteChatFun(id);
              }}
              size={20}
              style={{ marginTop: !isSender ? -20 : 0 }}
              icon={
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../../../../../assets/EditDrawerIcon/chat_delete.png")}
                />
              }
            />
            {!isSender &&
              (messageSeen ? (
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    // 	size={20}
                    marginTop: -5,
                    marginLeft: 12,
                  }}
                  source={require("../../../../../assets/EditDrawerIcon/ic_delivered_and_viewed.png")}
                />
              ) : (
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    // 	size={20}
                    marginTop: -5,
                    marginLeft: 10,
                  }}
                  source={require("../../../../../assets/EditDrawerIcon/ic_delivered.png")}
                />
              ))}
          </View>
          {isSender && (
            <AppFabButton
              onPress={() => console.log("reaction")}
              size={20}
              icon={
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../../../../../assets/EditDrawerIcon/reaction.png")}
                />
              }
            />
          )}
          {content && renderContent()}
        </View>
        {!isSender && (
          <Text
            style={{
              marginLeft: 5,
              textAlign: "right",
              marginTop: -10,
              fontSize: Platform.OS === "ios" ? 11 : 12,
              fontWeight: Platform.OS === "ios" ? "normal" : "bold",
            }}
          >
            {checkUserStatus(createdOn, false)}
          </Text>
        )}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 20,
    marginLeft: 30,
  },
});
