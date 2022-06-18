import React from "react";
import color from "../../env/color";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

function AppButton({
	title,
	onPress,
	disabled,
	startIcon,
	endIcon,
	color: buttonColor,
	disabledColor,
	...rest
}) {
	const defaultBG = buttonColor
		? buttonColor
		: ["rgba(237, 69, 100, 1 )", "rgba(169, 50, 148, 1 )"];
	const opacityBG = disabledColor
		? disabledColor
		: [`rgba(237, 71, 92, 0.5 )`, `rgba(169, 50, 148, 0.5 )`];

	const styles = StyleSheet.create({
		gradient: {
			justifyContent: "space-between",
			flexDirection: "row",
			alignItems: "center",
			borderRadius: 4,
			width: "100%",
			height: 40,
		},
	});

	const handleStyle = () => {
		if (rest?.style && Array.isArray(rest?.style)) {
			let s = {};
			rest?.style?.forEach((ele) => {
				s = { ...s, ...ele };
			});
			return s;
		} else {
			return rest?.style;
		}
	};

	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={disabled ? () => {} : onPress}
			style={{ elevation: disabled ? 0 : 2 }}
			activeOpacity={0.8}
		>
			<LinearGradient
				{...rest}
				style={{ ...styles.gradient, ...handleStyle() }}
				start={{ x: 1, y: 0 }}
				end={{ x: 0, y: 0 }}
				colors={disabled ? opacityBG : defaultBG}
			>
				<View>{startIcon}</View>

				<View>
					{typeof title === "string" ? (
						<Text
							onPress={disabled ? () => {} : onPress}
							style={{ color: color.white }}
						>
							{title}
						</Text>
					) : (
						title
					)}
				</View>

				<View>{endIcon}</View>
			</LinearGradient>
		</TouchableOpacity>
	);
}

export default AppButton;
