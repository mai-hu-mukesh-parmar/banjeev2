export const PENDING_CONNECTION = "PENDING_CONNECTION";
export const GET_PROFILE = "GET_PROFILE";

export const pendingConnection = (data) => {
	return {
		type: PENDING_CONNECTION,
		payload: data,
	};
};

export const getProfile = (data) => {
	return {
		type: GET_PROFILE,
		payload: data,
	};
};
