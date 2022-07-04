import { combineReducers } from "redux";
import { toastReducer } from "./toastReducer";
import feedReducer from "./feedReducer";
import userDataReducer from "./userDataReducer";
import userProfileReducer from "./userProfileReducer";
import userRegisteryReducer from "./userRegisteryReducer";
import roomReducer from "./roomReducer";
import chatMessageReducer from "./chatMessageReducer";
import onlineStatusReducer from "./socketReducers/onlineStatusReducer";
import socketReducer from "./socketReducer";

export const rootReducer = combineReducers({
  profile: userProfileReducer,
  registry: userRegisteryReducer,
  user: userDataReducer,
  feed: feedReducer,
  toast: toastReducer,
  room: roomReducer,
  socket: socketReducer,
  chatMessage: chatMessageReducer,
  onlineStatus: onlineStatusReducer,
});
