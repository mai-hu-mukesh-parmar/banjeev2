import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthNavJson } from "./AuthNavJson";

const Stack = createStackNavigator();
export default function AuthNavigationView() {
	return (
		<Stack.Navigator>
			{AuthNavJson.map((ele, index) => (
				<Stack.Screen {...ele} key={index} />
			))}
		</Stack.Navigator>
	);
}
