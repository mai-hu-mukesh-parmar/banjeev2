import { PermissionsAndroid, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import jwtDecode from "jwt-decode";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
	getUserProfile,
	saveUserData,
	saveUserProfile,
	saveUserRegistry,
} from "../../redux/store/action/useActions";

export const useUserUpdate = (token, screen) => {
	const dispatch = useDispatch();
	const { navigate } = useNavigation();

	const getUserProfileData = React.useCallback(
		(id) => {
			getUserProfile(id, {})
				.then((res) => {
					console.log("get profile data", JSON.stringify(res));
					dispatch(saveUserProfile(res));

					navigate(screen);
				})
				.catch((err) => {
					console.warn("use context 1", err);
				});
		},
		[screen]
	);

	const getLocation = React.useCallback((userRes) => {
		const {
			origin: { coordinates },
		} = userRes;
		mapService(coordinates).then((res) => {
			dispatch(
				saveUserRegistry({
					...userRes,
					address: res.data.results[0],
				})
			);
		});
	}, []);

	const userHandler = React.useCallback(
		(data) => {
			updateUser(data, "PUT")
				.then((res) => {
					console.log("update user", JSON.stringify(res));
					dispatch(saveUserRegistry(res));
					getUserProfileData(res.systemUserId);

					getLocation(res);
				})
				.catch((err) => {
					console.warn("use context 2 ", err);
				});
		},
		[getUserProfileData, getLocation]
	);

	const getUser = React.useCallback(
		(origin, id) => {
			const { longitude, latitude } = origin;
			getUserRegistryData(id)
				.then((res) => {
					console.log("get user", JSON.stringify(res));
					if (res) {
						userHandler({
							...res,
							currentLocation: { lat: latitude, lon: longitude },
						});
					} else {
						userHandler({
							systemUserId: id,
							connections: [],
							pendingConnections: [],
							blockedList: [],
							currentLocation: { lat: latitude, lon: longitude },
						});
					}
				})
				.catch((err) => {
					console.warn("Get user ----> ", err);
				});
		},
		[userHandler]
	);

	const manageLoc = useCallback(async () => {
		if (token) {
			const jwtToken = jwtDecode(token);
			dispatch(saveUserData({ ...jwtToken, token: token }));
			const granted = await PermissionsAndroid.check(
				"android.permission.ACCESS_FINE_LOCATION"
			);
			console.warn(granted);

			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the camera");
				let locationAsync = await Location.getCurrentPositionAsync({});
				const { longitude, latitude } = locationAsync.coords;

				getUser({ longitude, latitude }, jwtToken.user_name);
			} else {
				await PermissionsAndroid.request(
					"android.permission.ACCESS_FINE_LOCATION"
				)
					.then((res) => {
						console.warn("response", res);
						if (res === "denied") {
							console.warn("condition", res);
							BackHandler.exitApp();
						}
					})

					.catch((err) => console.warn(err));
			}
		}
	}, [getUser, token]);

	React.useEffect(() => {
		console.log("hey");
		manageLoc();
	}, [manageLoc]);
};
