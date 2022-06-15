import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { getLocalStorage } from "../../utils/Cache/TempStorage";
import { useNavigation } from "@react-navigation/native";
import BackGroundImg from "../../constants/components/BackGroundImg";

export default function Splash() {
	const [appIsReady, setAppIsReady] = useState(false);
	const { navigate } = useNavigation();
	useEffect(() => {
		async function prepare() {
			try {
				let token = await getLocalStorage("token");
				if (token) {
					console.log("token", token);
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
