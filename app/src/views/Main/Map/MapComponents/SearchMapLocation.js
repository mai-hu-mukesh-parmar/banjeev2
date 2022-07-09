import React, {
	Fragment,
	useRef,
	useCallback,
	useState,
	useEffect,
} from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
	Dimensions,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import { Text } from "native-base";
import color from "../../../../constants/env/color";
import AppInput from "../../../../constants/components/ui-component/AppInput";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import { useDispatch, useSelector } from "react-redux";
import { setMapData } from "../../../../redux/store/action/mapAction";
import SearchMapLocationItem from "./SearchMapLocationItem";

function SearchMapLocation() {
	const dispatch = useDispatch();
	const {
		userLocation,
		searchData,
		refRBSheet: sheet,
	} = useSelector((state) => state.map);

	const refRBSheet = useRef(null);

	const [suggestionsList, setSuggestionsList] = useState([]);

	const handleChange = (e) => {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBqW8iaz-_qlaTMc1ynbj9f7mpfmbVUcW4&input=${e}&language=en`;
		axios
			.get(url)
			.then((res) => {
				let x = res.data.predictions.map((ele) => ({
					id: ele.place_id,
					title: ele.description,
				}));
				setSuggestionsList(x);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getCurrentLocation = async () => {
		let locationAsync = await Location.getCurrentPositionAsync({});
		dispatch(
			setMapData({ searchData: { ...userLocation, ...locationAsync.coords } })
		);
		refRBSheet.current.close();
	};

	const getMySearchLocation = useCallback((data) => {
		dispatch(
			setMapData({
				searchData: { ...searchData, ...data },
			})
		);
		refRBSheet.current.close();
	}, []);

	const locHandler = useCallback((data) => {
		getMySearchLocation({ ...data, open: true });
	}, []);

	useEffect(() => {
		if (sheet && refRBSheet.current) {
			refRBSheet.current.open();
		}
	}, [sheet]);

	return (
		<Fragment>
			<RBSheet
				customStyles={{
					container: { borderRadius: 10 },
				}}
				height={500}
				width={"100%"}
				onClose={() => {
					dispatch(setMapData({ refRBSheet: false }));
				}}
				ref={refRBSheet}
				dragFromTopOnly={true}
				closeOnDragDown={true}
				closeOnPressMask={true}
				// keyboardAvoidingViewEnabled={true}
			>
				<View style={styles.container}>
					<Text style={{ fontSize: 18 }}>Select Location</Text>

					<View>
						{/* SEARCH ICON */}

						<MaterialCommunityIcons
							style={styles.icon}
							name={"magnify"}
							size={25}
							color={color.black}
						/>

						<View
							style={{ position: "absolute", marginTop: 10, width: "100%" }}
						>
							{/* TEXT INPUT */}

							<AppInput
								style={{ paddingLeft: 40, width: "100%" }}
								placeholder={"Search Location"}
								onChangeText={handleChange}
							/>

							<TouchableWithoutFeedback onPress={getCurrentLocation}>
								<View style={styles.grp}>
									<Image
										style={styles.img}
										source={require("../../../../../assets/EditDrawerIcon/ic_loc_center.png")}
									/>
									<Text
										onPress={getCurrentLocation}
										style={{ color: color.primary }}
									>
										Use your current location
									</Text>
								</View>
							</TouchableWithoutFeedback>
							{suggestionsList.length > 0 && (
								<SearchMapLocationItem
									suggestionsList={suggestionsList}
									locHandler={locHandler}
									setSuggestionsList={setSuggestionsList}
								/>
							)}
						</View>
					</View>
				</View>
			</RBSheet>
		</Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		zIndex: 9,
		width: Dimensions.get("window").width,
		alignSelf: "center",
	},
	icon: {
		//    transform: [{ rotate: "90deg" }],
		position: "absolute",
		top: 17,
		zIndex: 1,
		left: 10,
	},
	img: {
		tintColor: color.primary,
		width: 20,
		height: 20,
		marginRight: 10,
	},
	grp: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
	},
});

export default SearchMapLocation;
