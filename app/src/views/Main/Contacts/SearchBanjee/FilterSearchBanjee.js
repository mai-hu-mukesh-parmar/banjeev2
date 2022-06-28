import React from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  VirtualizedList,
} from "react-native";
import AppFabButton from "../../../../Components/AppComponents/AppFabButton";
import AppText from "../../../../Components/AppComponents/AppText";
import color from "../../../../Config/color";
import {
  checkGender,
  listProfileUrl,
  profileUrl,
} from "../../../../Services/constantExport";
import { useNavigation } from "@react-navigation/native";
import checkUserStatus from "../ChatComponent/checkUserStatus";
import { SocketContext } from "../../../../Context/Socket";
import { AuthSocket } from "../../../../Socket/Socket";
import AppLoading from "../../../../Components/AppLoading";
import BanjeeContacts from "../BanjeeContacts";

function FiltersearchBanjee(props) {
  function renderItem({ item }) {
    return (
      <BanjeeContacts
        // showStatus={props?.showStatus}
        item={item}
        // listUser={listUser}
      />
    );
  }

  return (
    <AuthSocket>
      {/* {visible && <AppLoading visible={visible} />} */}

      <View style={styles.container}>
        <VirtualizedList
          getItemCount={(data) => data.length}
          getItem={(data, index) => data[index]}
          showsVerticalScrollIndicator={false}
          data={props.item}
          keyExtractor={(item) => Math.random()}
          renderItem={renderItem}
        />
      </View>
    </AuthSocket>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    zIndex: -2,
    // marginBottom: -150,
  },
  img: {
    // borderColor: color.primary,
    borderWidth: 1,
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  icons: {
    position: "absolute",
    right: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  status: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: color.activeGreen,
    position: "absolute",
    bottom: 0,
    left: "10%",
    zIndex: 1,
  },
  imgView: {
    position: "relative",
    elevation: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 16,
    shadowColor: color.black,
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 99,
  },
  border: {
    height: 1,
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "100%",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  txtView: {
    flexDirection: "column",
    width: "49%",
  },
});

export default FiltersearchBanjee;
