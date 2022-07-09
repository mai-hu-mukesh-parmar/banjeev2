import React, { useRef } from "react";
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
	const {
		searchData: { latitude: userLatitude, longitude: userLongitude },
	} = useSelector((state) => state.map);

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
					console.warn(res.content, "response of location");
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
