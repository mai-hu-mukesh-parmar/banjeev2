import Splash from "../views/Splash/Splash";
import { AuthNavJson } from "./Navigation/AuthNavJson";
import BottomNavigation from "./Navigation/BottomNavigation";
import FeedNavigation from "./Navigation/FeedNavigation";

export const NavigationJson = [
	{
		options: { headerShown: false },
		name: "Splash",
		component: Splash,
	},
	...AuthNavJson,
	{
		options: { headerShown: false },
		name: "Bottom",
		component: BottomNavigation,
	},
	...FeedNavigation,
];
