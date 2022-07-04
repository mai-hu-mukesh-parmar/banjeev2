import {
  View,
  Image,
  TouchableWithoutFeedback,
  Animated,
  VirtualizedList,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFeed } from "../../../helper/services/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import {
  saveFeed,
  saveFeedAction,
} from "../../../redux/store/action/feedAction";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Viewport } from "@skele/components";
import { Text } from "native-base";
import color from "../../../constants/env/color";
import FeedSkeleton from "../../../constants/components/ui-skeleton/FeedSkeleton";
import Feed from "./Feed";
import usePermission from "../../../utils/hooks/usePermission";
import { useIsFocused } from "@react-navigation/native";
import { showToast } from "../../../redux/store/action/toastAction";
import FeedContext, { FeedProvider } from "./FeedContext/FeedContext";

export default function FeedScreen() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { setOptions, navigate } = useNavigation();

  const { checkPermission } = usePermission();

  const {
    feed: { otherPostId, screen, feed: data, page, loadingData },
  } = useSelector((state) => state);

  const scrollY = new Animated.Value(100);

  const diffClamp = Animated.diffClamp(scrollY, 0, 70);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 70],
    outputRange: [0, 70],
  });
  const allFeed = useCallback(async () => {
    dispatch(saveFeedAction({ loadingData: true }));

    await checkPermission("STORAGE");
    getFeed({
      author: null,
      authorId: null,
      createdOn: null,
      deleted: null,
      geoLocation: null,
      id: null,
      locationId: null,
      mediaContent: null,
      mediaRootDirectoryId: null,
      otherUserId: null,
      pageId: null,
      pageName: null,
      percentage: 0,
      reactions: null,
      reactionsCount: null,
      recentComments: null,
      text: null,
      totalComments: null,
      totalReactions: null,
      visibility: null,
    })
      .then((res) => {
        dispatch(saveFeedAction({ loadingData: false }));

        if (res?.length > 0) {
          dispatch(
            saveFeed(res.map((ele) => ({ ...ele, key: Math.random() })))
          );
        } else {
          dispatch(
            showToast({
              open: true,
              description: "you have reached at the end of the post ",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setHeader = useCallback(() => {
    if (!otherPostId) {
      setOptions({
        headerRight: () => (
          <AppFabButton
            onPress={() => navigate("FeedNotification")}
            size={24}
            icon={
              <React.Fragment>
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={25}
                  color={"black"}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    height: 10,
                    left: 0,
                    width: 10,
                    backgroundColor: "lightgreen",
                    borderRadius: 50,
                  }}
                />
              </React.Fragment>
            }
          />
        ),
        headerLeft: () => (
          <View
            style={{
              width: 130,
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Image
              source={require("../../../../assets/EditDrawerIcon/banjee_feed.png")}
              style={{ width: 130, height: 30 }}
              resizeMode="contain"
            />
          </View>
        ),
      });
    }
  }, []);

  useEffect(() => {
    setHeader();
    if (isFocused) {
      allFeed();
    } else {
      // setData([]);
    }
  }, [allFeed, setHeader, isFocused]);

  function renderItem({ item }) {
    return (
      <Feed
        key={Math.random()}
        item={item}
        // myFeed={myFeed}
        myPost={screen === "ALL"}
        allFeed={allFeed}
      />
    );
  }

  return (
    <FeedProvider>
      <View style={styles.container}>
        <VirtualizedList
          howsVerticalScrollIndicator={false}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          data={data}
          keyExtractor={(data) => data.key}
          renderItem={renderItem}
          refreshing={loadingData}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          onViewableItemsChanged={(data) => {
            dispatch(saveFeedAction({ viewableItems: data.viewableItems }));
          }}
          onRefresh={() => dispatch(saveFeedAction({ page: 0 }))}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={
            <Text style={{ alignSelf: "center", marginTop: 120 }}>
              You have not created any post yet...!
            </Text>
          }
          onEndReached={() => dispatch(saveFeedAction({ page: page + 1 }))}
        />
      </View>

      <View style={styles.filterView}>
        <Animated.View style={{ transform: [{ translateY: translateY }] }}>
          <TouchableWithoutFeedback
            onPress={() => navigate("CreateFeed", { allFeed: allFeed })}
          >
            <View style={styles.subView}>
              <Text
                onPress={() => navigate("CreateFeed", { data: null })}
                style={{ zIndex: 99, fontSize: 12, color: color.white }}
              >
                Post Your Feed
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    </FeedProvider>
  );
}

const FeedClear = () => {
  const { setPlayAbleFeed } = useContext(FeedContext);
  const { addListener } = useNavigation();

  useEffect(() => {
    addListener("blur", () => {
      setPlayAbleFeed([]);
    });
  }, []);
  return null;
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
  filterView: {
    height: 34,
    position: "absolute",
    bottom: 100,
    flexDirection: "row",
    width: 256,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  subView: {
    width: 120,
    borderWidth: 1,
    borderColor: "#666e7b",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  filterView: {
    height: 34,
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    width: 256,
    alignSelf: "center",
    alignItems: "center",
    zIndex: 9,
    justifyContent: "center",
  },
  subView: {
    width: 120,
    borderWidth: 1,
    borderColor: "#666e7b",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 99,
  },
});
