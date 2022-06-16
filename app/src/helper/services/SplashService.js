import urls from "../../constants/env/urls";
import { executeGet } from "../../helper/apis/getORdelete";

export const getUserRegistryData = (id) => {
	let url = `${urls.USER.GET_USER}${id}`;
	let method = "GET";
	let payload = {};
	let actionCode = "";

	return executeGet(url, actionCode, payload, method, {});
};
