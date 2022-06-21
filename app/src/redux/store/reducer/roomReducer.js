import { ROOM_DATA } from "../action/roomData";

const initialState = {
	roomUri: false,
	roomTitle: "",
	communityType: "",
};

export default function roomReducer(state = initialState, action) {
	switch (action.type) {
		case ROOM_DATA:
			return { ...state, ...action.payload };

		default:
			return state;
	}
}
