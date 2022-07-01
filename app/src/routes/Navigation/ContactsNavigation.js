import color from "../../constants/env/color";
import {
	headerBackground,
	headerStyle,
} from "../../constants/navigation/navigation";
import MainChatScreen from "../../views/Main/Contacts/MainChatScreen";
import SearchBanjee from "../../views/Main/Contacts/SearchBanjee/SearchBanjee";

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
];

export default Contacts;
