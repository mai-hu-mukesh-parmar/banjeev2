import {executePost} from '../../helper/apis/postORput';
import urls from '../../url';

export const otherBanjee_service = reqLoad => {
  const url = urls.USER.OTHER_BANJEE_DETAIL;
  const actionCode = 'ACTION_FILTER_CONNECTION';
  const payload = reqLoad;
  const method = 'POST';

  return executePost(url, actionCode, payload, method, null);
};
