import { useNavigation } from "@react-navigation/native";
import { Avatar, Text } from "native-base";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import color from "../../../../../constants/env/color";
import { MarkAsReadNotification } from "../../../../../helper/services/BanjeeNotification";
import { getProfile } from "../../../../../redux/store/action/Profile/userPendingConnection";
import {
  listProfileUrl,
  profileUrl,
} from "../../../../../utils/util-func/constantExport";

function NewComment({ item }) {
  const {
    contents: {
      payload: {
        text,
        id,
        createdByUser: { avtarUrl, username, id: userId },
      },
    },
  } = item;

  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // console.log("object from comment------>", item);
        navigate("SinglePost", { feedId: id });
        MarkAsReadNotification(item.id);
      }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: item.markAsRead ? color.white : "#dadaef" },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch(getProfile({ profileId: userId }));
            navigate("BanjeeProfile");
          }}
        >
          {/* <Image
						source={{ uri: profileUrl(avtarUrl) }}
						style={{ height: 40, width: 40, borderRadius: 20 }}
					/> */}
          <Avatar
            bgColor={color.primary}
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: listProfileUrl(userId) }}
          >
            {username?.charAt(0).toUpperCase() || ""}
          </Avatar>
        </TouchableWithoutFeedback>
        <View style={{ flexDirection: "column", marginLeft: 20 }}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>{username}</Text> commented on
            your post.
          </Text>
          <Text numberOfLines={1} style={{ fontSize: 14 }}>
            "{text}"
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    width: "100%",
    height: "100%",
    borderBottomWidth: 0.5,
  },
});

export default NewComment;
