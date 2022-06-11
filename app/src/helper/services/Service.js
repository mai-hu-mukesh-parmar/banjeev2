import urls from '../../url';
import {executePost} from '../../helper/apis/postORput';
import {executeGet} from '../getORdelete';

export const myBanjeeService = requestLoad => {
  let url = urls.USER.FILTER_CONNECTION;
  let actionCode = 'ACTION_FILTER_CONNECTION';
  let payload = requestLoad;
  let method = 'POST';
  return executePost(url, actionCode, payload, method, {});
};

export const unBlockUser = userId => {
  let url = urls.USER.UNBLOCK + userId;
  let actionCode = '';
  let payload = '';
  let method = 'GET';
  return executeGet(url, actionCode, payload, method, {});
};
export const BlockUser = userId => {
  let url = urls.USER.BLOCK + userId;
  let actionCode = '';
  let payload = '';
  let method = 'GET';
  return executeGet(url, actionCode, payload, method, {});
};
