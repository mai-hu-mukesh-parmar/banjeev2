import {
	PENDING_CONNECTION,
	GET_PROFILE,
} from "../../action/Profile/userPendingConnection";
const initialState = {
	pendingFriendReq: [],
	profileId: undefined,
};

export const pendingConnectionReducer = (state = initialState, action) => {
	switch (action.type) {
		case PENDING_CONNECTION:
			return { ...state, ...action.payload };
		case GET_PROFILE:
			return { ...state, ...action.payload };

		default:
			return initialState;
	}
};
