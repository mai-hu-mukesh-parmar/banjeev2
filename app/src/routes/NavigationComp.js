import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationJson } from "./Navigation";
import GetNotification from "../Socket/GetNotification";

const Stack = createStackNavigator();

export default function NavigationComp() {
	return (
		<GetNotification>
			<Stack.Navigator>
				{NavigationJson.map((ele, index) => (
					<Stack.Screen {...ele} key={index} />
				))}
			</Stack.Navigator>
		</GetNotification>
	);
}
