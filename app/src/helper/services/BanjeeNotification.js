import axios from 'axios';
import {getLocalStorage} from '../../Cache/TempStorage';
import {executeGet} from '../getORdelete';
import {executePost} from '../../helper/apis/postORput';
import urls from '../../url';

//  const allBanjeeNotification = async (
//   setLoading,
//   setNotificationData,
//   page
// ) => {
//   let token = await getLocalStorage("token");

//   return axios
//     .post(
//       "https://gateway.banjee.org/services/message-broker/api/message/delivery/filter",
//       {
//         all: true,
//         eventName: [
//           "NEW_COMMENT",
//           "FEED_REACTION",
//           "REPLIED",
//           "COMMENT_REACTION",
//           "ACCEPT_REQUEST",
//           "FEED_REMOVED",
//         ],
//         page: page,
//         pageSize: 15,
//         sortby: "createdOn desc",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${JSON.parse(token)}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((res) => {
//       setLoading(false);
//       console.warn("api called");
//       setNotificationData((prev) => [...prev, ...res.data.content]);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const MarkAsReadNotification = id => {
  const url = urls.RTC.CHAT.READ_NOTIFICATION + id;
  const actionCode = '';
  const payload = '';
  const method = 'GET';
  return executeGet(url, actionCode, payload, method);
};
