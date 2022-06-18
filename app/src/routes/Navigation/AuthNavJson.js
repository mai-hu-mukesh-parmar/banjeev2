import color from "../../constants/env/color";
import Otp from "../../views/Authurization/Otp";
import TermsNConditions from "../../views/Authurization/TermsNConditions";
import Login from "../../views/Authurization/Login";
import SignIn from "../../views/Authurization/SignIn";

import {
	// gradientColor,
	// headerBackground,
	headerStyle,
} from "../../constants/navigation/navigation";

export const AuthNavJson = [
	{
		options: {
			// headerTintColor: color.white,
			headerTitle: "",
			headerTransparent: true,
			headerStyle: headerStyle,
			headerLeft: () => {},
		},
		name: "SignIn",
		component: SignIn,
	},
	{
		options: {
			headerTitle: "Password",
			headerTintColor: color.white,
			headerTransparent: true,
			headerStyle: headerStyle,
		},
		name: "Login",
		component: Login,
	},

	{
		options: {
			headerTitle: "Otp",
			headerTintColor: color.white,
			headerTransparent: true,
			// headerBackground: () => headerBackground(gradientColor),
			headerStyle: headerStyle,
		},
		name: "Otp",
		component: Otp,
	},
	{
		options: {
			headerShown: false,
			headerTitle: "",
			headerTintColor: color.white,

			// headerBackground: () => headerBackground(gradientColor),
			headerStyle: headerStyle,
		},
		name: "termsAndConditions",
		component: TermsNConditions,
	},
];
