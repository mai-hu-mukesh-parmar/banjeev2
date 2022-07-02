import color from "../../constants/env/color";
import {
	headerBackground,
	headerStyle,
} from "../../constants/navigation/navigation";
import MainChatScreen from "../../views/Main/Contacts/MainChatScreen";
import SearchBanjee from "../../views/Main/Contacts/SearchBanjee/SearchBanjee";
import BanjeeProfile from "../../views/Main/Contacts/BanjeeProfile/BanjeeProfile";
const Contacts = [
	{
		name: "BanjeeUserChatScreen",
		component: MainChatScreen,
		options: {
			headerLeft: "",
			headerTitle: "",
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "SearchBanjee",
		component: SearchBanjee,
		options: {
			headerShown: false,
			headerTitle: "",
			headerStyle: headerStyle,
			// headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "BanjeeProfile",
		component: BanjeeProfile,
		options: {
			headerShown: false,
			headerTitle: "",
		},
	},
];

export default Contacts;
