import { executePost } from "../../postORput";
import urls from "../../url";

export const postReaction = (reqLoad) => {
  const url = urls.POST_REACTION;
  const actionCode = null;
  const payload = reqLoad;
  const method = "POST";
  return executePost(url, actionCode, payload, method, {});
};
