export const SET_ROOM_DATA = "SET_ROOM_DATA";
export const RESET_ROOM_DATA = "RESET_ROOM_DATA";
export const SET_ROOM_IDS = "SET_ROOM_IDS";
export const RESET_ROOM_IDS = "RESET_ROOM_IDS";

export const setRoomData = (data) => {
	return { type: SET_ROOM_DATA, payload: data };
};

export const resetRoomData = (data) => {
	return { type: RESET_ROOM_DATA, payload: data };
};

export const setRoomIds = (data) => {
	return { type: SET_ROOM_IDS, payload: data };
};
export const resetRoomIds = (data) => {
	return { type: SET_ROOM_IDS, payload: data };
};
