import React from "react";
import { View, StyleSheet, VirtualizedList } from "react-native";
import { Text } from "native-base";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// Expo Icons //
import { MaterialCommunityIcons } from "@expo/vector-icons";
// UI Components //
import AppLoading from "../../../constants/components/ui-component/AppLoading";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import { myBanjeeService } from "../../../helper/services/Service";
// Contacts Components //
import BanjeeContacts from "./BanjeeContacts";

function MyBanjee(props) {
  const [zeroBanjee, setZeroBanjee] = React.useState();
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const { systemUserId } = useSelector((data) => data.registry);

  const { setOptions, navigate } = useNavigation();

  const listUser = React.useCallback(() => {
    myBanjeeService({
      blocked: false,
      circleId: null,
      connectedUserId: null,
      fromUserId: null,
      id: null,
      page: page,
      pageSize: 15,
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
          setData((prev) => [...prev, ...x]);
        } else {
          setZeroBanjee("No banjees found");
        }
      })
      .catch((err) => console.warn(err));
  }, [page, systemUserId]);

  React.useEffect(() => {
    listUser();
    setOptions({
      headerRight: () => (
        <AppFabButton
          size={20}
          onPress={() => navigate("SearchBanjee")}
          icon={
            <MaterialCommunityIcons size={20} name="magnify" color={"black"} />
          }
        />
      ),
    });
    return () => {
      setVisible(false);
    };
  }, [listUser]);

  function renderItem({ item }) {
    return (
      <BanjeeContacts
        showStatus={props?.showStatus}
        item={item}
        listUser={listUser}
      />
    );
  }

  function onRefresh() {
    return setRefresh(true), listUser();
  }

  return (
    <>
      {visible && <AppLoading visible={visible} />}

      <View style={styles.container}>
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
            onEndReached={() => setPage((prev) => prev + 1)}
          />
        )}
        {zeroBanjee && data.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>{zeroBanjee}</Text>
          </View>
        )}
      </View>
    </>
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
