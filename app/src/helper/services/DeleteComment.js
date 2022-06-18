import urls from "../../constants/env/urls";
import { executeGet } from "../apis/getORdelete";

export const deleteComment = (id) => {
	const url = urls.DELETE_POST + id;
	const actionCode = "";
	const payload = "";
	const method = "DELETE";

	return executeGet(url, actionCode, payload, method, {});
};
