import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	Fragment,
} from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import * as Location from "expo-location";
import { updateUser } from "../../../helper/services/SettingService";
import { getUserRegistryData } from "../../../helper/services/SplashService";
import { getAllUser } from "../../../helper/services/WelcomeService";
import AppLoading from "../../../constants/components/ui-component/AppLoading";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import color from "../../../constants/env/color";
import { Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import SearchMapLocation from "./MapComponents/SearchMapLocation";
import NoLoactionFound from "./MapComponents/NoLoactionFound";
import { useDispatch, useSelector } from "react-redux";
import { setMapData } from "../../../redux/store/action/mapAction";
import RenderMarker from "./MapComponents/RenderMarker";
import _ from "underscore";

const initialRegion = {
	latitude: 23.049712651170047,
	longitude: 72.50148585561955,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

export default function Map() {
	const mapRef = useRef(null);
	const markerRef = useRef(null);

	const dispatch = useDispatch();

	const { isFocused, navigate } = useNavigation();
	const {
		registry: { systemUserId: id },
		map: { userLocation: loc, searchData },
	} = useSelector((state) => state, _.isEqual);

	const [visible, setvisible] = useState(true);

	const userHandler = useCallback((data) => {
		updateUser(data, "PUT")
			.then((res) => {})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	const getUser = useCallback(
		(origin) => {
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
					console.warn(err);
				});
		},
		[userHandler, id]
	);

	const getLocation = useCallback(async () => {
		let locationAsync = await Location.getCurrentPositionAsync({});
		const { longitude, latitude } = locationAsync.coords;
		const { latitudeDelta, longitudeDelta } = initialRegion;
		if (longitude && latitude) {
			dispatch(
				setMapData({
					userLocation: { longitude, latitude, latitudeDelta, longitudeDelta },
				})
			);
			mapRef?.current?.animateToRegion(
				{
					...initialRegion,
					latitude,
					longitude,
				},
				1000
			);

			markerRef?.current?.animateMarkerToCoordinate(
				{
					...initialRegion,
					latitude,
					longitude,
				},
				1000
			);

			getUser({ longitude, latitude });
			getAllUser({
				distance: "100",
				point: { lat: latitude, lon: longitude },
				page: 0,
				pageSize: 20,
				blockedList: null,
				connections: null,
				pendingConnections: null,
			})
				.then((res) => {
					setvisible(false);
					dispatch(setMapData({ banjeeUsers: res.content }));
				})
				.catch((err) => {
					console.warn(err);
				});
		}
	}, [initialRegion, getUser]);

	useEffect(() => {
		if (isFocused()) {
			setvisible(true);
			getLocation();
		}
	}, [getLocation, isFocused]);

	return (
		<View
			style={{
				position: "relative",
				display: "flex",
				flex: 1,

				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{visible && <AppLoading visible={visible} />}
			{!visible && loc && (
				<Fragment>
					<SearchMapLocation />
					{loc && <NoLoactionFound />}
					<AppFabButton
						style={{
							height: 60,
							zIndex: 1,
							position: "absolute",
							right: 10,
							bottom: 10,
							width: 60,
							borderRadius: 30,
							backgroundColor: color.primary,
							alignItems: "center",
							justifyContent: "center",
						}}
						size={24}
						onPress={() => navigate("ProfileCards")}
						icon={
							<Image
								source={require("../../../../assets/EditDrawerIcon/ic_explore.png")}
								style={{ height: 24, width: 24 }}
							/>
						}
					/>
					<MapView
						// liteMode={true}
						ref={mapRef}
						showsCompass={false}
						maxZoomLevel={20}
						region={
							searchData && searchData.open ? { ...searchData.loc } : { ...loc }
						}
						userLocationPriority="passive"
						provider={PROVIDER_GOOGLE}
						style={styles.map}
					>
						<View>
							<Marker ref={markerRef} coordinate={{ ...loc }}>
								{searchData && searchData.open ? (
									<View>
										{searchData.title && (
											<View
												style={{
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
												}}
											>
												<Text style={{ backgroundColor: "white" }}>
													{searchData.title}
												</Text>
												<Entypo name="location-pin" size={24} color="red" />
											</View>
										)}
									</View>
								) : (
									<View>
										<Image
											style={{
												width: 50,
												height: 60,
											}}
											source={require("../../../../assets/EditDrawerIcon/ic_me.png")}
										/>
									</View>
								)}
							</Marker>
							<RenderMarker />
						</View>
					</MapView>
					<AppFabButton
						size={30}
						onPress={() => {
							getLocation();
						}}
						style={styles.mapIcon}
						icon={
							<Image
								style={{
									width: 40,
									height: 40,
								}}
								source={require("../../../../assets/EditDrawerIcon/ic_loc_center.png")}
							/>
						}
					/>
				</Fragment>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
	},
	mapIcon: {
		position: "absolute",
		bottom: 20,
		left: "43%",
		elevation: 0,
		shadowOffset: {
			height: 0,
			width: 0,
		},
	},
});
