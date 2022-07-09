import React from "react";
import {
	View,
	StyleSheet,
	VirtualizedList,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import axios from "axios";
import { setProfileLocation } from "../../../../utils/Cache/TempStorage";
import { Text } from "native-base";

function SearchMapLocationItem({
	suggestionsList,
	locHandler,
	setSuggestionsList,
}) {
	const navigateLocation = ({ title, id }) => {
		const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=AIzaSyBqW8iaz-_qlaTMc1ynbj9f7mpfmbVUcW4`;
		axios
			.get(url)
			.then((res) => {
				let x = res.data.result.geometry.location;
				let loc = {
					longitude: x.lng,
					latitude: x.lat,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				};
				locHandler({ loc, title });
				setSuggestionsList([]);
				setProfileLocation("location", {
					longitude: x.lng,
					latitude: x.lat,
				});
			})
			.catch((err) => console.log(err));
	};
	const renderItem = ({ item }) => {
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					navigateLocation(item);
				}}
			>
				<View style={{ flexDirection: "row", marginTop: 10 }}>
					<EvilIcons
						name="location"
						color={"black"}
						size={20}
						style={{ marginTop: 5 }}
					/>

					<View style={{ marginLeft: 10 }}>
						<Text
							numberOfLines={1}
							style={{ fontWeight: "bold" }}
							onPress={() => {
								Keyboard.dismiss((e) => console.warn(e));
								navigateLocation(item);
							}}
						>
							{item.title.split(",")[0]}
						</Text>

						<Text
							numberOfLines={2}
							style={{ fontSize: 16 }}
							onPress={() => {
								navigateLocation(item);
							}}
						>
							{item.title}
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	return (
		<View style={styles.container}>
			<VirtualizedList
				getItemCount={(data) => data.length}
				getItem={(data, index) => data[index]}
				showsVerticalScrollIndicator={false}
				data={suggestionsList}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default SearchMapLocationItem;
