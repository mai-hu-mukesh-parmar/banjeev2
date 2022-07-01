export const SET_USER_LOCATION = "SET_USER_LOCATION";
export const MAP_REFERENCE = "MAP_REFERENCE";
export const BOTTOM_REFERENCE = "BOTTOM_REFERENCE";

export const setUserLocation = (data) => {
	return {
		type: SET_USER_LOCATION,
		payload: data,
	};
};

export const setMapRef = (data) => {
	console.log("----------------->ACTION", data);
	return { type: MAP_REFERENCE, paylaod: data };
};
export const setBottomSheetRef = (data) => {
	return { type: MAP_REFERENCE, paylaod: data };
};
