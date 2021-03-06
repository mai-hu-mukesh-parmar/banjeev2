import { View, ImageBackground, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import React, { useContext, useEffect } from "react";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Text } from "native-base";
import io from "socket.io-client";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
// import { AuthSocket } from "../../../../Socket/Socket";
import InCallManager from "react-native-incall-manager";
// import { useSelector } from "react-redux";
// import { SocketContext } from "../../../../Context/Socket";
// import { connectSocket } from "../../../../hooks/connectSocket";

export default function AcceptCall() {
  // const { systemUserId, currentUser, avtarUrl } = useSelector(
  //   (state) => state.registry
  // );

  const { params } = useRoute();
  const { pop } = StackActions;
  // const socket = React.useContext(SocketContext);
  const { navigate, goBack, canGoBack, dispatch } = useNavigation();
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

  // console.log("Accept call ----------->", params);

  /**
	 * {
		"addToCall": false,
		"answer": null,
		"callDuration": "00",
		"callType": "Video",
		"eventType": "JOIN",
		"fromUserId": "619cd4fc3fb9cb741a6d7d8f",
		"groupCreatorId": null,
		"groupMemberCounts": 0,
		"groupName": null,
		"iceCandidate": null,
		"initiator": Object {
			"authorities": Array [
			"ROLE_CUSTOMER",
			],
			"avtarImageUrl": "6253dc1f4d2f4a7e3ae902d2",
			"domain": "208991",
			"domainSsid": "208991",
			"email": "vicky@gmail.com",
			"externalReferenceId": "619cd4fc6a2ea70e3f4335a2",
			"firstName": "vicky",
			"id": "619cd4fc3fb9cb741a6d7d8f",
			"lastName": null,
			"locale": "eng",
			"mcc": "+267",
			"mobile": "323232",
			"profileImageUrl": null,
			"realm": "banjee",
			"timeZoneId": "GMT",
			"type": "CUSTOMER",
			"userName": "vicky",
			"userType": 0,
		},
		"mediaStream": null,
		"offer": null,
		"responseMessage": "Room Joined",
		"roomId": "61dfc7361bad8104a73387ed",
		"targetUser": Object {
			"authorities": null,
			"avtarImageUrl": null,
			"domain": null,
			"domainSsid": null,
			"email": null,
			"externalReferenceId": null,
			"firstName": "testUser",
			"id": "61d6b647a1f4fd69af1052fe",
			"lastName": null,
			"locale": null,
			"mcc": null,
			"mobile": null,
			"profileImageUrl": null,
			"realm": null,
			"timeZoneId": null,
			"type": null,
			"userName": null,
			"userType": 0,
		},
		"toAvatarSrc": null,
		"toUserId": "61d6b647a1f4fd69af1052fe",
		}
	 */

  const joinCall = () => {
    // socket.on("connect", () => {
    // 	socket.on("AUTH", async (sessionId) => {
    // 		const token = await getLocalStorage("token");
    // 		socket.emit("LOGIN", { token: token, sessionId });
    console.warn("AcceptCall.js join call fun call");
    if (params) {
      console.log("params", params);
      if (params.callType === "Video") {
        console.info("Video call navigate", params.callType);
        navigate("VideoCall", {
          roomId: params.roomId,
          fromUserId: params.initiator.id,
          initiator: params.initiator,
          targetUser: params.targetUser,
          toUserId: params.targetUser.id,
        });
      } else {
        navigate("VoiceCall", {
          roomId: params.roomId,
          fromUserId: params.initiator.id,
          initiator: params.initiator,
          targetUser: params.targetUser,
          toUserId: params.targetUser.id,
        });
      }
    }
    // 	});
    // });
  };

  return (
    // <AuthSocket>
    <ImageBackground
      resizeMode="cover"
      source={{ uri: profileUrl(params?.targetUser?.avtarImageUrl) }}
      blurRadius={2}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.subView}>
        <View>
          <Text style={styles.name}>
            {params?.targetUser?.userName
              ? params?.targetUser?.userName
              : params?.targetUser?.firstName}{" "}
            Accept call
          </Text>

          <Text style={styles.subText}>Calling....</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <AppFabButton
            style={{
              borderRadius: 50,
              backgroundColor: "green",
              marginRight: 20,
            }}
            onPress={joinCall}
            icon={
              <FastImage
                source={require("../../../../../assets/EditDrawerIcon/ic_call.png")}
                style={[styles.callImg, { transform: [{ rotate: "10deg" }] }]}
              />
            }
          />

          <AppFabButton
            style={{
              borderRadius: 50,
              marginLeft: 20,
              backgroundColor: "red",
            }}
            // onPress={async () => {
            //   socket.emit("SIGNALLING_SERVER", {
            //     roomId: params.roomId,
            //     fromUserId: systemUserId,
            //     initiator: {
            //       ...currentUser,
            //       avtarImageUrl: avtarUrl,
            //       firstName: currentUser.userName,
            //     },
            //     targetUser: params.targetUser,
            //     toUserId: params.targetUser.id,
            //     eventType: "DISCONNECT",
            //     iceCandidate: null,
            //     offer: null,
            //     answer: null,
            //     mediaStream: null,
            //     responseMessage: "Room Joined",
            //     callDuration: 0,
            //     callType: "Voice",
            //     groupName: null,
            //     toAvatarSrc: null,
            //     groupMemberCounts: 0,
            //     groupCreatorId: null,
            //     addToCall: false,
            //   });
            //   // await connectSocket(socket);
            //   InCallManager.stopRingtone();
            //   goBack();
            // }}
            icon={
              <FastImage
                source={require("../../../../../assets/EditDrawerIcon/ic_call.png")}
                style={[styles.callImg, { transform: [{ rotate: "130deg" }] }]}
              />
            }
          />
        </View>
      </View>
    </ImageBackground>
    // </AuthSocket>
  );
}

const styles = StyleSheet.create({
  subView: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  name: { fontSize: 30, alignSelf: "center", color: "white" },
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
