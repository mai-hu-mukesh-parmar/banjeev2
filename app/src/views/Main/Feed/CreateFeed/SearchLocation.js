import React, { Fragment } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Text } from "native-base";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { createFeedData } from "../../../../redux/store/action/createFeedAction";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import color from "../../../../constants/env/color";
import { useNavigation } from "@react-navigation/native";

function SearchLocation(props) {
	const { setOptions, goBack, navigate } = useNavigation();
	const [loading, setLoading] = React.useState(false);
	const [suggestionsList, setSuggestionsList] = React.useState(null);

	const dispatch = useDispatch();

	React.useEffect(
		() =>
			setOptions({
				headerShown: false,
				// headerStyle: { height: 0 },
				headerLeft: () => {},
			}),
		[]
	);

	const handleChange = (e) => {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBqW8iaz-_qlaTMc1ynbj9f7mpfmbVUcW4&input=${e}&language=en`;
		axios
			.get(url)
			.then((res) => {
				let x = res.data.predictions.map((ele) => ({
					id: ele.place_id,
					title: ele.description,
				}));
				// console.log("--------------", x);
				setSuggestionsList(x);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const selectedItem = (item) => {
		const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.id}&key=AIzaSyBqW8iaz-_qlaTMc1ynbj9f7mpfmbVUcW4`;

		axios
			.get(url)
			.then((res) => {
				dispatch(createFeedData({ locData: res.data.result }));
				navigate("CreateFeed", { locData: res.data.result });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<SafeAreaView>
			<LinearGradient
				style={styles.container}
				start={{ x: 1, y: 0 }}
				end={{ x: 0, y: 0 }}
				colors={["#ED475C", "#A93294"]}
			/>
			<View
				style={{
					position: "absolute",
					justifyContent: "center",
					marginTop: 60,
					flex: 1,
					alignSelf: "center",

					flexDirection: "row",
				}}
			>
				<AppFabButton
					onPress={() => goBack()}
					size={24}
					icon={
						<MaterialCommunityIcons
							size={24}
							name="arrow-left"
							color={color.white}
						/>
					}
				/>
				{/* <AppTextInput autoComplete={true} onChangeText={handleChange} /> */}

				<Fragment>
					<AutocompleteDropdown
						// suggestionsListMaxHeight={Dimensions.get("screen").height * 0.5}
						containerStyle={{
							// display: "flex",

							width: Dimensions.get("screen").width - 70,
							alignItems: "flex-start",
							backgroundColor: "transparent",
						}}
						suggestionsListContainerStyle={{
							position: "absolute",
							bottom: -Dimensions.get("screen").height * 0.3,
							zIndex: 99,
						}}
						dataSet={suggestionsList}
						textInputProps={{
							placeholder: "Enter Your Location",
							autoCorrect: false,
							autoCapitalize: "none",
							style: {
								borderRadius: 25,
								color: "black",
								paddingLeft: 18,
							},
						}}
						rightButtonsContainerStyle={{
							color: "black",
							backgroundColor: "transparent",
						}}
						onChangeText={handleChange}
						loading={loading}
						useFilter={false} // prevent rerender twice
						inputHeight={40}
						showChevron={false}
						renderItem={(item, text) => (
							<View style={{}}>
								<Text
									style={{ color: "black", padding: 15 }}
									onPress={() => selectedItem(item)}
								>
									{item.title}
								</Text>
							</View>
						)}
					/>
				</Fragment>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: 70,

		zIndex: 0,
	},
});

export default SearchLocation;
