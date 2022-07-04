import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import ShowImage from "../../../../constants/components/ShowImage";
import OverlayDrawer from "../../../../constants/components/ui-component/OverlayDrawer";

export default function ImageComp({ isSender, src, mimeHandler }) {
  const [showImag, setShowImage] = React.useState(false);

  const renderImage = () => {
    if (mimeHandler[1] === "gif") {
      return (
        <TouchableWithoutFeedback onPress={() => setShowImage(true)}>
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
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => setShowImage(true)}>
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
        </TouchableWithoutFeedback>
      );
    }
  };
  return (
    <React.Fragment>
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

      {showImag && (
        <OverlayDrawer
          transparent
          visible={showImag}
          onClose={() => setShowImage(false)}
          closeOnTouchOutside
          animationType="fadeIn"
          containerStyle={{
            backgroundColor: "rgba(238, 238, 255, 0.7)",
            padding: 0,
            height: "100%",
            width: "100%",
          }}
          childrenWrapperStyle={{
            width: "100%",
            padding: 0,
            height: "100%",
          }}
          animationDuration={100}
        >
          <ShowImage
            showBtn={false}
            hideModal={() => setShowImage(false)}
            image={
              mimeHandler[1] === "gif"
                ? "http://media1.giphy.com/media/" + src + "/giphy.gif"
                : profileUrl(src)
            }
          />
        </OverlayDrawer>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
