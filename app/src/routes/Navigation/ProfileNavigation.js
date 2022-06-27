import color from "../../constants/env/color";
import {
	gradientColor,
	greyColor,
	headerBackground,
	headerStyle,
} from "../../constants/navigation/navigation";
import UpdateUserInfo from "../../views/Main/Profile/UpdateInfo/UpdateUserInfo";
import PickAvatar from "../../views/Main/Profile/UpdateProfile/PickAvatar";
import UpdateAvatar from "../../views/Main/Profile/UpdateProfile/UpdateAvatar";
import UpdateVoice from "../../views/Main/Profile/UpdateVoice/UpdateVoice";
import Faq from "../../views/Webview/Faq";

const ProfileNavigation = [
	{
		name: "UpdateAvatar",
		component: UpdateAvatar,
		options: {
			headerTitleAlign: "center",
			headerTitle: "Create your Avatar",
			headerTintColor: color.white,
			headerBackground: () => headerBackground(gradientColor),
			headerStyle: headerStyle,
		},
	},
	{
		name: "PickAvatar",
		component: PickAvatar,
		options: {
			headerTitleAlign: "center",
			headerTitle: "Select Avatar",
			headerTintColor: color.white,
			headerStyle: headerStyle,
			headerBackground: () => headerBackground(gradientColor),
		},
	},
	{
		name: "UpdateVoice",
		component: UpdateVoice,
		options: {
			headerTitleAlign: "center",
			headerTitle: "Voice Recording",
			headerTintColor: color.white,
			headerStyle: headerStyle,
			headerBackground: () => headerBackground(greyColor),
		},
	},

	{
		name: "UpdateDetail",
		component: UpdateUserInfo,
		options: {
			headerTitleAlign: "center",
			headerTitle: "Personal Details",
			headerTintColor: color.white,
			headerStyle: headerStyle,
			headerTransparent: true,
			// headerBackground: () => headerBackground(gradientColor),
		},
	},
	{
		name: "faq",
		component: Faq,
		options: {
			headerTitleAlign: "center",
			headerTintColor: color.white,
			headerStyle: headerStyle,
			headerBackground: () => headerBackground(greyColor),
		},
	},
];
export default ProfileNavigation;
