import { SAVE_MAIN_FEED } from "../action/feedAction";

const initialState = {};

export default function feedReducer(state = initialState, action) {
	switch (action.type) {
		case SAVE_MAIN_FEED:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
