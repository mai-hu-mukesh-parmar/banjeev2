import {getLocalStorage} from '../../utils/Cache/TempStorage';
import {methodType} from './methodType';
import Setting from './Setting';
import urls from '../../constants/env/urls';

let httpRequest = (url, actionCode, payload, method, header) => {
  const setting = new Setting();
  let promise = new Promise(async (resolve, reject) => {
    let tid = Date.now() + 30000;
    let sid = setting.setSecurity(
      urls.headers['itpl-client-id'],
      Date.now() + 30000,
    );
    let query = `?tid=${tid}&sid=${sid}&actionCode=${actionCode}`;
    url = url + query;
    let modifiedHeader = {};
    if (!header) {
      modifiedHeader = {
        ...urls.headers,
        Authorization: 'Basic aXRwbDppd2FudHVubGltaXRlZA==',
      };
    } else {
      modifiedHeader = {
        ...urls.headers,
        Authorization: `Bearer ${JSON.parse(await getLocalStorage('token'))}`,
        ...header,
      };
    }
    console.log(
      `${method}\n${url}\n${JSON.stringify(
        {headers: modifiedHeader},
        null,
        2,
      )}`,
    );
    methodType(method)(url, {headers: modifiedHeader})
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        console.error(
          `Failed => HTTP/${method}, ${actionCode}: url :${url}, error: ${err}`,
        );
        console.warn(err);
        reject(err);
      });
  });
  return promise;
};
let executeGet = (url, actionCode, payload, method, header) => {
  let promise = new Promise((resolve, reject) => {
    httpRequest(url, actionCode, payload, method, header)
      .then(response => {
        let {statusCode, data, status} = response.data;
        if (statusCode === 0 || statusCode === 200 || status === 200) {
          resolve(data);
        } else {
          reject(response.data);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
  return promise;
};
export default httpRequest;
export {executeGet};
