export const ROOM_DATA = "ROOM_DATA";
export const roomUri = (data) => {
	return {
		type: ROOM_DATA,
		payload: data,
	};
};
