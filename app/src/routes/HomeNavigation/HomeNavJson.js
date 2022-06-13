import color from "../../Config/color";
import ProfileCards from "../../Screens/Home/Cards/ProfileCards";
import CompleteProfile from "../../Screens/Home/CompleteProfile";
import Welcome from "../../Screens/BottomScreens/Home/Home";
import {
  gradientColor,
  headerBackground,
  headerStyle,
} from "../NavigationConstants/NavigationConstants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React from "react";
import AppFabButton from "../../Components/AppComponents/AppFabButton";
import Settings from "../../Screens/Home/DrawerModal/Settings";
import HomeNavigation from "../../Screens/BottomHomeNavigation/HomeNavigation";

export const HomeNavJson = [
  {
    options: {
      headerTitleAlign: "center",
      headerLeft: () => {},
      headerTitle: "",
      headerTintColor: color.white,
      headerTransparent: true,
      // headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: "CompleteProfile",
    component: CompleteProfile,
  },
  {
    options: {
      headerTitleAlign: "center",
      headerShown: false,
      headerTintColor: color.white,
      headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: "HomeNavigation",
    component: HomeNavigation,
  },
  {
    options: {
      headerTitleAlign: "center",
      headerShown: false,
      headerTintColor: color.white,
      headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: "Welcome",
    component: Welcome,
  },
  {
    options: {
      headerTitleAlign: "center",
      headerTitle: "Discover!!",
      headerShown: true,
      headerTintColor: color.white,
      headerBackground: () => headerBackground(gradientColor),
      headerStyle: headerStyle,
    },
    name: "ProfileCards",
    component: ProfileCards,
  },
];
