import {executeGet} from '../../helper/apis/getORdelete';
import urls from '../../url';

export const deletePost = postId => {
  const url = urls.DELETE_POST + postId;
  const actionCode = '';
  const payload = '';
  const method = 'DELETE';

  executeGet(url, actionCode, payload, method, false);
};
