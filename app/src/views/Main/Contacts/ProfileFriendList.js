import React from "react";
import { View, StyleSheet, VirtualizedList } from "react-native";
import { service } from "../../../Services/FindUserContact/service";
import { useRoute } from "@react-navigation/native";
import AppLoading from "../../../Components/AppLoading";
import MainContext from "../../../Context/MainContext";
import BanjeeProfileFriendListItem from "./BanjeeProfileFriendListItem";

function BanjeeProfileFriendList({
  pendingConnectionsHandler,
  // pendingFriendReq,
}) {
  const {
    params: { item: user },
  } = useRoute();

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { userData } = React.useContext(MainContext);

  const { setPendingFrienReq } = React.useContext(MainContext);

  const FindUserContact = React.useCallback(
    () =>
      service({
        id: user?.id,
        page: 0,
        pageSize: 0,
      })
        .then((res) => {
          setLoading(false);
          // pendingConnectionsHandler(res.map((ele) => ele.systemUserId));

          let x = res.filter((ele) =>
            userData.pendingConnections.some((el) =>
              el.includes(ele.systemUserId)
            )
          );

          console.warn(
            "-------->",
            x.map((ele) => ele.systemUserId)
          );

          pendingConnectionsHandler(x.map((ele) => ele.systemUserId));
          setPendingFrienReq(x.map((ele) => ele.systemUserId));
          const d = res.map((ele) => {
            if (ele.systemUserId === userData.systemUserId) {
              return { ...ele, type: "YOU" };
            } else if (ele.mutual) {
              return { ...ele, type: "MUTUAL" };
            } else {
              return { ...ele, type: "UNKNOWN" };
            }
          });

          setData(d);
        })
        .catch((err) => console.warn(err)),
    [user]
  );

  React.useEffect(() => FindUserContact(), [FindUserContact]);

  function renderItem({ item }) {
    return <BanjeeProfileFriendListItem item={item} user={user} />;
  }

  return (
    <React.Fragment>
      {loading && <AppLoading visible={loading} />}
      <View style={styles.container}>
        <VirtualizedList
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
  },
});

export default BanjeeProfileFriendList;
