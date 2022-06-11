import { getLocalStorage } from "../../../Cache/TempStorage";
import { executeGet } from "../../getORdelete";
import { executePost } from "../../postORput";
import urls from "../../url";

export const chatHistory = (payload) => {
	let method = "POST";
	let url = urls.RTC.CHAT.HISTORY;
	let actionCode = "ACTION_FILTER_MESSAGE";
	return executePost(url, actionCode, payload, method, true);
};
export const deleteChat = (id) => {
	let method = "DELETE";
	let url = urls.RTC.CHAT.DELETE + id;
	let actionCode = "";
	return executeGet(url, actionCode, {}, method, false);
};
