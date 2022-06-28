import { View, Text, Dimensions } from "react-native";
import React from "react";

export default function Map() {
	console.warn(Dimensions.get("screen").width);
	return (
		<View>
			<Text>Map</Text>
		</View>
	);
}
