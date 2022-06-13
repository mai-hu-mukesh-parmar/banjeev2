import Splash from "../Screens/Splash/Splash";
import { AuthNavJson } from "./AuthNavigation/AuthNavJson";
import { CallNavigation } from "./CallNavigation/CallNavigation";
import { HomeNavJson } from "./HomeNavigation/HomeNavJson";
import { SettingNavJson } from "./SettingNavigation/SattingNavJson";

export const NavigationJson = [
  {
    options: { headerShown: false },
    name: "Splash",
    component: Splash,
  },
  ...AuthNavJson,
  ...HomeNavJson,
  ...SettingNavJson,
  ...CallNavigation,
];
