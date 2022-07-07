import React, { Fragment } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import ContentViewer from "../ContentViewer";
import Carousel from "react-native-snap-carousel";
import color from "../../../../constants/env/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ViewMoreText from "react-native-view-more-text";
import { Text } from "native-base";

function FeedContent({ item }) {
  const c = React.useRef();
  const renderItem = ({ item }) => <ContentViewer {...item} />;
  function renderViewMore(onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.moreText}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={color.greyText}
          />
          <Text style={{ color: color.greyText }}>Show more</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function renderViewLess(onPress) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.moreText}>
          <MaterialCommunityIcons
            name="chevron-up"
            size={20}
            color={color.greyText}
          />
          <Text style={{ color: color.greyText }}>Show less</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={{ marginBottom: 20 }}>
      {item?.text?.length > 0 && (
        <ViewMoreText
          numberOfLines={3}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={{
            width: "95%",
            alignSelf: "center",
            paddingLeft: 10,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Text>{item?.text.trim()}</Text>
        </ViewMoreText>
      )}

      {item?.mediaContent?.length > 0 && (
        <View
          style={{
            width: "95%",
            height: 320,
            alignSelf: "center",
            marginTop: item?.text?.length === 0 ? 10 : 0,
          }}
        >
          <Carousel
            dotColor={color.primary}
            inactiveDotColor={"grey"}
            layout="default"
            ref={c}
            data={item.mediaContent}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width}
          />
        </View>
      )}
    </View>
  );
}
export default FeedContent;

const styles = StyleSheet.create({
  moreText: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    marginLeft: 20,
    alignItems: "center",
  },
  mainView: {
    width: "100%",
    alignSelf: "flex-end",
    marginBottom: 17,
    backgroundColor: "white",
    paddingBottom: 15,
  },
  grid: {
    paddingLeft: "5%",
    width: "100%",
    flexDirection: "row",
    height: 56,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    height: "100%",
    width: "87%",
    borderBottomColor: color.greyText,
    justifyContent: "space-between",
    marginLeft: 20,
  },

  mainView: {
    width: "100%",
    alignSelf: "flex-end",
    marginBottom: 17,
    backgroundColor: "white",
    paddingBottom: 15,
  },
  grid: {
    paddingLeft: "5%",
    width: "100%",
    flexDirection: "row",
    height: 56,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    height: "100%",
    width: "87%",
    borderBottomColor: color.greyText,
    justifyContent: "space-between",
    marginLeft: 20,
  },

  // postTitle: {
  //   paddingLeft: "5%",
  //   marginRight: 10,
  //   fontSize: 14,
  //   color: "#3a3d3f",
  //   marginTop: 16,
  //   lineHeight: 20,
  //   marginBottom: -35, // post image margin
  // },
});
