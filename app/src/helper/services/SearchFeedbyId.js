import urls from '../../url';
import {executeGet} from '../../helper/apis/getORdelete';

export const searchFeed = id => {
  const url = urls.FIND_POST + id;
  const actionCode = '';
  const payload = '';
  const method = 'GET';

  return executeGet(url, actionCode, payload, method, {});
};
