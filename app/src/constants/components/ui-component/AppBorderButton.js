import { Text } from "native-base";
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import color from "../../env/color";

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
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<Text onPress={onPress} style={{ color: color.primary }}>
					{title}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

export default AppBorderButton;
