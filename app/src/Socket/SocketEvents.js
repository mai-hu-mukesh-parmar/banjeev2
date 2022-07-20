import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../Context/Socket";
import InCallManager from "react-native-incall-manager";
import { getLocalStorage } from "../utils/Cache/TempStorage";

function SocketEvent({ children }) {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const { systemUserId } = useSelector((state) => state.registry);

  const { navigate } = useNavigation();

  const getUsername = React.useCallback(async () => {
    const gToken = await getLocalStorage("token");
    const { user_name } = jwtDecode(gToken);
    return user_name;
  });

  const user_name = getUsername();

  React.useEffect(() => {
    socket.emit("ONLINE_STATUS_RECEIVER", user_name);
    socket.on("ON_JOIN", (data) => {
      console.log(user_name);
      getUsername().then((user_name) => {
        console.log("user_name", user_name);
        console.log("call data ----->>", data);

        if (data?.initiator?.id !== user_name) {
          navigate("AcceptCall", { ...data });
          InCallManager.startRingtone("_BUNDLE_");
        } else if (data?.initiator?.id === user_name) {
          if (data?.callType === "Video") {
            navigate("VideoCall", { ...data });
          } else {
            navigate("VoiceCall", { ...data });
          }
        }
      });
    });
  }, [socket]);

  return <React.Fragment>{children}</React.Fragment>;
}

export default SocketEvent;

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
