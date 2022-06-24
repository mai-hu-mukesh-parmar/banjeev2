import {
	SET_ROOM_DATA,
	RESET_ROOM_DATA,
	SET_ROOM_IDS,
	RESET_ROOM_IDS,
} from "../action/roomData";

const initialState = {
	roomUri: false,
	roomTitle: "",
	communityType: "",
	categoryId: undefined,
	subCategoryId: undefined,
	subCategoryItem: undefined,
};

export default function roomReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ROOM_DATA:
			return { ...state, ...action.payload };
		case RESET_ROOM_DATA: {
			return { ...action.payload };
		}
		case SET_ROOM_IDS: {
			return { ...state, ...action.payload };
		}
		case RESET_ROOM_IDS: {
			return { ...action.payload };
		}
		default:
			return state;
	}
}
