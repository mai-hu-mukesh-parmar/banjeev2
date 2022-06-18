export const SAVE_MAIN_FEED = "SAVE_MAIN_FEED";

export const saveFeed = (data) => {
	return {
		type: SAVE_MAIN_FEED,
		payload: data,
	};
};
