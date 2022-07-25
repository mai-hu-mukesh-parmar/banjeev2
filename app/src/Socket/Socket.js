import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getLocalStorage } from "../utils/Cache/TempStorage";
import { onlineStatus } from "../redux/store/action/socketActions/onlineStatusAction";
import io from "socket.io-client";
import { SocketContext } from "../Context/Socket";
import InCallManager from "react-native-incall-manager";
import _ from "underscore";

export default function AuthSocket({ children }) {
  const [state, setState] = React.useState(false);
  const { systemUserId } = useSelector((state) => state.registry);
  const dispatch = useDispatch();

  const { navigate } = useNavigation();
  const socket = io.connect("wss://message.banjee.org/", {
    transports: ["websocket"],
    origins: "*",
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 200,
    reconnectionDelayMax: 500,
    reconnectionAttempts: Infinity,
    pingInterval: 1000 * 60 * 5,
    pingTimeout: 1000 * 60 * 3,
  });

  const socketEventss = React.useCallback(() => {
    console.warn("rerender socket js file --------------------------");
    socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
    socket.on("READY", (data) => {
      console.warn("OnReady recive and navigate to video call");
      console.log("onReady ===", data?.initiator?.id, systemUserId);
      // if(data?.initiator?.id !== systemUserId){

      if (systemUserId && systemUserId !== data?.initiator?.id) {
        console.warn("OnReady recive and navigate to accept call");
        // if (data?.callType === "Video") {
        navigate("VideoCall", { ...data, caller: true, readyData: data });
        // } else {
        //   navigate("VoiceCall", { ...data });
        // }
      }
      // }
    });
    socket.on("ON_JOIN", (data) => {
      console.log("onJoin data !==", data);
      if (data?.initiator?.id !== systemUserId) {
        console.warn("OnJoin recive and navigate to accept call");
        console.log("onJoin ===", data?.initiator?.id, systemUserId);
        socket.emit("RINGING", {
          ...data,
          targetUser: data?.initiator,
          initiator: data?.targetUser,
        });
        navigate("AcceptCall", { ...data });
        InCallManager.startRingtone("_BUNDLE_");
      }

      // console.warn("------- RINGING", systemUserId);

      // InCallManager.startRingtone("_BUNDLE_");
      // console.warn("data on join data", data);
      // // if (data) {
      // //   if (data?.callType) {
      // //     console.warn("rerender socket js file --------------------------");
      // //     socket.emit("SIGNALLING_SERVER", {
      // //       ...data,
      // //       eventType: "JOIN",
      // //     });
      // //   } else {
      // //     console.warn("rerender socket js file --------------------------");
      // //     socket.emit("SIGNALLING_SERVER", {
      // //       ...data,
      // //       eventType: "JOIN",
      // //     });
      // //   }
      // // }
      // if (systemUserId && systemUserId !== data?.initiator?.id) {
      //   navigate("AcceptCall", { ...data });
      // }
    });

    socket.on("RINGING", (data) => {
      console.warn("rinigng event recive -------------->>>", data);
    });
    socket.on("ONLINE_STATUS", (data) => {
      dispatch(onlineStatus(data));
    });
  }, [systemUserId]);

  const loginSocket = React.useCallback(() => {
    socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
    getLocalStorage("token")
      .then((token) => {
        console.warn("token", token);
        console.warn("Socket Login Running...");
        socket.on("connect", () => {
          console.warn("socket connecting");
          socket.on("AUTH", (sessionId) => {
            console.warn("socket auth");
            console.warn("systemUserId", systemUserId);
            socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
            socket.emit("LOGIN", { token: JSON.parse(token), sessionId });
            socketEventss();
          });
        });
      })
      .catch((err) => console.error(err));
  }, [systemUserId, socketEventss]);

  React.useEffect(() => {
    loginSocket();
  }, [loginSocket]);

  // if (state) {
  return (
    <React.Fragment>
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    </React.Fragment>
  );
  // }
  // return null;
}

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLocalStorage } from "../utils/Cache/TempStorage";
// import {
//   getSocketChatMessage,
//   deleteChatMessage,
//   seenChatMessage,
// } from "../redux/store/action/chatMessageActions";
// import { onlineStatus } from "../redux/store/action/socketActions/onlineStatusAction";
// import io from "socket.io-client";
// import { SocketContext } from "../Context/Socket";

// export default function AuthSocket({ children }) {
//   const [state, setState] = React.useState(false);
//   const { systemUserId } = useSelector((state) => state.registry);
//   // const systemUserId = "62d8ebebcaee8667bebb136d";
//   // const socket = React.useContext(SocketContext)
//     const dispatch = useDispatch();
//   const [timer, setTimer] = React.useState(0);

//   const socket = io.connect("wss://message.banjee.org/", {
//     transports: ["websocket"],
//     origins: "*",
//     forceNew: true,
//     reconnection: true,
//     reconnectionDelay: 200,
//     reconnectionDelayMax: 500,
//     reconnectionAttempts: Infinity,
//     pingInterval: 1000 * 60 * 5,
//     pingTimeout: 1000 * 60 * 3,
//   });

//   const loginSocket = React.useCallback(() => {
//     socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
//     getLocalStorage("token")
//       .then((token) => {
//         console.warn("token", token);
//         console.warn("Socket Login Running...");

//         socket.on("connect", () => {
//           console.warn("socket connecting");
//           socket.on("AUTH", (sessionId) => {
//             console.warn("socket auth");
//             console.warn("systemUserId", systemUserId);
//             socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
//             socket.emit("LOGIN", { token: JSON.parse(token), sessionId });
//           });
//         });
//       })
//       .catch((err) => console.error(err));
//   }, [systemUserId]);

//   socket.on("connect", () => {
//     console.log("socket.connected", socket.connected);
//   });
//   socket.on("disconnect", () => {
//     console.log("socket.disconnected", socket.disconnected);
//   });
//   socket.on("disconnect", (reason) => {
//     console.log("socket.disconnected", socket.disconnected);
//     console.log("socket.disconnected reason", reason);
//     loginSocket();
//     socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
//   });

//   // Online Status Event Emit //
//   socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);

//   // socket.on("connect_error", (err) => {
//   // 	console.warn("socket connection error", err);
//   // 	if (timer < 5) {
//   // 		setTimer(timer + 1);
//   // 		loginSocket();
//   // 	}
//   // });

//   React.useEffect(() => {
//     loginSocket();
//     setTimeout(() => {
//       setState(true);
//     }, 1000);
//     // socket.on("connect", () => {
//     // 	console.log("socket.connected", socket.connect);
//     // 	console.log("socket.connected", socket.connected);
//     // });
//   }, [loginSocket]);
//   // ----------- Socket Events Emit ------------ //

//   React.useEffect(() => {
//     // Online Status Recieve Event //

//     socket.on("ONLINE_STATUS", (data) => {
//         dispatch(onlineStatus(data));
//     });
//     // Chat Message Recieve Event //
//     // socket.on("CHAT_MESSAGE", (data) => {
//     //   console.warn(systemUserId !== data?.sender?.id);
//     //   dispatch(
//     //     getSocketChatMessage({
//     //       ...data,
//     //       key: Math.random(),
//     //       isSender: systemUserId === data?.sender?.id ? false : true,
//     //     })
//     //   );
//     // });
//     // // Chat Message Delete Event //
//     // socket.on("CHAT_MESSAGE_DELETED", (data) => {
//     //   dispatch(deleteChatMessage(data));
//     // });
//     // // Chat Message Seen Event //
//     // socket.on("CHAT_MESSAGE_SEEN", (data) => {
//     //   dispatch(seenChatMessage(data));
//     // });
//   }, []);

//   if (state) {
//     return (
//       <React.Fragment>
//         <SocketContext.Provider value={socket}>
//           {children}
//         </SocketContext.Provider>
//       </React.Fragment>
//     );
//   }
//   return null;
// }
