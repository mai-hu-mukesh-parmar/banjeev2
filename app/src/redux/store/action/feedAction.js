export const SAVE_MAIN_FEED = "SAVE_MAIN_FEED";
export const VIEW_SCREEN = "VIEW_SCREEN";
export const OTHER_POST_ID = "OTHER_POST_ID";
export const ACTION_ON_POST = "ACTION_ON_POST";

export const saveFeed = (data) => {
	return {
		type: SAVE_MAIN_FEED,
		payload: data,
	};
};
export const viewScreen = (screen) => {
	return {
		type: SAVE_MAIN_FEED,
		payload: screen,
	};
};

export const saveOtherPostId = (id) => {
	return {
		type: SAVE_MAIN_FEED,
		payload: id,
	};
};
export const actionOnPost = (data) => {
	return {
		type: ACTION_ON_POST,
		payload: data,
	};
};
