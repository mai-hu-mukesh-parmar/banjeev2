import MakeVideoCall from "../../Screens/Communication/Call/MakeVideoCall/MakeVideoCall";
import RoomVideoCall from "../../Screens/Communication/Call/VideoCall/RoomVideoCall";
import VideoCallComp from "../../Screens/Communication/Call/VideoCall/VideoCall";

export const CallNavigation = [
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
		component: VideoCallComp,
	},
];
