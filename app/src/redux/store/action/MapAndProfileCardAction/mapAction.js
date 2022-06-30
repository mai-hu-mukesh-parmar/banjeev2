export const SET_USER_LOCATION = "SET_USER_LOCATION";

export const setUserLocation = (data) => {
	return {
		type: SET_USER_LOCATION,
		payload: data,
	};
};
