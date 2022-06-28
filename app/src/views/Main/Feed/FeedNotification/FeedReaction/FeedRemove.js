import { Text } from "native-base";
import React from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import color from "../../../../../constants/env/color";

function FeedRemove({ item }) {
	const {
		markAsRead,
		contents: { remark },
	} = item;

	return (
		<TouchableWithoutFeedback onPress={() => console.warn("banned")}>
			<View
				style={[
					styles.container,
					{ backgroundColor: markAsRead ? color.white : "#dadaef" },
				]}
			>
				<Image
					source={require("../../../../../../assets/logo.png")}
					style={{ height: 40, width: 40, borderRadius: 20 }}
				/>

				<View style={{ flexDirection: "column", marginLeft: 20 }}>
					<Text>your feed has been removed due to </Text>
					<Text numberOfLines={1} style={{ fontSize: 14 }}>
						"{remark}"
					</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 10,
		width: "100%",
		height: "100%",
		borderBottomWidth: 0.5,
	},
});

export default FeedRemove;
