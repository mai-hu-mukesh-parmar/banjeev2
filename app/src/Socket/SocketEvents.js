import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../Context/Socket";
import InCallManager from "react-native-incall-manager";
import { getLocalStorage } from "../utils/Cache/TempStorage";
import _ from "underscore";

function SocketEvent({ children }) {
  const socket = React.useContext(SocketContext);
  const {
    // socket: soc,
    registry: { systemUserId: sysId },
  } = useSelector((state) => state, _.isEqual);

  // const [socket, setSocket] = useState(soc);
  const [systemUserId, setSystemUserId] = useState(sysId);

  const { navigate } = useNavigation();

  const socketEventss = React.useCallback(() => {
    socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
    socket.on("ON_JOIN", (data) => {
      console.warn("------- RINGING", systemUserId);

      InCallManager.startRingtone("_BUNDLE_");

      if (data?.callType) {
        socket.emit("SIGNALLING_SERVER", {
          ...data,
          eventType: "JOIN",
        });
      } else {
        socket.emit("SIGNALLING_SERVER", {
          ...data,
          eventType: "JOIN",
        });
      }
      if (systemUserId && systemUserId !== data?.initiator?.id) {
        navigate("AcceptCall", { ...data });
      }
    });
    socket.on("RINGING", (data) => {
      if (systemUserId && systemUserId === data?.initiator?.id) {
        if (data?.callType === "Video") {
          navigate("VideoCall", { ...data });
        } else {
          navigate("VoiceCall", { ...data });
        }
      }
    });
  }, [socket, systemUserId]);

  React.useEffect(() => {
    socketEventss();
    if (sysId) {
      setSystemUserId(sysId);
      // setSocket(soc);
    }
  }, [socketEventss, sysId]);

  return <React.Fragment>{children}</React.Fragment>;
}

export default React.memo(SocketEvent);

// import { useNavigation } from "@react-navigation/native";
// import jwtDecode from "jwt-decode";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { SocketContext } from "../Context/Socket";
// // import {
// //   getChatMessage,
// //   deleteChatMessage,
// //   seenChatMessage,
// // } from "../redux/store/action/socketActions/chatMessageActions";
// import { onlineStatus } from "../redux/store/action/socketActions/onlineStatusAction";
// import { getLocalStorage } from "../utils/Cache/TempStorage";

// function SocketEvent({ children }) {
// 	const socket = React.useContext(SocketContext);
// 	const dispatch = useDispatch();
// 	const { systemUserId } = useSelector((state) => state.registry);

// 	const { navigate } = useNavigation();

// 	const getUsername = React.useCallback(async () => {
// 		const gToken = await getLocalStorage("token");
// 		const { user_name } = jwtDecode(gToken);
// 		return user_name;
// 	});

// 	// --------- Online Status Event Emit ---------- //

// 	// socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);

// 	// // --------- Chat Messages Events Start ---------- //

// 	// // Chat Message Recieve Event //
// 	// socket.on("CHAT_MESSAGE", (data) => {
// 	//   dispatch(getChatMessage(data));
// 	// });
// 	// // Chat Message Delete Event //
// 	// socket.on("CHAT_MESSAGE_DELETED", (data) => {
// 	//   dispatch(deleteChatMessage(data));
// 	// });
// 	// // Chat Message Seen Event //
// 	// socket.on("CHAT_MESSAGE_SEEN", (data) => {
// 	//   dispatch(seenChatMessage(data));
// 	// });

// 	// // --------- Chat Messages Events End ---------- //

// 	// --------- Online Status Event Start ---------- //

// 	// socket.on("ONLINE_STATUS", (data) => {
// 	// 	dispatch(onlineStatus(data));
// 	// });

// 	React.useEffect(() => {
// 		socket.on("ON_JOIN", (data) => {
// 			if (data?.initiator?.id !== getUsername()) {
// 				navigate("AcceptCall", { ...data });
// 				// InCallManager.startRingtone("_BUNDLE_");
// 			} else if (data?.initiator?.id === getUsername()) {
// 				if (data?.callType === "Video") {
// 					navigate("VideoCall", { ...data });
// 				} else {
// 					navigate("VoiceCall", { ...data });
// 				}
// 			}
// 		});
// 	}, [socket, getUsername]);

// 	// --------- Online Status Event End ---------- //

// 	return <React.Fragment>{children}</React.Fragment>;
// }

// export default SocketEvent;
