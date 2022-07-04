import React from "react";
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
import { SocketContext } from "../Context/Socket";
import { Alert } from "react-native";
import { getLocalStorage } from "../Cache/TempStorage";
import jwtDecode from "jwt-decode";

function GetSocketNot({ children }) {
  //   const loginSocket = React.useCallback(() => {
  //     console.log('Get Notification Socket Function...');
  //     socket.on('CHAT_MESSAGE', message => {
  //       console.log('Recieve Notification...');
  //       // console.log(message);
  //     });
  //   }, []);

  // setTimeout(() => {
  //   socket.emit('CREATE_CHAT_MESSAGE', {
  //     canDownload: false,
  //     content: {
  //       base64Content:
  //         'AAAAGGZ0eXBtcDQyAAAAAGlzb21tcDQyAAAAAW1kYXQAAAAAAAAEowFAIoCjfXCFLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLwFAIoCjfXCFLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLwFAIoCjfXCFLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLwFAIoCjfXCFLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLwFAIoCjfXiFLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8BQCKAo31whS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS8AAALtbW9vdgAAAGxtdmhkAAAAAN4r127eK9duAAAnEAAAHgAAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAADR1ZHRhAAAAEFNETE5TRVFfUExBWQAAABBzbXJkVFJVRUJMVUUAAAAMc210YQAAAAAAAAB2bWV0YQAAACFoZGxyAAAAAAAAAABtZHRhAAAAAAAAAAAAAAAAAAAAACtrZXlzAAAAAAAAAAEAAAAbbWR0YWNvbS5hbmRyb2lkLnZlcnNpb24AAAAiaWxzdAAAABoAAAABAAAAEmRhdGEAAAABAAAAADExAAABz3RyYWsAAABcdGtoZAAAAAfeK9du3ivXbgAAAAEAAAAAAAAeAAAAAAAAAAAAAAAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAWttZGlhAAAAIG1kaGQAAAAA3ivXbt4r124AAB9AAAAYAAAAAAAAAAAsaGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAFNvdW5kSGFuZGxlAAAAARdtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAANtzdGJsAAAAW3N0c2QAAAAAAAAAAQAAAEttcDRhAAAAAAAAAAEAAAAAAAAAAAABABAAAAAAH0AAAAAAACdlc2RzAAAAAAMZAAAABBFAFQADAAAAL6gAAC+oBQIViAYBAgAAABhzdHRzAAAAAAAAAAEAAAAGAAAEAAAAACxzdHN6AAAAAAAAAAAAAAAGAAAAwwAAAMMAAADDAAAAwwAAAMQAAADDAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAGAAAAAQAAABhjbzY0AAAAAAAAAAEAAAAAAAAAKA==',
  //       caption: '6176b3a771748e095f9a2d2a',
  //       height: 0,
  //       length: 0,
  //       mediaDesignType: 0,
  //       mimeType: 'audio/mp3',
  //       sequenceNumber: 0,
  //       sizeInBytes: 0,
  //       title: '790f3702-66e0-4e9b-9a2f-be657418b413.mp3',
  //       width: 0,
  //     },
  //     destructiveAgeInSeconds: 25,
  //     expired: false,
  //     expiryAgeInHours: 24,
  //     group: false,
  //     roomId: '61dfc7561bad8104a73387f4',
  //     secret: false,
  //     selfDestructive: false,
  //     sender: {
  //       age: 0,
  //       avtarImageUrl: '6152ad4063f6a40a07c65f76',
  //       domain: 'banjee',
  //       email: 'jignesh11@gmail.com',
  //       firstName: 'hp',
  //       id: '61d6c8e251d8313090ebedd2',
  //       mobile: '959595',
  //       username: 'jignesh13',
  //     },
  //     senderId: '61d6c8e251d8313090ebedd2',
  //   });
  // }, 10000);

  const socket = React.useContext(SocketContext);

  const sendNotification = (message) => {
    PushNotification.localNotification({
      title: message.sender.firstName,
      message: message.content.title,
    });
  };

  const getToken = (message) => {
    getLocalStorage("token")
      .then((res) => {
        // console.log(res);
        const { id } = jwtDecode(res);
        if (id !== message.sender.id) {
          sendNotification(message, id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendNotificationCall = (message) => {
    PushNotification.localNotification({
      title: `Incoming ${message.callType} Call`,
      message: `from ${message.initiator.firstName}`,
      actions: ["Answer", "Decline"],
    });
  };

  const callDisconnectNotification = (message) => {
    PushNotification.localNotification({
      title: `Missed Call`,
      message: `from ${message.initiator.firstName}`,
    });
  };

  socket.on("CHAT_MESSAGE", (message) => {
    // console.log("Recieve Notification...");
    getToken(message);
  });

  socket.on("ON_JOIN", (data) => {
    // console.log("signal");
    sendNotificationCall(data);
  });
  // socket.on("CANCELED", (data) => {
  // 	console.log("disconnect");
  // 	callDisconnectNotification(data);
  // });

  //   React.useEffect(() => {
  //     loginSocket();
  //   }, [loginSocket]);

  return <>{children}</>;
}

export default GetSocketNot;
