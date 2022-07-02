import { combineReducers } from "redux";
import { toastReducer } from "./toastReducer";
import feedReducer from "./feedReducer";
import userDataReducer from "./userDataReducer";
import userProfileReducer from "./userProfileReducer";
import userRegisteryReducer from "./userRegisteryReducer";
import roomReducer from "./roomReducer";
import chatMessageReducer from "./socketReducers/chatMessageReducer";
import onlineStatusReducer from "./socketReducers/onlineStatusReducer";
import mapReducer from "./MapAndProfileCardReducer/mapReducer";
import { pendingConnectionReducer } from "./profile/userPendingConnectionReducer";

export const rootReducer = combineReducers({
	profile: userProfileReducer,
	registry: userRegisteryReducer,
	user: userDataReducer,
	feed: feedReducer,
	toast: toastReducer,
	room: roomReducer,
	socketChat: chatMessageReducer,
	onlineStatus: onlineStatusReducer,
	mapLocation: mapReducer,
	viewProfile: pendingConnectionReducer,
});
