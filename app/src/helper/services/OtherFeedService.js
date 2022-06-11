import {executePost} from '../../helper/apis/postORput';
import urls from '../../url';

export const OtherFeedService = reqload => {
  const url = urls.OTHER_POST;
  const actionCode = null;
  const payload = reqload;
  const method = 'POST';

  return executePost(url, actionCode, payload, method, {});
};
