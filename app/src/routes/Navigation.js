import Splash from "../views/Splash/Splash";
import { AuthNavJson } from "./AuthNavigation/AuthNavJson";

export const NavigationJson = [
	{
		options: { headerShown: false },
		name: "Splash",
		component: Splash,
	},
	...AuthNavJson,
];
