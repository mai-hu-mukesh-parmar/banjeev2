import {executePost} from '../../helper/apis/postORput';
import urls from '../../url';

export const postFeed = reqLoad => {
  const url = urls.CREATE_FEED;
  const actionCode = '';
  const payload = reqLoad;
  const method = 'POST';
  return executePost(url, actionCode, payload, method, {});
};
export const getFeed = reqLoad => {
  const url = urls.POST_FEED;
  const actionCode = '';
  const payload = reqLoad;
  const method = 'POST';
  return executePost(url, actionCode, payload, method, {});
};
