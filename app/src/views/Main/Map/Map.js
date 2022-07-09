import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	Fragment,
} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import {
	listProfileUrl,
	profileUrl,
} from "../../../utils/util-func/constantExport";
import { Entypo } from "@expo/vector-icons";

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
		map,
	} = useSelector((state) => state, _.isEqual);

	const { userLocation: loc, searchData, banjeeUsers } = map;
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

	const listAllUser = useCallback(({ latitude, longitude }) => {
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
	}, []);

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
			listAllUser({ longitude, latitude });
		}
	}, [initialRegion, getUser, listAllUser]);

	useEffect(() => {
		setvisible(true);
		getLocation();
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
					<AppFabButton
						onPress={() => {
							// refRBSheet.current.open();
							dispatch(setMapData({ refRBSheet: true }));
						}}
						style={{ position: "absolute", top: 35, right: 5, zIndex: 999 }}
						size={20}
						icon={
							<MaterialCommunityIcons
								name="magnify"
								size={24}
								color={color.black}
							/>
						}
					/>
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
							{searchData && searchData.open && (
								<Marker ref={markerRef} coordinate={{ ...searchData.loc }}>
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
								</Marker>
							)}
							<Marker
								ref={markerRef}
								key={id}
								coordinate={{
									longitude: loc.longitude,
									latitude: loc.latitude,
									latitudeDelta: 1,
									longitudeDelta: 1,
								}}
							>
								<Image
									style={{
										width: 50,
										height: 60,
										top: 0,

										left: 0,
									}}
									source={require("../../../../assets/EditDrawerIcon/ic_me.png")}
								/>
								<Image
									style={{
										width: 40,
										height: 40,
										position: "absolute",
										top: 5,
										zIndex: 99,
										left: 5,
										borderRadius: 50,
										zIndex: 1,
									}}
									source={{
										uri: listProfileUrl(id),
									}}
								/>
							</Marker>

							{banjeeUsers.length > 0 && <RenderMarker />}
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
