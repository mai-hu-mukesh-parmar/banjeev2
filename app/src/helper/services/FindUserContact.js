import urls from '../../url';
import {executePost} from '../../helper/apis/postORput';

export const service = data => {
  let url = urls.USER.ACTION_CONTACTS_REGISTRY;
  let actionCode = 'ACTION_CONTACTS_REGISTRY';
  let payload = data;
  let method = 'POST';
  return executePost(url, actionCode, payload, method, false);
};
