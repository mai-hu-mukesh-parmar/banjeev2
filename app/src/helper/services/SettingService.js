import {executeGet} from '../getORdelete';
import {executePost} from '../../helper/apis/postORput';
import urls from '../../url';

export const getAvatar = requestLoad => {
  let url = urls.ASSETS.ASSETS;
  const method = 'POST';
  const payload = requestLoad;
  const actionCode = 'ACTION_FILTER_ASSETS';
  return executePost(url, actionCode, payload, method, {});
};

export const updateUser = (payload, method) => {
  let url = urls.USER.UPDATE_USER;

  const actionCode = 'ACTION_CREATE_REGISTRY';
  return executePost(url, actionCode, payload, method, {});
};

export const getUserProfile = (id, header) => {
  let url = urls.USER.GET_USER_PROFILE + id;
  const method = 'GET';
  const actionCode = '';
  return executeGet(url, actionCode, {}, method, header);
};

export const updateProfile = payload => {
  let url = urls.USER.REGISTRATION;
  const method = 'PUT';
  const actionCode = 'ACTION_UPDATE_PROFILE';
  return executePost(url, actionCode, payload, method, {});
};

export const modiefyRegistry = payload => {
  let url = urls.USER.MODIFY;
  const method = 'PUT';
  const actionCode = '';
  return executePost(url, actionCode, payload, method, {});
};

export const voiceIntro = (payload, type) => {
  let url = urls.USER.VOICE_INTRO;
  let method = type ? 'PUT' : 'POST';
  let actionCode = type ? 'ACTION_UPDATE_INTRO' : 'ACTION_CREATE_INTRO';
  return executePost(url, actionCode, payload, method, {});
};
