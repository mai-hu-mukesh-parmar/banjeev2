import {executePost} from '../../helper/apis/postORput';
import urls from '../../url';

export const FriendRequest = requestLoad => {
  let url = urls.USER.FRIEND_REQUEST;
  let actionCode = 'ACTION_CREATE_REQUEST';
  let payload = requestLoad;
  let method = 'POST';

  return executePost(url, actionCode, payload, method, {});
};

export const NotifyFriendRequest = requestLoad => {
  let url = urls.USER.FRIEND_REQUEST_NOTIFICAION;
  let actionCode = 'ACTION_FILTER_REQUEST';
  let payload = requestLoad;
  let method = 'POST';

  return executePost(url, actionCode, payload, method, {});
};
