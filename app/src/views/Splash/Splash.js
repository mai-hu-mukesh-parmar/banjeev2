import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { getLocalStorage } from "../../utils/Cache/TempStorage";
import { useNavigation } from "@react-navigation/native";
import BackGroundImg from "../../constants/components/BackGroundImg";
import { useUserUpdate } from "../../utils/hooks/useUserUpdate";

export default function Splash() {
	const [token, setToken] = useState(null);
	const [appIsReady, setAppIsReady] = useState(false);
	const { navigate } = useNavigation();

	useUserUpdate(token, "Bottom");

	useEffect(() => {
		async function prepare() {
			try {
				let tokenData = await getLocalStorage("token");
				if (tokenData) {
					setToken(tokenData);
					console.log("hey", tokenData);
				} else {
					navigate("SignIn");
				}
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
			onLayout={onLayoutRootView}
		>
			<BackGroundImg />
		</View>
	);
}
