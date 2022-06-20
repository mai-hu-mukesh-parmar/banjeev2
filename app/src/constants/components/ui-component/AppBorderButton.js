import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import color from "../../Config/color";
import AppText from "./AppText";

function AppBorderButton({ onPress, width, title }) {
	const styles = StyleSheet.create({
		container: {
			height: 40,
			width: width,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 6,
			borderColor: color.primary,
			borderWidth: 1,
			backgroundColor: "white",
		},
	});

	return (
		<TouchableWithoutFeedback onPress={() => onPress()}>
			<View style={styles.container}>
				<AppText onPress={() => onPress()} style={{ color: color.primary }}>
					{title}
				</AppText>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default AppBorderButton;
