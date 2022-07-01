// import React from "react";
// import {
// 	View,
// 	Dimensions,
// 	Animated,
// 	StyleSheet,
// 	PanResponder,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import * as Location from "expo-location";
// import { LinearGradient } from "expo-linear-gradient";
// import UserCard from "./UserCard";
// import NoLoactionFound from "../MapComponents/NoLoactionFound";
// import AppLoading from "../../../../constants/components/ui-component/AppLoading";
// import BottomCard from "./BottomCard";
// import color from "../../../../constants/env/color";
// import {
// 	getProfileLoaction,
// 	removeProfileLocation,
// } from "../../../../utils/Cache/TempStorage";
// import { getAllUser } from "../../../../helper/services/WelcomeService";
// import { useSelector } from "react-redux";

// export default function SwipeAnimation(
// 	{
// 		// userLocation: { userLatitude, userLongitude },
// 	}
// ) {
// 	const { userLatitude, userLongitude } = useSelector(
// 		(state) => state.mapLocation
// 	);

// 	const [visible, setVisible] = React.useState(true);

// 	const SCREEN_HEIGHT = Dimensions.get("screen").height;
// 	// const SCREEN_HEIGHT = "101%";
// 	const SCREEN_WIDTH = Dimensions.get("screen").height / 2;

// 	const { goBack, addListener } = useNavigation();

// 	const position = new Animated.ValueXY();
// 	const [state, setState] = React.useState({
// 		currentIndex: 0,
// 	});

// 	const [data, setData] = React.useState([]);

// 	React.useEffect(() => {
// 		addListener("focus", async () => {
// 			let searchLocation = JSON.parse(await getProfileLoaction("location"));

// 			let locationAsync = await Location.getCurrentPositionAsync({});
// 			const { longitude, latitude } = locationAsync.coords;

// 			getAllUser({
// 				cards: true,
// 				distance: "50",
// 				point: {
// 					lat: userLatitude
// 						? userLatitude
// 						: searchLocation
// 						? searchLocation?.latitude
// 						: latitude,
// 					lon: userLongitude
// 						? userLongitude
// 						: searchLocation?.longitude
// 						? searchLocation?.longitude
// 						: longitude,
// 				},
// 				page: 0,
// 				pageSize: 20,
// 			})
// 				.then((res) => {
// 					setVisible(false);
// 					setData(res.content);
// 				})
// 				.catch((err) => console.log("SwipeAnimation ", err));
// 		});
// 		return async () => await removeProfileLocation("location");
// 	}, []);

// 	const rotate = position.x.interpolate({
// 		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
// 		outputRange: ["-10deg", "0deg", "10deg"],
// 		extrapolate: "clamp",
// 	});

// 	const rotateAndTranslate = {
// 		transform: [
// 			{
// 				rotate: rotate,
// 			},
// 			...position.getTranslateTransform(),
// 		],
// 	};

// 	const nextCardOpacity = position.x.interpolate({
// 		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
// 		outputRange: [1, 0, 1],
// 		extrapolate: "clamp",
// 	});

// 	const upSideDown = position.x.interpolate({
// 		inputRange: [0, 0, 150],
// 		outputRange: [1, 0, 1],
// 		extrapolate: "clamp",
// 	});
// 	const nextCardScale = position.x.interpolate({
// 		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
// 		outputRange: [1, 0.8, 1],
// 		extrapolate: "clamp",
// 	});

// 	const PanHandler = PanResponder.create({
// 		onStartShouldSetPanResponder: (evt, gestureState) => true,
// 		onPanResponderMove: (evt, gestureState) => {
// 			position.setValue({ x: gestureState.dx, y: gestureState.dy });
// 		},
// 		onPanResponderRelease: (evt, gestureState) => {
// 			if (gestureState.dx > 120) {
// 				Animated.timing(position, {
// 					toValue: { x: SCREEN_WIDTH + 300, y: gestureState.dy },
// 					useNativeDriver: true,
// 					// easing: Easing.linear,
// 				}).start(() => {
// 					() => {
// 						position.setValue({ x: 0, y: 0 });
// 					};
// 					setState({ currentIndex: state.currentIndex + 1 });
// 				});
// 			} else if (gestureState.dx < -120) {
// 				Animated.timing(position, {
// 					toValue: { x: -SCREEN_WIDTH - 300, y: gestureState.dy },
// 					useNativeDriver: true,
// 					// easing: Easing.linear,
// 				}).start(() => {
// 					if (state.currentIndex === 0) {
// 						goBack();
// 					} else {
// 						setState((prev) => ({ currentIndex: prev.currentIndex - 1 }));
// 					}

// 					() => {
// 						position.setValue({ x: 0, y: 0 });
// 					};
// 				});
// 			} else {
// 				if (gestureState.dy > 300) {
// 					Animated.timing(position, {
// 						toValue: { x: gestureState.dx, y: gestureState.dy },
// 						useNativeDriver: true,
// 						// easing: Easing.linear,
// 					}).start(() => {
// 						setState({ currentIndex: state.currentIndex + 1 });
// 						() => {
// 							position.setValue({ x: 0, y: 0 });
// 						};
// 					});
// 				} else {
// 					Animated.timing(position, {
// 						toValue: { x: 0, y: 0 },
// 						friction: 4,
// 						useNativeDriver: true,
// 					}).start();
// 				}
// 			}
// 		},
// 	});

// 	const renderUsers = () => {
// 		return (
// 			<View style={{ flex: 1, alignItems: "center" }}>
// 				{visible ? (
// 					<AppLoading visible={visible} />
// 				) : data.length > 0 ? (
// 					data
// 						.map((ele, i) => {
// 							if (data.length === i + 1) {
// 								return <NoLoactionFound />;
// 							} else {
// 								if (i < state.currentIndex) {
// 									return null;
// 								} else if (i == state.currentIndex) {
// 									return (
// 										<Animated.View
// 											{...PanHandler.panHandlers}
// 											key={ele.id}
// 											style={[
// 												rotateAndTranslate,
// 												{
// 													height: SCREEN_HEIGHT,
// 													width: SCREEN_WIDTH,
// 													padding: 10,
// 													position: "absolute",
// 												},
// 											]}
// 										>
// 											<View style={{ flex: 1 }}>
// 												<LinearGradient
// 													style={{ flex: 1 }}
// 													start={{ x: 1, y: 0 }}
// 													end={{ x: 0, y: 0 }}
// 													colors={["#ED475C", "#A93294"]}
// 												>
// 													<UserCard
// 														{...{
// 															...ele,
// 															isActive: i == state.currentIndex,
// 															setState,
// 														}}
// 													/>
// 													<Animated.View
// 														style={{
// 															transform: [
// 																{
// 																	scaleY: upSideDown,
// 																},
// 															],
// 														}}
// 													>
// 														<BottomCard
// 															{...{
// 																...ele,
// 																isActive: i == state.currentIndex,
// 																setState,
// 															}}
// 														/>
// 													</Animated.View>
// 												</LinearGradient>
// 											</View>
// 										</Animated.View>
// 									);
// 								} else {
// 									return (
// 										<Animated.View
// 											key={ele.id}
// 											style={[
// 												{
// 													opacity: nextCardOpacity,
// 													transform: [{ scale: nextCardScale }],
// 													height: SCREEN_HEIGHT,
// 													width: SCREEN_WIDTH,
// 													padding: 10,
// 													position: "absolute",
// 												},
// 											]}
// 										>
// 											<View style={{ flex: 1 }}>
// 												<LinearGradient
// 													style={{ flex: 1 }}
// 													start={{ x: 1, y: 0 }}
// 													end={{ x: 0, y: 0 }}
// 													colors={["#ED475C", "#A93294"]}
// 												>
// 													<UserCard {...{ ...ele, setState }} />
// 													<Animated.View
// 														style={{
// 															transform: [
// 																{
// 																	scaleY: upSideDown,
// 																},
// 															],
// 														}}
// 													>
// 														<BottomCard {...{ ...ele, setState }} />
// 													</Animated.View>
// 												</LinearGradient>
// 											</View>
// 										</Animated.View>
// 									);
// 								}
// 							}
// 						})
// 						.reverse()
// 				) : (
// 					data.length === 0 && <NoLoactionFound />
// 				)}
// 			</View>
// 		);
// 	};
// 	return (
// 		<View style={{ flex: 1 }}>
// 			{/* <View style={{ height: 60 }}></View> */}
// 			{renderUsers()}
// 			{/* <View style={{ height: 60 }}></View> */}
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	img: {
// 		marginTop: (Dimensions.get("window").marginTop = "7%"),
// 		height: (Dimensions.get("window").height = "70%"),
// 		width: (Dimensions.get("window").width = "85%"),
// 		flex: 1,
// 		borderRadius: 5,
// 		borderColor: color.white,
// 		borderWidth: 5,
// 		alignSelf: "center",
// 		marginBottom: "-10%",
// 	},
// });

import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Dimensions,
	Animated,
	StyleSheet,
	PanResponder,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import UserCard from "./UserCard";
import NoLoactionFound from "../MapComponents/NoLoactionFound";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import BottomCard from "./BottomCard";
import color from "../../../../constants/env/color";
import {
	getProfileLoaction,
	removeProfileLocation,
} from "../../../../utils/Cache/TempStorage";
import { getAllUser } from "../../../../helper/services/WelcomeService";
import { useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";

export default function SwipeAnimation(
	{
		// userLocation: { userLatitude, userLongitude },
	}
) {
	const { userLatitude, userLongitude } = useSelector(
		(state) => state.mapLocation
	);

	const [visible, setVisible] = React.useState(true);

	// const SCREEN_HEIGHT = "101%";
	const SCREEN_WIDTH = Dimensions.get("screen").height / 2;

	const { goBack, addListener } = useNavigation();

	const position = new Animated.ValueXY();
	const [state, setState] = React.useState({
		currentIndex: 0,
	});

	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		addListener("focus", async () => {
			let searchLocation = JSON.parse(await getProfileLoaction("location"));
			let locationAsync = await Location.getCurrentPositionAsync({});
			const { longitude, latitude } = locationAsync.coords;

			getAllUser({
				cards: true,
				distance: "50",
				point: {
					lat: userLatitude
						? userLatitude
						: searchLocation
						? searchLocation?.latitude
						: latitude,
					lon: userLongitude
						? userLongitude
						: searchLocation?.longitude
						? searchLocation?.longitude
						: longitude,
				},
				page: 0,
				pageSize: 20,
			})
				.then((res) => {
					setVisible(false);
					setData(res.content);
				})
				.catch((err) => console.log("SwipeAnimation ", err));
		});
		return async () => await removeProfileLocation("location");
	}, []);

	const c = useRef();
	const nextEle = () => {
		c.current.snapToNext(true, () => {
			console.log("hwttttt");
		});
	};
	const renderUsers = ({ item }) => {
		return (
			<React.Fragment>
				<LinearGradient
					style={styles.textGradient}
					start={{ x: 1, y: 0 }}
					end={{ x: 0, y: 0 }}
					colors={["#ED475C", "#A93294"]}
				/>

				<UserCard item={item} />
				<BottomCard next={nextEle} item={item} />
			</React.Fragment>
		);
	};
	return (
		<View style={{ flex: 1 }}>
			{/* <View style={{ height: 60 }}></View> */}
			{data.length === 0 ? (
				<NoLoactionFound />
			) : (
				<Carousel
					snapToNext={(c) => console.warn(c)}
					dotColor={color.primary}
					inactiveDotColor={"grey"}
					layout="tinder"
					// pinchGestureEnabled
					ref={c}
					data={data}
					renderItem={renderUsers}
					sliderWidth={Dimensions.get("screen").width}
					itemWidth={Dimensions.get("screen").width}
				/>
			)}

			{/* <View style={{ height: 60 }}></View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	img: {
		marginTop: (Dimensions.get("window").marginTop = "7%"),
		height: (Dimensions.get("window").height = "70%"),
		width: (Dimensions.get("window").width = "85%"),
		flex: 1,
		borderRadius: 5,
		borderColor: color.white,
		borderWidth: 5,
		alignSelf: "center",
		marginBottom: "-10%",
	},
	textGradient: {
		height: (Dimensions.get("window").height = "6%"),
		position: "absolute",
		width: (Dimensions.get("window").width = "90%"),
		alignSelf: "center",
	},
});
