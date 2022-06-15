import { GET_USER_PROFILE, SAVE_USER_PROFILE } from "../action/useActions";

const initialState = {};

export default function userProfileReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_PROFILE:
			return state;
		case SAVE_USER_PROFILE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
