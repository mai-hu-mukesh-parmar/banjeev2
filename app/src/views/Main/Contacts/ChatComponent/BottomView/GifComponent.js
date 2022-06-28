import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppInput from "../../../../../constants/components/ui-component/AppInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppFabButton from "../../../../../constants/components/ui-component/AppFabButton";
import color from "../../../../../constants/env/color";
import axios from "axios";
import MasonryList from "react-native-masonry-list";
import RBSheet from "react-native-raw-bottom-sheet";
import AppLoading from "../../../../../constants/components/ui-component/AppLoading";

function GifComponent({ refRBSheet, sendInChat }) {
  console.warn("----------------------------------->", refRBSheet);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [gifType, setGifType] = React.useState("clock");

  // const [xcolor, setxColor] = React.useState(color.grey);
  const gifIcon = [
    {
      id: 0,
      name: "clock",
      onPress: () => {
        setData([]);
        setGifType("clock");
      },
    },
    {
      id: 1,
      name: "gif",
      onPress: () => {
        setData([]);
        setGifType("gif");
      },
    },
    {
      id: 2,
      name: "sticker",
      onPress: () => {
        setData([]);
        setGifType("sticker");
      },
    },
    {
      id: 3,
      name: "chat",
      onPress: () => {
        setData([]);
        setGifType("chat");
      },
    },
    {
      id: 4,
      name: "emoticon-happy",
      onPress: () => setGifType("emoticon-happy"),
    },
  ];

  /**
   *  Loading Recent or Trending Gif
   *
   */
  const loadClockGif = React.useCallback(
    (keyword, limit) => {
      // setData([]);
      console.log(limit);
      let text;
      if (keyword) {
        text = keyword;
      } else {
        text = "random";
      }

      const url = `https://api.giphy.com/v1/gifs/search?api_key=2an1ZhO16wRaU46OokZ4HOEOKnmMISU8&q=${text}&limit=10&rating=g&offset=${limit}`;
      axios
        .get(url)
        .then((res) => {
          if (gifType === "clock") {
            console.log(gifType);

            setData((prev) => [...prev, ...res.data.data]);
          } else {
            setData((prev) => res.data.data);
          }
        })
        .catch((err) => console.warn(err));
    },
    [gifType]
  );

  /**
   * Loading Gif
   *
   */

  const loadRandom = React.useCallback(
    (limit) => {
      // setData([]);
      console.log(limit);

      const url = `https://api.giphy.com/v1/gifs/trending?api_key=BjrzaTUXMRi27xIRU0xZIGRrNztyuNT8&limit=10&offset=${limit}&rating=g&lang=en`;
      axios
        .get(url)
        .then((res) => {
          if (gifType === "gif") {
            setData((prev) => [...prev, ...res.data.data]);
          } else {
            setData((prev) => res.data.data);
          }
        })
        .catch((err) => console.warn(err));
    },
    [gifType]
  );

  /**
   * Loading Stickers
   *
   */
  const loadStickersGif = React.useCallback(
    (limit) => {
      // setData([]);
      console.log(limit);

      const url = `https://api.giphy.com/v1/stickers/trending?api_key=2an1ZhO16wRaU46OokZ4HOEOKnmMISU8&limit=10&rating=g&offset=${limit}`;
      axios
        .get(url)
        .then((res) => {
          if (gifType === "sticker") {
            setData((prev) => [...prev, ...res.data.data]);
          } else {
            setData((prev) => res.data.data);
          }
        })
        .catch((err) => console.warn(err));
    },
    [gifType]
  );

  /**
   * Loading Text
   *
   */

  const loadText = React.useCallback(
    (limit) => {
      // setData([]);
      console.log(limit);

      const url = `https://api.giphy.com/v1/text/trending?api_key=BjrzaTUXMRi27xIRU0xZIGRrNztyuNT8&limit=10&offset=${limit}&rating=g&lang=en`;
      axios
        .get(url)
        .then((res) => {
          if (gifType === "chat") {
            setData((prev) => [...prev, ...res.data.data]);
          } else {
            setData((prev) => res.data.data);
          }
        })
        .catch((err) => console.warn(err));
    },
    [gifType]
  );

  /**
   * Loading Emojis
   *
   */
  const getEmoji = React.useCallback(
    (limit) => {
      // setData([]);
      const url = `https://api.giphy.com/v1/emoji?api_key=BjrzaTUXMRi27xIRU0xZIGRrNztyuNT8&limit=10&offset=${limit}`;
      axios
        .get(url)
        .then((res) => {
          if (gifType === "emoticon-happy") {
            console.log(gifType);
            setData((prev) => [...prev, ...res.data.data]);
          } else {
            setData((prev) => res.data.data);
          }
        })
        .catch((err) => console.warn(err));
    },
    [gifType]
  );

  // console.log(JSON.stringify(data[0]));

  const renderGifData = React.useCallback(() => {
    switch (gifType) {
      case "clock":
        loadClockGif("random", page);
        break;
      case "gif":
        loadRandom(page);
        break;
      case "sticker":
        loadStickersGif(page);
        break;
      case "chat":
        loadText(page);
        break;
      case "emoticon-happy":
        getEmoji(page);
        break;
      default:
        loadClockGif(page);
        break;
    }
  }, [page, gifType, loadClockGif, getEmoji]);

  React.useEffect(() => {
    renderGifData();
  }, [renderGifData]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <RBSheet
        customStyles={{ container: { borderRadius: 10 } }}
        height={500}
        ref={refRBSheet}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        draggableIcon
      >
        <View style={{ height: "100%", position: "relative" }}>
          <View style={{ paddingTop: 55 }}>
            <MaterialCommunityIcons
              style={styles.icon}
              name={"magnify"}
              size={30}
              color={color.primary}
            />
            <View
              style={{
                position: "absolute",
                width: "98%",
                alignSelf: "center",
                marginTop: -10,
              }}
            >
              <AppInput
                style={{
                  backgroundColor: color.lightGrey,
                  borderRadius: 50,
                  paddingLeft: 50,
                }}
                placeholder={"Search GIPHY"}
                onChangeText={(txt) => loadClockGif(txt, page)}
              />
            </View>
          </View>
          {/* <ScrollView style={{ marginBottom: 75 }} nestedScrollEnabled={true}> */}
          {/* <View
              style={{
                height: "100%",
                zIndex: 999999,
                backgroundColor: "red",
                width: "100%",
              }}
            > */}
          <View style={{ height: "74%", width: "100%" }}>
            {data.length > 0 ? (
              <MasonryList
                images={data.map((ele) => ({
                  uri: ele.images?.preview_gif.url,
                }))}
                onPressImage={(giphy) => {
                  sendInChat(
                    giphy.source.uri.substring(31, 44),
                    giphy.source.uri.substring(31, 44),
                    "image/gif"
                  );
                  refRBSheet.current.close();
                }}
                onEndReached={() => setPage((prev) => prev + 1)}
                onEndReachedThreshold={0.2}
              />
            ) : (
              <AppLoading visible={true} />
            )}
          </View>
          {/* </View> */}
          {/* </ScrollView> */}

          <View style={styles.iconView}>
            {gifIcon.map((ele, i) => (
              <AppFabButton
                key={i}
                onPress={() => {
                  ele.onPress();
                  // i === ele.id ? setxColor(color.black) : setxColor(color.grey);
                }}
                size={18}
                icon={
                  <MaterialCommunityIcons
                    name={ele.name}
                    size={25}
                    color={ele.name === gifType ? color.black : color.grey}
                  />
                }
              />
            ))}
          </View>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", width: "100%" },
  icon: {
    transform: [{ rotate: "90deg" }],
    position: "absolute",
    top: 15,
    zIndex: 1,
    left: 20,
  },

  iconView: {
    position: "absolute",
    bottom: 25,
    height: "10%",
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});

export default GifComponent;