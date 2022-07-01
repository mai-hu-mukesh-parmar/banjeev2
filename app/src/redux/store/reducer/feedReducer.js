import {
	SAVE_MAIN_FEED,
	VIEW_SCREEN,
	OTHER_POST_ID,
	ACTION_ON_POST,
} from "../action/feedAction";

const initialState = {
	screen: "ALL",
	feed: [],
	otherPostId: "",
	actionOnPost: {},
};

export default function feedReducer(state = initialState, action) {
	switch (action.type) {
		case SAVE_MAIN_FEED:
			return { ...state, feed: [...state.feed, ...action.payload] };
		case VIEW_SCREEN:
			return { ...state, screen: action.payload };
		case OTHER_POST_ID:
			return { ...state, otherPostId: action.payload };
		case ACTION_ON_POST:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
