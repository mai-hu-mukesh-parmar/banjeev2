import React from "react";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { SocketContext } from "../Context/Socket";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

function GetSocketNot({ children }) {
	const { systemUserId } = useSelector((state) => state.registry);
	console.warn(systemUserId);

	const socket = React.useContext(SocketContext);

	const sendNotification = (message) => {
		PushNotification.localNotification({
			title: message.sender.firstName,
			message: message.content.title,
		});
	};

	const getToken = (message) => {
		console.warn("message.sender.id", message.sender.id);
		if (systemUserId !== message.sender.id) {
			sendNotification(message);
		}
	};

	const sendNotificationCall = (message) => {
		PushNotification.localNotification({
			title: `Incoming ${message.callType} Call`,
			message: `from ${message.initiator.firstName}`,
			actions: ["Answer", "Decline"],
		});
	};

	const callDisconnectNotification = (message) => {
		PushNotification.localNotification({
			title: `Missed Call`,
			message: `from ${message.initiator.firstName}`,
		});
	};

	socket.on("CHAT_MESSAGE", (message) => {
		console.log("Recieve Notification...");
		getToken(message);
	});

	socket.on("ON_JOIN", (data) => {
		sendNotificationCall(data);
	});
	// socket.on("CANCELED", (data) => {
	// 	console.log("disconnect");
	// 	callDisconnectNotification(data);
	// });

	//   React.useEffect(() => {
	//     loginSocket();
	//   }, [loginSocket]);

	return <>{children}</>;
}

export default GetSocketNot;
