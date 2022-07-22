import React from "react";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/messaging";
import messaging from "@react-native-firebase/messaging";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { Alert } from "react-native";

import axios from "axios";
import { useSelector } from "react-redux";

function Firebase(props) {
	const staticUserId = "6267b432caee8667beba56f5";

	const { systemUserId } = useSelector((state) => state.registry);

	const firebaseRegistry = React.useCallback(
		async (token) => {
			try {
				const result = await axios.post(
					"https://gateway.banjee.org/services/message-broker/api/fireBaseRegistry",
					{
						fireBaseToken: token,
						id: systemUserId ? systemUserId : staticUserId,
						user: {
							age: 0,
							authorities: null,
							avtarImageUrl: null,
							avtarUrl: null,
							birthDate: null,
							domain: null,
							email: null,
							firstName: null,
							gender: null,
							id: null,
							lastName: null,
							locale: null,
							mcc: null,
							mobile: null,
							realm: null,
							ssid: null,
							systemUserId: systemUserId ? systemUserId : staticUserId,
							timeZoneId: null,
							username: null,
						},
						userId: systemUserId ? systemUserId : staticUserId,
					}
				);

				// console.warn("fbm token reg result", result);
			} catch (err) {
				console.log("firebase registry", err);
			}
		},
		[staticUserId]
	);

	const sendNotificationCall = React.useCallback((message) => {
		PushNotification.localNotification({
			title: `Notification`,
			message: `from Banjee User`,
		});
	}, []);

	const getNotification = React.useCallback(() => {
		messaging().setBackgroundMessageHandler((payload) => {
			sendNotificationCall();
			console.log("Message handled in the background!", payload);
		});
		messaging().onMessage((remoteMessage) => {
			console.warn("A new FCM message arrived!", JSON.stringify(remoteMessage));
		});
		messaging().onNotificationOpenedApp(async (remoteMessage) => {
			sendNotificationCall();
			console.log("Message handled in the background!", remoteMessage);
		});
		messaging()
			.getInitialNotification()
			.then((remoteMessage) => {
				sendNotificationCall();
				console.log("Message handled in the background!", remoteMessage);
			});
	}, [sendNotificationCall]);

	const getToken = React.useCallback(() => {
		firebase
			.messaging()
			.getToken()
			.then((token) => {
				console.log("Firebase token ------>>>", token);
				firebaseRegistry(token);
				getNotification();
			})
			.catch((error) => console.log("Fire base ", error));
	}, [firebaseRegistry, getNotification]);

	const requestUserPermission = React.useCallback(async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			getToken();
			console.log("Authorization status:", authStatus);
		}
	}, [getToken]);

	React.useEffect(() => {
		requestUserPermission();
	}, [requestUserPermission]);

	return null;
}

export default Firebase;
