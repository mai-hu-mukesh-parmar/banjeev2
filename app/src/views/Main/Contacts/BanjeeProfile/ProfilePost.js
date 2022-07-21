import { Text } from "native-base";
import React, { Fragment, useEffect, useState } from "react";
import { VirtualizedList, View, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import { OtherFeedService } from "../../../../helper/services/OtherFeedService";
import FeedContent from "../../Feed/FeedSkeleton/FeedContent";
import FeedFooter from "../../Feed/FeedSkeleton/FeedFooter";
import FeedHeader from "../../Feed/FeedSkeleton/FeedHeader";
import FeedProfile from "../../Feed/FeedSkeleton/FeedProfile";
export default function ProfilePost() {
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  const { profileId } = useSelector((state) => state.viewProfile);

  const otherFeed = React.useCallback(
    () =>
      OtherFeedService({
        author: null,
        authorId: null,
        createdOn: null,
        deleted: null,
        geoLocation: null,
        id: null,
        locationId: null,
        mediaContent: null,
        mediaRootDirectoryId: null,
        otherUserId: profileId,
        page: page,
        pageId: null,
        pageName: null,
        pageSize: 15,
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
          setRefresh(false);
          if (res.content && res.content.length > 0) {
            console.warn("first");
            setData((prev) => [...prev, ...res.content]);
          }
        })
        .catch((err) => console.log(err)),
    [profileId, page]
  );
  useEffect(() => {
    otherFeed();
  }, [otherFeed]);

  function renderItem({ item }) {
    return (
      <View style={styles.mainView} key={item.id}>
        <View style={styles.grid}>
          <FeedProfile item={item} />
          <View style={styles.header}>
            <FeedHeader item={item} />
          </View>
        </View>
        <FeedContent item={item} />
        <FeedFooter item={item} />
      </View>
    );
  }

  return (
    <Fragment>
      {data.length === 0 ? (
        <View
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>User haven't posted any post...!</Text>
        </View>
      ) : (
        <VirtualizedList
          data={data}
          // data={data.map((ele) => ({ ...ele, key: Math.random() }))}
          renderItem={renderItem}
          keyExtractor={(data) => data.key}
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          showsVerticalScrollIndicator={false}
          onRefresh={() => {
            setPage(0);
            otherFeed();
          }}
          refreshing={refresh}
          // onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          onEndReachedThreshold={0.1}
          onEndReached={() => setPage((prev) => prev + 1)}
        />
      )}
    </Fragment>
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
});
