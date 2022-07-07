import color from "../../constants/env/color";
import {
	headerBackground,
	headerStyle,
} from "../../constants/navigation/navigation";
import AcceptCall from "../../views/Main/Call/AcceptCall/AcceptCall";
import VoiceCall from "../../views/Main/Call/VoiceCall/VoiceCall";
import MakeVideoCall from "../../views/Main/Call/MakeVideoCall/MakeVideoCall";
import RoomVideoCall from "../../views/Main/Call/VideoCall/RoomVideoCall";
import VideoCall from "../../views/Main/Call/VideoCall/VideoCall";

const callNavigation = [
	{
		name: "AcceptCall",
		component: AcceptCall,
		options: {
			headerShown: false,
			headerTitle: "",
			headerStyle: headerStyle,
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "VoiceCall",
		component: VoiceCall,
		options: {
			headerShown: false,
			headerTitle: "",
			headerStyle: headerStyle,
			headerBackground: () => headerBackground([color.white, color.white]),
		},
	},
	{
		name: "RoomVideoCall",
		component: RoomVideoCall,
	},
	{
		name: "MakeVideoCall",
		options: {
			headerShown: false,
		},
		component: MakeVideoCall,
	},
	{
		options: {
			headerShown: false,
		},
		name: "VideoCall",
		component: VideoCall,
	},
];

export default callNavigation;
