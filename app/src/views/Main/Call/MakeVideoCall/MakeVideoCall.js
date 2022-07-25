import { View, ImageBackground, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import React, { useContext, useEffect } from "react";
import { Text } from "native-base";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import io from "socket.io-client";
import {
  checkGender,
  listProfileUrl,
  profileUrl,
} from "../../../../utils/util-func/constantExport";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
// import { useSelector } from "react-redux";
// import { SocketContext } from "../../../../Context/Socket";

export default function MakeVideoCall() {
  // const { systemUserId, currentUser, avtarUrl, name } = useSelector(
  //   (state) => state.registry
  // );
  const [imageError, setImageError] = React.useState();
  const { goBack } = useNavigation();
  // const socket = React.useContext(SocketContext);
  // const socket = io
  //   .connect("wss://message.banjee.org/", {
  //     upgrade: false,
  //     transports: ["websocket"],
  //     origins: "*",
  //     forceNew: true,
  //     reconnection: true,
  //     reconnectionDelay: 200,
  //     reconnectionDelayMax: 500,
  //     reconnectionAttempts: Infinity,
  //   })
  //   .connect();
  /**
	 * PARAMS
	 * 
	 *  {
		"age": 0,
		"avtarUrl": "6141991163f6a40a07c65eb9",
		"birthDate": "2009-1-9",
		"chatroomId": "61dfc79b1bad8104a73387fb",
		"connectedUserOnline": false,
		"domain": null,
		"email": "mum@mum.com",
		"firstName": "aalamotashan-a",
		"gender": "Male",
		"id": "61d6c8e251d8313090ebedd2",
		"lastName": null,
		"locale": null,
		"mcc": null,
		"mobile": "996666699",
		"name": null,
		"realm": null,
		"ssid": null,
		"systemUserId": null,
		"timeZoneId": null,
		"userId": "61dfc79b78fe68639b136d7f",
		"userLastSeen": "2022-04-11T12:25:10.485+00:00",
		"username": null,
	  }
	 * 
	 * USER
	 {
		"authorities": Array [
		  "ROLE_CUSTOMER",
		],
		"avtarImageUrl": "614195f963f6a40a07c65e99",
		"domain": "208991",
		"domainSsid": "208991",
		"email": "testuser@gmail.com",
		"externalReferenceId": "61d6b647e4bcad5687e5bad6",
		"firstName": null,
		"id": "61d6b647a1f4fd69af1052fe",
		"lastName": null,
		"locale": "eng",
		"mcc": "+91",
		"mobile": "996666697",
		"profileImageUrl": null,
		"realm": "banjee",
		"timeZoneId": "GMT",
		"type": "CUSTOMER",
		"userName": "testUser",
		"userType": 0,
	  }
	 */

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        onError={({ nativeEvent: { error } }) => setImageError(error)}
        resizeMode="cover"
        // source={
        //   imageError
        //     ? checkGender(params.gender)
        //     : { uri: listProfileUrl(params?.id) }
        // }
        blurRadius={2}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={styles.subView}>
          <View>
            <Text style={styles.name}>
              {/* {params?.userName ? params.userName : params?.firstName} Make */}
              video call
            </Text>

            <Text style={styles.subText}>Calling....</Text>
          </View>

          <AppFabButton
            style={{ borderRadius: 50, backgroundColor: "red" }}
            onPress={goBack}
            icon={
              <FastImage
                source={require("../../../../../assets/EditDrawerIcon/ic_call.png")}
                style={[styles.callImg, { transform: [{ rotate: "130deg" }] }]}
              />
            }
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  subView: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    marginBottom: 30,
  },
  name: { fontSize: 20, alignSelf: "center", color: "white" },
  subText: {
    fontSize: 16,
    alignSelf: "center",
    color: "white",
    marginTop: 10,
  },
  callBackground: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  reciveCall: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
  },
  callImg: { height: 24, width: 24 },
});
