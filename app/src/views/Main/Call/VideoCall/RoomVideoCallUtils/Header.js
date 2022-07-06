import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { Text } from "native-base";
import AppFabButton from "../../../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { profileUrl } from "../../../../../utils/util-func/constantExport";
import AppMenu from "./AppMenu";
import AppButton from "../../../../../constants/components/ui-component/AppButton";
import color from "../../../../../constants/env/color";

function Header({
  chatroomId,
  user,
  roomUserCount,
  userCount,
  groupName,
  goBack,
  _leaveChannel,
  profileUrlSrc,
}) {
  function removeFromRoom() {
    // RemoveFriendFromGroup({
    // 	chatroomId: chatroomId,
    // 	groupId: null,
    // 	// toUserId: "6176b3a771748e095f9a2d2a",
    // });
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {Platform.select({
        android: (
          <AppFabButton
            onPress={() => goBack()}
            size={24}
            icon={<MaterialCommunityIcons size={24} name="arrow-left" />}
          />
        ),
      })}
      <Image
        source={{ uri: profileUrl(profileUrlSrc) }}
        style={styles.profileImg}
      />
      <View
        style={{
          // flex: 1,
          display: "flex",
          flexDirection: "row",
          width: "76%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: 20,
          }}
        >
          <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
            {groupName}
          </Text>

          <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: "300" }}>
            {parseInt(roomUserCount) + userCount} Participants
          </Text>
        </View>

        <View
          style={{
            // backgroundColor: "#999",
            width: "58%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AppFabButton
            // onPress={() => goBack()}
            size={24}
            icon={
              <MaterialCommunityIcons
                size={35}
                color="red"
                name="record-circle-outline"
              />
            }
          />
          <AppButton
            style={{
              width: 60,
              height: 35,
              borderRadius: 25,
              fontSize: 15,
            }}
            title={"Exit"}
            onPress={_leaveChannel}
          />

          <AppMenu
            style={{
              left: "62.5%",
              top: "6%",
            }}
            menuColor="#000"
            menuContent={[
              {
                icon: "account-minus",
                label: "Leave Room",
                onPress: () => removeFromRoom(),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: color.primary,
    borderWidth: 1,
    marginLeft: Platform.OS === "ios" ? 20 : 0,
  },
});

export default Header;
