import { PermissionsAndroid, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import jwtDecode from "jwt-decode";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
	saveUserData,
	saveUserProfile,
	saveUserRegistry,
} from "../../redux/store/action/useActions";
import { getUserRegistryData } from "../../helper/services/SplashService";
import {
	getUserProfile,
	mapService,
	updateUser,
} from "../../helper/services/SettingService";
import usePermission from "./usePermission";

export const useUserUpdate = (token, screen) => {
	const { checkPermission } = usePermission();
	const dispatch = useDispatch();
	const { navigate } = useNavigation();

	const getUserProfileData = React.useCallback(
		(id) => {
			getUserProfile(id, {})
				.then((res) => {
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
					location: coordinates,
					address: res.data.results[0],
				})
			);
		});
	}, []);

	const userHandler = React.useCallback(
		(data) => {
			updateUser(data, "PUT")
				.then((res) => {
					dispatch(saveUserRegistry(res));
					getUserProfileData(res.currentUser.externalReferenceId);

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

	const handleApi = useCallback(
		async (jwtToken) => {
			let locationAsync = await Location.getCurrentPositionAsync({});
			const { longitude, latitude } = locationAsync.coords;
			getUser({ longitude, latitude }, jwtToken.user_name);
		},
		[getUser]
	);

	const manageLoc = useCallback(async () => {
		if (token) {
			const jwtToken = jwtDecode(token);
			dispatch(saveUserData({ ...jwtToken, token: token }));
			// const granted = await PermissionsAndroid.check(
			//   "android.permission.ACCESS_FINE_LOCATION"
			// );
			let result = await checkPermission("LOCATION");
			console.log("result", result);
			if (result === "granted") {
				await handleApi(jwtToken);
			} else {
				BackHandler.exitApp();
			}
		}
	}, [handleApi, token]);

	React.useEffect(() => {
		manageLoc();
	}, [manageLoc]);
};
