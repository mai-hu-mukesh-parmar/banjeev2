import { SET_ROOM_DATA, RESET_ROOM_DATA } from "../action/roomData";

const initialState = {
	roomUri: false,
	roomTitle: "",
	communityType: "",
	categoryId: undefined,
	subCategoryId: undefined,
	subCategoryItem: undefined,
	imageContent: { src: null },
};

export default function roomReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ROOM_DATA:
			return { ...state, ...action.payload };
		case RESET_ROOM_DATA: {
			return { ...action.payload };
		}

		default:
			return state;
	}
}
