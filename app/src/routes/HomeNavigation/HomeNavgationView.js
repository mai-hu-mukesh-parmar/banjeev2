import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Linking, Platform } from "react-native";
import { HomeNavJson } from "./HomeNavJson";

const Stack = createStackNavigator();
export default function HomeNavgationView() {
  return (
    <Stack.Navigator>
      {HomeNavJson.map((ele, index) => (
        <Stack.Screen {...ele} key={index} />
      ))}
    </Stack.Navigator>
  );
}
