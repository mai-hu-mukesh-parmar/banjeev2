import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AppFabButton from "./ui-component/AppFabButton";
import color from "../env/color";

function ShowImage({ image, hideModal }) {
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        padding: 0,
      }}
    >
      <View style={{ width: "100%", height: 60, backgroundColor: color.white }}>
        <AppFabButton
          size={30}
          onPress={hideModal}
          icon={
            <MaterialCommunityIcons
              name="arrow-left"
              color={color.black}
              size={24}
            />
          }
        />
      </View>
      <LinearGradient
        style={{
          flex: 1,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.2, y: 1 }}
        colors={["rgba(237, 71, 92, 1 )", "rgba(98, 4, 160, 1 )"]}
      >
        {image && image.length > 0 && (
          <Image
            resizeMode="contain"
            source={{ uri: image }}
            style={{ width: "100%", height: "80%", marginTop: "10%" }}
          />
        )}

        <View
          style={{
            height: 70,
            width: "100%",
            backgroundColor: "purple",
            position: "absolute",
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "40%",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <AppFabButton
              onPress={hideModal}
              size={20}
              icon={
                <Image
                  source={require("../../../assets/EditDrawerIcon/ic_send_message_round.png")}
                  style={{ height: 35, width: 35 }}
                />
              }
            />
            <AppFabButton
              size={20}
              icon={
                <Image
                  source={require("../../../assets/EditDrawerIcon/ic_distructive.png")}
                  style={{ height: 35, width: 35 }}
                />
              }
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ShowImage;
