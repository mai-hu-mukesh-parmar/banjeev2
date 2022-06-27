import React from "react";

const initialState = [];

function socketEvents(state = initialState, {type, payload}) {
	switch (type) {
		case "GET_CHAT_MESSAGE":
			if (state?.filter((ele) => ele?.id === payload?.id)?.length > 0) {
				return state;
			} else {
				return [...state, payload];
			}
		case "DELETE_CHAT_MESSAGE":
			return state?.filter((ele) => ele?.id !== payload?.id);
		case "DELETE_CHAT_MESSAGE":
			return state?.map((ele) => {
				if (ele?.id === payload?.id) {
					return {
						...ele,
						seen: true,
					};
				} else return ele;
			});
		default:
			return state;
	}
}

export default socketEvents;
