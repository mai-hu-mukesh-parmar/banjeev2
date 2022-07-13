import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	Fragment,
} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import { updateUser } from "../../../helper/services/SettingService";
import { getUserRegistryData } from "../../../helper/services/SplashService";
import { getAllUser } from "../../../helper/services/WelcomeService";
import AppLoading from "../../../constants/components/ui-component/AppLoading";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import color from "../../../constants/env/color";
import { Text } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SearchMapLocation from "./MapComponents/SearchMapLocation";
import { useDispatch, useSelector } from "react-redux";
import { setMapData } from "../../../redux/store/action/mapAction";
import RenderMarker from "./MapComponents/RenderMarker";
import _ from "underscore";
import { listProfileUrl } from "../../../utils/util-func/constantExport";
import { Entypo } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

const initialRegion = {
	latitude: 23.049712651170047,
	longitude: 72.50148585561955,
	latitudeDelta: 0.0922,
	longitudeDelta: 0.0421,
};

export default function Map() {
	const isFocused = useIsFocused();
	const mapRef = useRef(null);
	const markerRef = useRef(null);

	const dispatch = useDispatch();

	const { navigate } = useNavigation();
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

	const listAllUser = useCallback(
		(point) => {
			getAllUser({
				distance: "100",
				point,
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
		},
		[searchData]
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

			getUser({ longitude, latitude });
			let point = { lat: latitude, lon: longitude };
			if (searchData.open) {
				point = {
					lat: searchData.loc.latitude,
					lon: searchData.loc.longitude,
				};
			} else {
				point = {
					lon: longitude,
					lat: latitude,
				};
			}
			listAllUser(point);
			// mapRef?.current?.animateToRegion(
			// 	{
			// 		...initialRegion,
			// 		latitude,
			// 		longitude,
			// 	},
			// 	0
			// );

			// markerRef?.current?.animateMarkerToCoordinate(
			// 	{
			// 		...initialRegion,
			// 		latitude,
			// 		longitude,
			// 	},
			// 	0
			// );
		}
	}, [initialRegion, getUser, listAllUser, searchData]);

	useEffect(() => {
		if (isFocused) {
			setvisible(true);
			getLocation();
		} else {
			setvisible(false);
		}
	}, [getLocation, isFocused]);

	return (
		<Fragment>
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
					<FastImage
						source={require("../../../../assets/EditDrawerIcon/ic_explore.png")}
						style={{ height: 24, width: 24 }}
					/>
				}
			/>
			<AppFabButton
				onPress={() => {
					dispatch(setMapData({ refRBSheet: { open: true, screen: "Maps" } }));
				}}
				style={{ position: "absolute", top: 50, right: 10, zIndex: 1 }}
				size={30}
				icon={
					<MaterialCommunityIcons
						name="magnify"
						size={24}
						color={color.black}
					/>
				}
			/>
			<MapView
				// liteMode={true}
				ref={mapRef}
				showsCompass={false}
				maxZoomLevel={20}
				// maxZoomLevel={13}
				region={
					searchData && searchData.open ? { ...searchData.loc } : { ...loc }
				}
				userLocationPriority="low"
				provider={"google"}
				onRegionChange={() => {}}
				style={styles.map}
			>
				{searchData && searchData.open ? (
					<Marker
						ref={markerRef}
						coordinate={{ ...searchData.loc }}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Text style={{ backgroundColor: "white" }}>{searchData.title}</Text>
						<Entypo name="location-pin" size={24} color="red" />
					</Marker>
				) : (
					<Marker ref={markerRef} coordinate={{ ...loc }}>
						<FastImage
							style={{
								width: 50,
								height: 60,
							}}
							source={require("../../../../assets/EditDrawerIcon/ic_me.png")}
						/>
						<FastImage
							style={{
								width: 40,
								height: 40,
								position: "absolute",
								top: 4,
								left: 5,
								borderRadius: 50,
								zIndex: 1,
							}}
							source={{
								uri: listProfileUrl(id),
							}}
						/>
					</Marker>
				)}

				<RenderMarker />
			</MapView>
			<AppFabButton
				size={30}
				onPress={() => {
					getLocation();
					dispatch(
						setMapData({
							searchData: {
								loc: {
									longitude: loc.longitude,
									latitude: loc.latitude,
									latitudeDelta: initialRegion.latitudeDelta,
									longitudeDelta: initialRegion.longitudeDelta,
								},
								open: false,
								title: "",
							},
						})
					);
				}}
				style={styles.mapIcon}
				icon={
					<FastImage
						style={{
							width: 40,
							height: 40,
						}}
						source={require("../../../../assets/EditDrawerIcon/ic_loc_center.png")}
					/>
				}
			/>
			<SearchMapLocation />
		</Fragment>
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
