import React from "react";
import { View, StyleSheet, VirtualizedList } from "react-native";
import { Text } from "native-base";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
// Expo Icons //
import { MaterialCommunityIcons } from "@expo/vector-icons";
// UI Components //
import AppLoading from "../../../constants/components/ui-component/AppLoading";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import { myBanjeeService } from "../../../helper/services/Service";
// Contacts Components //
import BanjeeContacts from "./BanjeeContacts";
import { listBanjeeContact } from "../../../redux/store/action/contactAction";

function MyBanjee(props) {
  const [zeroBanjee, setZeroBanjee] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataCount, setDataCount] = React.useState(15);
  const [visible, setVisible] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const { systemUserId } = useSelector((data) => data.registry, shallowEqual);

  const { setOptions, navigate } = useNavigation();

  const isFocused = useIsFocused();

  const pageSize = 10;

  const listContact = React.useCallback(
    (page) => {
      setVisible(true);
      setZeroBanjee(false);
      myBanjeeService({
        blocked: false,
        circleId: null,
        connectedUserId: null,
        fromUserId: null,
        id: null,
        page: page,
        pageSize: pageSize,
        keyword: null,
        toUserId: null,
        userId: systemUserId,
      })
        .then((res) => {
          setRefresh(false);
          setVisible(false);
          if (res) {
            const x = res.content.map((item) =>
              systemUserId === item.connectedUser.id
                ? {
                    ...item.user,
                    userId: item.id,
                    userLastSeen: item.userLastSeen,
                    connectedUserOnline: item.userOnline,
                    chatroomId: item.chatroomId,
                  }
                : {
                    ...item.connectedUser,
                    userId: item.id,
                    userLastSeen: item.cuserLastSeen,
                    connectedUserOnline: item.connectedUserOnline,
                    chatroomId: item.chatroomId,
                  }
            );
            setDataCount(res?.content?.length);
            setData((prev) => [...prev, ...x]);
          } else {
            setZeroBanjee(true);
          }
        })
        .catch((err) => console.warn(err));
    },
    [systemUserId]
  );

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true);
      listContact(0);
      setOptions({
        headerRight: () => (
          <AppFabButton
            size={20}
            onPress={() => navigate("SearchBanjee")}
            icon={
              <MaterialCommunityIcons
                size={20}
                name="magnify"
                color={"black"}
              />
            }
          />
        ),
      });
      return () => {
        setPage(0);
        setData([]);
        setVisible(false);
      };
    }, [listContact])
  );

  function renderItem({ item }) {
    return (
      <BanjeeContacts
        showStatus={props?.showStatus}
        item={item}
        listContact={listContact}
      />
    );
  }

  function onRefresh() {
    setVisible(true);
    setPage(0);
    setData([]);
    setRefresh(true);
    listContact(0);
  }

  const onEndReached = () => {
    if (dataCount === pageSize) {
      listContact(page + 1);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {visible && <AppLoading visible={visible} />}

      {data?.length > 0 && (
        <VirtualizedList
          getItemCount={(data) => data?.length}
          getItem={(data, index) => data[index]}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => Math.random()}
          renderItem={renderItem}
          refreshing={refresh}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.3}
          onEndReached={onEndReached}
        />
      )}
      {zeroBanjee && data.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>{"No banjees found"}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  seperate: {
    height: 1,
    width: "82%",
    backgroundColor: "lightgrey",
    justifyContent: "flex-start",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});

export default MyBanjee;
