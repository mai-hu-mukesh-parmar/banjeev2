import urls from "../../constants/env/urls";
import { executeGet } from "../apis/getORdelete";

export const searchFeed = (id) => {
	const url = urls.FIND_POST + id;
	const actionCode = "";
	const payload = "";
	const method = "GET";

	return executeGet(url, actionCode, payload, method, {});
};
