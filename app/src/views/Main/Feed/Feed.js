import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function Feed() {
	const state = useSelector((state) => state);
	console.log(state);
	return (
		<View>
			<Text>Feed</Text>
		</View>
	);
}
