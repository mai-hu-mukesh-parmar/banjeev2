import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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
// import {
// 	Autocomplete,
// 	withKeyboardAwareScrollView,
// } from "react-native-dropdown-autocomplete";

function SearchLocation(props) {
	const { setOptions, goBack, navigate } = useNavigation();
	const [loading, setLoading] = React.useState(false);
	const [suggestionsList, setSuggestionsList] = React.useState(null);

	const dispatch = useDispatch();

	React.useEffect(
		() =>
			setOptions({
				headerStyle: { height: 0 },
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
		<LinearGradient
			style={styles.container}
			start={{ x: 1, y: 0 }}
			end={{ x: 0, y: 0 }}
			colors={["#ED475C", "#A93294"]}
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

			<View style={styles.container}>
				{/* <Autocomplete
					handleSelectItem={(item, index) => console.warn(item)}
					onChangeText={handleChange}
					fetchData={
						(item) => console.warn(item, "item")
						// <Text
						// 	style={{ color: "black", padding: 15 }}
						// 	onPress={() => selectedItem(item)}
						// >
						// 	{item.title}
						// </Text>
					}
					valueExtractor={(item) => item.id}
				/> */}

				<AutocompleteDropdown
					suggestionsListMaxHeight={Dimensions.get("window").height * 0.5}
					dataSet={suggestionsList}
					textInputProps={{
						placeholder: "Enter Your Location",
						autoCorrect: false,
						autoCapitalize: "none",
						style: {
							borderRadius: 25,
							backgroundColor: "white",
							color: "black",
							borderWidth: 1,
							paddingLeft: 18,
						},
					}}
					onChangeText={handleChange}
					loading={loading}
					useFilter={false} // prevent rerender twice
					inputHeight={40}
					containerStyle={{ width: "85%" }}
					inputContainerStyle={{
						width: "100%",
						backgroundColor: "transparent",
					}}
					showChevron={false}
					rightButtonsContainerStyle={{
						color: "black",
						backgroundColor: "transparent",
					}}
					renderItem={(item, text) => (
						<Text
							style={{ color: "black", padding: 15 }}
							onPress={() => selectedItem(item)}
						>
							{item.title}
						</Text>
					)}
					suggestionsListContainerStyle={{
						color: "black",
					}}
				/>

				{/* <AppTextInput
              style={{
                marginTop: -20,
                marginBottom: 20,
                borderRadius: 20,
                height: 40,
              }}
              autoComplete={true}
              onChangeText={handleChange}
              placeholder={"Search Location"}
            /> */}
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		height: 70,
	},
});

export default SearchLocation;
