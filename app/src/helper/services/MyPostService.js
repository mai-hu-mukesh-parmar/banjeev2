import {executePost} from '../../helper/apis/postORput';
import urls from '../../url';

export const MyPostFeed = reqload => {
  let url = urls.MYPOST;
  let actionCode = null;
  let payload = reqload;
  let method = 'POST';

  return executePost(url, actionCode, payload, method, {});
};
