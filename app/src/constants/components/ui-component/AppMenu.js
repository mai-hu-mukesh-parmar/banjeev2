import React from "react";
import { Menu, Box, Pressable, Text } from "native-base";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { View } from "react-native";

export default function AppMenu({ menuContent, menuColor }) {
	return (
		<Box h="80%" w="90%" alignItems="flex-start">
			<Menu
				shouldOverlapWithTrigger={true}
				placement="bottom right"
				shadow={2}
				w="190"
				trigger={(triggerProps) => {
					return (
						<Pressable accessibilityLabel="More options menu" {...triggerProps}>
							<MaterialCommunityIcons
								style={{
									marginRight: 10,
									paddingHorizontal: 5,
								}}
								name="dots-vertical"
								size={20}
								color={menuColor}
							/>
						</Pressable>
					);
				}}
			>
				{menuContent?.map((ele, i) => (
					<Menu.Item onPress={ele.onPress} key={i}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<MaterialCommunityIcons name={ele.icon} size={16} />
							<Text style={{ marginLeft: 10 }}>{ele.label} </Text>
						</View>
					</Menu.Item>
				))}
			</Menu>
		</Box>
	);
}
