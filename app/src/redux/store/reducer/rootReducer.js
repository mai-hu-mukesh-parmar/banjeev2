import { combineReducers } from "redux";
import { toastReducer } from "../action/toastReducer";
import feedReducer from "./feedReducer";
import userDataReducer from "./userDataReducer";
import userProfileReducer from "./userProfileReducer";
import userRegisteryReducer from "./userRegisteryReducer";
import socketEvents from "./socketReducers/chatMessageReducer";

export const rootReducer = combineReducers({
  profile: userProfileReducer,
  registry: userRegisteryReducer,
  user: userDataReducer,
  feed: feedReducer,
  toast: toastReducer,
  socketChat: socketEvents,
});
