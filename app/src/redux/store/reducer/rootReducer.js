import { combineReducers } from "redux";
import { toastReducer } from "./toastReducer";
import { pendingConnectionReducer } from "./profile/userPendingConnectionReducer";
import feedReducer from "./feedReducer";
import userDataReducer from "./userDataReducer";
import userProfileReducer from "./userProfileReducer";
import userRegisteryReducer from "./userRegisteryReducer";
import roomReducer from "./roomReducer";
import chatMessageReducer from "./chatMessageReducer";
import onlineStatusReducer from "./socketReducers/onlineStatusReducer";
import socketReducer from "./socketReducer";
import mapReducer from "./MapAndProfileCardReducer/mapReducer";
import createFeedReducer from "./createFeedReducer";

export const rootReducer = combineReducers({
	profile: userProfileReducer,
	registry: userRegisteryReducer,
	user: userDataReducer,
	feed: feedReducer,
	toast: toastReducer,
	room: roomReducer,
	socket: socketReducer,
	socketChat: chatMessageReducer,
	onlineStatus: onlineStatusReducer,
	mapLocation: mapReducer,
	viewProfile: pendingConnectionReducer,
	createdFeedData: createFeedReducer,
});
