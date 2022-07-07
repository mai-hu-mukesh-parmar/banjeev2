import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { Audio } from "expo-av";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { postReaction } from "../../../helper/services/Reaction";
import { emojies } from "../../../utils/util-func/emojies";
import color from "../../../constants/env/color";
import { useSelector } from "react-redux";

function Reaction({
  likeComment,
  setLikeCount,
  postId,
  size,
  ourLike,
  marginLeft,
}) {
  const [showReaction, setShowReaction] = React.useState(false); //fr reaction
  const [selectedReaction, setSelectedReaction] = React.useState();
  const { systemUserId } = useSelector((state) => state.registry);

  // console.warn("----------->`", ourLike?.[0]?.reactionType);
  const submitReaction = (action) => {
    postReaction({
      nodeId: postId,
      nodeType: likeComment ? "COMMENT" : "FEED",
      reactionType: action,
      userId: systemUserId,
    })
      .then(async (res) => {
        setLikeCount((prev) => prev + 1);
        let notificationRingtone = require("../../../../assets/ringtones/reaction.mp3");
        let { sound } = await Audio.Sound.createAsync(notificationRingtone);
        await sound.playAsync();
        setShowReaction(false);
      })
      .catch((err) => {
        console.warn("Post Reaction ", err);
      });
  };

  const reactions = [
    {
      emoji: require("../../../../assets/emoji/LIKE.png"),
      text: "like",
      onPress: () => {
        submitReaction("LIKE");
        setSelectedReaction(require("../../../../assets/emoji/LIKE.png"));
      },
    },
    {
      emoji: require("../../../../assets/emoji/LOVE.png"),
      text: "love",
      onPress: () => {
        submitReaction("LOVING");
        setSelectedReaction(require("../../../../assets/emoji/LOVE.png"));
      },
    },
    {
      emoji: require("../../../../assets/emoji/CELEBRATING.png"),
      text: "laugh",
      onPress: () => {
        submitReaction("CELEBRATING");
        setSelectedReaction(
          require("../../../../assets/emoji/CELEBRATING.png")
        );
      },
    },
    {
      emoji: require("../../../../assets/emoji/NICE.png"),
      text: "Wow",
      onPress: () => {
        submitReaction("NICE");

        setSelectedReaction(require("../../../../assets/emoji/NICE.png"));
      },
    },
    {
      emoji: require("../../../../assets/emoji/SAD.png"),
      text: "sad",
      onPress: () => {
        submitReaction("SAD");
        setSelectedReaction(require("../../../../assets/emoji/SAD.png"));
      },
    },

    {
      emoji: require("../../../../assets/emoji/ANGRY.png"),
      text: "angry",
      onPress: () => {
        submitReaction("ANGRY");

        setSelectedReaction(require("../../../../assets/emoji/ANGRY.png"));
      },
    },
  ];

  // let x = !selectedReaction && ourLike?.[0]?.reactionType === undefined;

  let y = ourLike?.[0]?.reactionType;

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Menu
          visible={showReaction}
          style={{ borderRadius: 50 }}
          anchor={
            <View>
              {selectedReaction ? (
                <TouchableWithoutFeedback
                  onLongPress={() => setShowReaction(true)}
                >
                  <Image
                    source={selectedReaction}
                    style={{
                      height: size,
                      width: size,
                      padding: 5,
                      marginLeft: 5,
                    }}
                  />
                </TouchableWithoutFeedback>
              ) : y ? (
                <TouchableWithoutFeedback
                  onLongPress={() => setShowReaction(true)}
                >
                  <View style={{ marginLeft: marginLeft ? marginLeft : 0 }}>
                    {emojies(y, true, size)}
                  </View>
                </TouchableWithoutFeedback>
              ) : !selectedReaction ? (
                <MaterialCommunityIcons
                  name={"heart-outline"}
                  style={{
                    padding: 5,
                    marginRight: -5,
                  }}
                  onLongPress={() => setShowReaction(true)}
                  color={color.greyText}
                  size={size}
                />
              ) : (
                <TouchableWithoutFeedback
                  onLongPress={() => setShowReaction(true)}
                >
                  <Image
                    source={selectedReaction}
                    style={{
                      height: size,
                      width: size,
                      padding: 5,
                      marginLeft: 5,
                    }}
                  />
                </TouchableWithoutFeedback>
              )}
            </View>
          }
          onRequestClose={() => setShowReaction(false)}
        >
          <MenuItem>
            <TouchableWithoutFeedback onPress={() => setShowReaction(false)}>
              <View style={styles.menu}>
                {reactions.map((ele, i) => (
                  <TouchableWithoutFeedback
                    key={i}
                    onPress={() => ele.onPress()}
                  >
                    <Image
                      source={ele.emoji}
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                      }}
                    />
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingLeft: "5%",
    width: "100%",
    flexDirection: "row",
    height: 56,
    alignItems: "center",
  },
  emoji: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    height: "100%",
    width: "87%",
    borderBottomColor: color.greyText,
    justifyContent: "space-between",
    marginLeft: 20,
  },
  menu: {
    borderRadius: 20,
    flexDirection: "row",
    width: 230,
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
    height: "100%",
    paddingTop: 5,
    paddingLeft: 15,
  },
});

export default Reaction;
