// import React from "react";
// import firebase from "react-native-firebase";

// export default function Firebase() {
// 	const getToken = React.useCallback(async () => {
// 		const fcmToken = await firebase.messaging().getToken();
// 		console.warn("Firebase token ---->>", fcmToken);
// 	}, []);

// 	const requestPermission = React.useCallback(async () => {
// 		try {
// 			await firebase.messaging().requestPermission();
// 			getToken();
// 		} catch (error) {
// 			console.error("permission rejected");
// 		}
// 	}, [getToken]);

// 	const checkPermission = React.useCallback(async () => {
// 		const enabled = await firebase.messaging().hasPermission();
// 		if (enabled) {
// 			getToken();
// 		} else {
// 			requestPermission();
// 		}
// 	}, [getToken, requestPermission]);

// 	const createNotificationListeners = React.useCallback(() => {
// 		firebase.notifications().onNotification((notification) => {
// 			firebase.notifications().displayNotification(notification);
// 		});
// 	}, []);

// 	//   const removeNotificationListeners = () => {
// 	//     onUnsubscribeNotificaitonListener();
// 	//   };

// 	React.useEffect(() => {
// 		checkPermission();
// 		createNotificationListeners();
// 		// return () => {
// 		//     removeNotificationListeners();
// 		// }
// 	}, [checkPermission, createNotificationListeners]);

// 	return null;
// }
