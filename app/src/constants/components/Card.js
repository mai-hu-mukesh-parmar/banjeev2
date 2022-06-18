import React from "react";
import { View, StyleSheet } from "react-native";
import color from "../env/color";
// import {useHeaderHeight} from '@react-navigation/elements';

function Card({ style, children }) {
	//   const headerHeight = useHeaderHeight();
	const styles = StyleSheet.create({
		container: {
			backgroundColor: color.card,
			zIndex: 0,
			width: 330,
			paddingTop: 16,
			paddingHorizontal: 35,
			// alignItems: "center",
			paddingBottom: 45,
			marginTop: 65,
			//   marginTop: headerHeight,
			borderRadius: 8,
		},
		shadow: {
			shadowColor: color.shadow,
			shadowOffset: { width: 1, height: 1 },
			shadowOpacity: 0.4,
			shadowRadius: 3,
		},
	});

	return (
		<View style={[styles.container, styles.shadow, style]}>{children}</View>
	);
}

export default Card;
