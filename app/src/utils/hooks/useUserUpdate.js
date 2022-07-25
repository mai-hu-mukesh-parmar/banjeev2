import { PermissionsAndroid, BackHandler } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
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
  const { navigate, dispatch: navDispatch } = useNavigation();

  const getUserProfileData = React.useCallback(
    (id) => {
      getUserProfile(id, {})
        .then((res) => {
          dispatch(saveUserProfile(res));

          navDispatch(StackActions.replace(screen));
          // navigate(screen);
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
      console.log("Updating user");
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

  const manageLoc = useCallback(async () => {
    if (token) {
      const jwtToken = jwtDecode(token);
      dispatch(saveUserData({ ...jwtToken, token: token }));
      // const granted = await PermissionsAndroid.check(
      //   "android.permission.ACCESS_FINE_LOCATION"
      // );
      let result = await checkPermission("LOCATION");
      if (result === "granted") {
        let locationAsync = await Location.getCurrentPositionAsync();
        const { longitude, latitude } = locationAsync.coords;

        console.log("Permission granted");
        console.log("Registry called");
        getUserRegistryData(jwtToken.user_name)
          .then((res) => {
            if (res) {
              userHandler({
                ...res,
                currentLocation: { lat: latitude, lon: longitude },
              });
            } else {
              userHandler({
                systemUserId: jwtToken.user_name,
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
      } else {
        BackHandler.exitApp();
      }
    }
  }, [token]);

  React.useEffect(() => {
    if (token) {
      console.log("Got token");
      manageLoc();
    }
  }, [manageLoc, token]);
};
