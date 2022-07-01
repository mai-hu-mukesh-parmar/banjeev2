import React, { useCallback } from "react";
import MapView, { PROVIDER_IOS, Marker } from "react-native-maps";
import { View, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { updateUser } from "../../../helper/services/SettingService";
import { getUserRegistryData } from "../../../helper/services/SplashService";
import { getAllUser } from "../../../helper/services/WelcomeService";
import AppLoading from "../../../constants/components/ui-component/AppLoading";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import color from "../../../constants/env/color";
import { Text } from "native-base";
import { profileUrl } from "../../../utils/util-func/constantExport";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../../redux/store/action/MapAndProfileCardAction/mapAction";
import { saveUserRegistry } from "../../../redux/store/action/useActions";
import {
	getLocalStorage,
	getProfileLoaction,
} from "../../../utils/Cache/TempStorage";
import { useNavigation } from "@react-navigation/native";
import { useUserUpdate } from "../../../utils/hooks/useUserUpdate";
import SearchMapLocation from "./MapComponents/SearchMapLocation";
import NoLoactionFound from "./MapComponents/NoLoactionFound";

// const initialRegion = {
// 	latitude: 23.049712651170047,
// 	longitude: 72.50148585561955,
// 	latitudeDelta: 0.0922,
// 	longitudeDelta: 0.0421,
// };

export default function Map() {
	const [token, setToken] = React.useState();
	useUserUpdate(token, "Map");
	const getToken = useCallback(async () => {
		await getLocalStorage("token")
			.then((res) => {
				setvisible(false);
				setToken(res);
			})
			.catch((err) => console.warn(err));
	}, []);

	const initialRegion = useSelector((state) => state.mapLocation);
	const dispatch = useDispatch();
	const mapRef = React.useRef(null);

	// const { setUserLocation, setUserData, user, userData } =
	// 	React.useContext(MainContext);

	const user = useSelector((state) => state.user);
	const userData = useSelector((state) => state.registry);

	const [banjeeUsers, setBanjeeUsers] = React.useState([]);
	const [visible, setvisible] = React.useState(true);
	const [loc, setLoc] = React.useState(initialRegion);
	const [searchData, setSearchData] = React.useState(null);
	const markerRef = React.useRef(null);

	const setLocHandler = React.useCallback((data) => {
		setLoc(data);
	});
	const userLoc = getProfileLoaction("location");
	const userHandler = React.useCallback((data) => {
		updateUser(data, "PUT")
			.then((res) => {
				listAllUser();
				// setUserData(res);
				dispatch(saveUserRegistry({ res }));
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);
	const getUser = React.useCallback((origin) => {
		const { longitude, latitude } = origin;
		getUserRegistryData(user.id)
			.then((res) => {
				if (res) {
					dispatch(saveuser);
					userHandler({
						...res,
						currentLocation: { lat: latitude, lon: longitude },
					});
				} else {
					userHandler({
						systemUserId: user.id,
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
	}, []);

	const getLocation = React.useCallback(async () => {
		let locationAsync = await Location.getCurrentPositionAsync({});
		const { longitude, latitude } = locationAsync.coords;
		const { latitudeDelta, longitudeDelta } = initialRegion;

		if (longitude && latitude && latitudeDelta && longitudeDelta) {
			mapRef?.current?.animateToRegion(
				{
					longitude,
					latitude,
					latitudeDelta,
					longitudeDelta,
				},
				1000
			);

			useDispatch(
				setUserLocation({ longitude, latitude, latitudeDelta, longitudeDelta })
			);

			getUser({ longitude, latitude });
			setSearchData(null);
		}
	}, [getUser]);
	const { isFocused, navigate } = useNavigation();

	React.useEffect(() => {
		if (isFocused()) {
			// getLocation();
			getToken();
		}
		return () => {
			setBanjeeUsers([]);
		};
	}, [isFocused, getToken]);

	const listAllUser = React.useCallback(() => {
		getAllUser({
			distance: "100",
			point: { lat: loc.latitude, lon: loc.longitude },
			page: 0,
			pageSize: 20,
			blockedList: null,
			connections: null,
			pendingConnections: null,
		})
			.then((res) => {
				setvisible(false);
				setBanjeeUsers(res.content);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	const getMySearchLocation = React.useCallback((data, refRBSheet) => {
		console.log(data);
		mapRef.current.animateToRegion(data.loc, 1000);
		markerRef.current.animateMarkerToCoordinate(data.loc, 1000);
		refRBSheet.close();
		setTimeout(() => {
			setSearchData(data);
		}, 100);
	}, []);

	console.log("------------>", searchData);

	return (
		<React.Fragment>
			{visible && <AppLoading visible={visible} />}
			{!visible && (
				<React.Fragment>
					<SearchMapLocation locFun={getMySearchLocation} />
					{userLoc && <NoLoactionFound locFun={getMySearchLocation} />}
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
						// maxZoomLevel={13}
						region={
							searchData && searchData.open ? { ...searchData.loc } : { ...loc }
						}
						userLocationPriority="low"
						provider={PROVIDER_IOS}
						style={styles.map}
					>
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
						{banjeeUsers &&
							banjeeUsers.length > 0 &&
							banjeeUsers.map((user, i) => {
								const {
									id,
									age,
									online,
									avtarUrl,
									existsInContact,
									name,
									gender,
									systemUserId,
									email,
									userObject: { mobile },
									currentLocation: { lon: longitude, lat: latitude },
								} = user;
								return (
									<React.Fragment key={i}>
										<View
											style={{
												display: "flex",
												position: "relative",
												justifyContent: "center",
												alignItems: "center",
												zIndex: 99999,
											}}
										>
											{!existsInContact ? (
												<Marker
													onPress={() => {
														dispatch(
															setUserLocation({
																userLatitude: latitude,
																userLongitude: longitude,
															})
														);
														navigate(
															"ProfileCards"
															// , {
															// 	userLocation: {
															// 		userLatitude: latitude,
															// 		userLongitude: longitude,
															// 	},
															// }
														);
													}}
													key={id}
													coordinate={{
														longitude,
														latitude,
														latitudeDelta: 1,
														longitudeDelta: 1,
													}}
												>
													<Image
														style={{
															width: 50,
															height: 80,
															top: 0,
															left: 0,
															zIndex: 99999,
														}}
														source={require("../../../../assets/EditDrawerIcon/ic_map_blue.png")}
													/>
													<Image
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
															uri: profileUrl(avtarUrl),
														}}
													/>
												</Marker>
											) : userData.systemUserId === systemUserId ? null : (
												<Marker
													onPress={() =>
														navigate("BanjeeProfile", {
															item: {
																age: age,
																avtarUrl: avtarUrl,
																birthDate: "",
																chatroomId: "",
																connectedUserOnline: online,
																domain: null,
																email: email,
																firstName: name,
																gender: gender,
																id: systemUserId,
																lastName: null,
																locale: null,
																mcc: null,
																mobile: mobile,
																name: null,
																realm: null,
																ssid: null,
																systemUserId: systemUserId,
																timeZoneId: null,
																userId: id,
																// userId: "6257f7879e27bd1e9593dda5", jigabhai ka userId hey
																userLastSeen: null,
																username: null,
															},
														})
													}
													key={id}
													coordinate={{
														longitude,
														latitude,
														latitudeDelta: 1,
														longitudeDelta: 1,
													}}
												>
													<Image
														style={{
															width: 50,
															height: 80,
															top: 0,
															left: 0,
															zIndex: 99999,
														}}
														source={require("../../../../assets/EditDrawerIcon/ic_map_yellow.png")}
													/>
													<Image
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
															uri: profileUrl(avtarUrl),
														}}
													/>
												</Marker>
											)}
										</View>
										{/* <Marker
                    key={id}
                    coordinate={{
                      longitude,
                      latitude,
                      latitudeDelta: 1,
                      longitudeDelta: 1,
                    }}
                  >
                    <UserMarker
                      avatarId={avtarUrl}
                      existsInContact={existsInContact}
                    />
                  </Marker> */}
									</React.Fragment>
								);
							})}
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
				</React.Fragment>
			)}
		</React.Fragment>
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
