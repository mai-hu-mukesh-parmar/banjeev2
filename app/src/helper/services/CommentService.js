import { executeGet } from "../../getORdelete";
import { executePost } from "../../postORput";
import urls from "../../url";

export const postComment = (reqLoad) => {
  const url = urls.POST_COMMENTS;
  const actionCode = "";
  const payload = reqLoad;
  const method = "POST";
  return executePost(url, actionCode, payload, method, {});
};
export const listComment = (id) => {
  const url = urls.COMMENT + id;
  const actionCode = "";
  const payload = "";
  const method = "GET";
  return executeGet(url, actionCode, payload, method, {});
};
