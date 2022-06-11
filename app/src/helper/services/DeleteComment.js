import { executeGet } from "../../getORdelete";
import urls from "../../url";

export const deleteComment = (id) => {
  const url = urls.DELETE_POST + id;
  const actionCode = "";
  const payload = "";
  const method = "DELETE";

  return executeGet(url, actionCode, payload, method, {});
};
