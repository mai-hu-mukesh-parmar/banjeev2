export const GET_CHAT_MESSAGE = "GET_CHAT_MESSAGE";
export const DELETE_CHAT_MESSAGE = "DELETE_CHAT_MESSAGE";
export const SEEN_CHAT_MESSAGE = "SEEN_CHAT_MESSAGE";
// export const SEEN_CHAT_MESSAGE = "";

export const getChatMessage = (data) => {
	return {
		type: GET_CHAT_MESSAGE,
		payload: data,
	};
};

export const deleteChatMessage = (data) => {
	return {
		type: DELETE_CHAT_MESSAGE,
		payload: data,
	};
};

export const seenChatMessage = (data) => {
	return {
		type: SEEN_CHAT_MESSAGE,
		payload: data,
	};
};
