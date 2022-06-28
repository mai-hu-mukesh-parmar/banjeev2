import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import AppMenu from "../../../../constants/components/ui-component/AppMenu";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
export default function HeaderRight({
  chatUser,
  setReportModal,
  setBlockModal,
  setUnfriendModal,
}) {
  const { navigate } = useNavigation();

  const { systemUserId } = useSelector((state) => state.registry);
  return (
    <React.Fragment>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AppFabButton
          onPress={() => {
            navigate("MakeVideoCall", { ...chatUser, callType: "Video" });
          }}
          size={20}
          icon={
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../../../../assets/EditDrawerIcon/ic_video_call.png")}
            />
          }
        />

        <AppFabButton
          onPress={() => {
            navigate("MakeVideoCall", { ...chatUser, callType: "Voice" });
          }}
          size={20}
          icon={
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../../../../assets/EditDrawerIcon/ic_call_black.png")}
            />
          }
        />
        <View
          style={{
            // borderWidth: 1,
            // alignItems: "center",
            // justifyContent: "center",
            marginTop: 9,
          }}
        >
          <AppMenu
            menuContent={[
              {
                icon: "account-minus",
                label: "Unfriend",
                onPress: () => setUnfriendModal(true),
              },
              {
                icon: "block-helper",
                label: "Block User",
                onPress: () => setBlockModal(true),
              },
              {
                icon: "flag",
                label: "Report This User",
                onPress: () => setReportModal(true),
              },
            ]}
          />
        </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
