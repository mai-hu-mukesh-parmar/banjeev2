import color from "../../constants/env/color";
import {
	headerBackground,
	headerStyle,
} from "../../constants/navigation/navigation";
import Category from "../../views/Main/Room/CreateRoom/Category";

import CreateRoom from "../../views/Main/Room/CreateRoom/CreateRoom";
import FilterCreateRoom from "../../views/Main/Room/CreateRoom/FilterCreateRoom";
import RecordVoice from "../../views/Main/Room/CreateRoom/RecordVoice/RecordVoice";
import SelectBanjee from "../../views/Main/Room/CreateRoom/SelectBanjee";

const RoomNavigation = [
	{
		name: "CreateRoom",
		component: CreateRoom,
		options: {
			headerTitle: "",
			headerTintColor: color.black,
			headerStyle: headerStyle,
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "Category",
		component: Category,
		options: {
			headerTitle: "",
			headerTintColor: color.black,
			headerStyle: headerStyle,
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "RecordVoice",
		component: RecordVoice,
		options: {
			headerShown: false,
			headerTitle: "",
			headerStyle: headerStyle,
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "SelectBanjee",
		component: SelectBanjee,
		options: {
			headerTitle: "Select Banjee",
			headerTintColor: color.black,
			headerStyle: headerStyle,
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "FilterCreateRoom",
		component: FilterCreateRoom,
		options: {
			headerTitle: "",
			headerTintColor: color.black,
			headerStyle: headerStyle,
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
];
export default RoomNavigation;
