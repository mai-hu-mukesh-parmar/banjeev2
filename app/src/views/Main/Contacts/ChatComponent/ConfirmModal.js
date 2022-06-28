import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from "react-native";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import { Text } from "native-base";
import AppBorderButton from "../../../../constants/components/ui-component/AppBorderButton";

function ConfirmModal({ setModalVisible, btnLabel, message, onPress, title }) {
  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 9,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <ImageBackground
            source={require("../../../../../assets/EditDrawerIcon/modalBg.png")}
            style={styles.container}
          >
            <Image
              source={require("../../../../../assets/EditDrawerIcon/danger.png")}
              style={{
                width: "60%",
                marginTop: 23,
                height: 90,
                alignSelf: "center",
              }}
            />

            <Text
              style={{
                textAlign: "center",
                marginTop: 5,
                fontSize: 24,
                marginBottom: 19,
              }}
            >
              {message}
            </Text>

            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                width: 180,
                marginBottom: 20,
              }}
            >
              {title}
            </Text>

            <AppButton
              style={{ alignSelf: "center", marginBottom: 10, width: "60%" }}
              title={"Cancel"}
              onPress={() => setModalVisible(false)}
            />

            <View style={{ alignItems: "center", marginBottom: 45 }}>
              <AppBorderButton
                width="60%"
                title={btnLabel}
                onPress={() => onPress()}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 50,
    shadowColor: "grey",
    shadowOffset: {
      height: 10,
      width: 10,
    },

    borderRadius: 8,
    shadowRadius: 50,
    shadowOpacity: 0.8,
    alignSelf: "center",
    zIndex: 2,
    // height: 200,
    width: "100%",
    justifyContent: "center",
  },
});

export default ConfirmModal;
