import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import io from "socket.io-client";
import { getLocalStorage } from "../utils/Cache/TempStorage";
import {
	getSocketChatMessage,
	deleteChatMessage,
	seenChatMessage,
} from "../redux/store/action/chatMessageActions";
import { onlineStatus } from "../redux/store/action/socketActions/onlineStatusAction";
import { SocketContext } from "../Context/Socket";
// import io from "socket.io-client";

export default function AuthSocket({ children }) {
	const { systemUserId } = useSelector((state) => state.registry);

	const socket = React.useContext(SocketContext);

	const dispatch = useDispatch();

	// const [socket] = React.useState(
	//   io.connect("wss://message.banjee.org/", {
	//     transports: ["websocket"],
	//     origins: "*",
	//     forceNew: true,
	//     reconnection: true,
	//     reconnectionDelay: 200,
	//     reconnectionDelayMax: 500,
	//     reconnectionAttempts: Infinity,
	//     pingInterval: 1000 * 60 * 5,
	//     pingTimeout: 1000 * 60 * 3,
	//   })
	// );

	const loginSocket = React.useCallback(async () => {
		const token = await getLocalStorage("token");
		console.warn("Socket Login Running...");

		socket.on("connect", () => {
			console.warn("socket connecting");
			socket.on("AUTH", (sessionId) => {
				console.warn("socket auth");
				socket.emit("LOGIN", { token: JSON.parse(token), sessionId });
			});
		});
	}, [socket]);

	socket.on("connect_error", (err) => {
		console.warn("socket connection error", err);
	});

	socket.on("connect", () => {
		console.log("socket.connected", socket.connected);
	});
	socket.on("disconnect", () => {
		console.log("socket.disconnected", socket.disconnected);
	});
	socket.on("disconnect", (reason) => {
		console.log("socket.disconnected", socket.disconnected);
		console.log(reason); // undefined
		loginSocket();
		// Online Status Event Emit //
		socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);
	});

	// Online Status Event Emit //
	socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);

	React.useEffect(() => {
		loginSocket();
		socket.on("connect", () => {
			console.log("socket.connected", socket.connect);
			console.log("socket.connected", socket.connected);
		});
	}, [loginSocket]);

	// ----------- Socket Events Emit ------------ //

	React.useEffect(() => {
		// Online Status Recieve Event //
		socket.on("ONLINE_STATUS", (data) => {
			dispatch(onlineStatus(data));
		});
		// Chat Message Recieve Event //
		// socket.on("CHAT_MESSAGE", (data) => {
		//   console.warn(systemUserId !== data?.sender?.id);
		//   dispatch(
		//     getSocketChatMessage({
		//       ...data,
		//       key: Math.random(),
		//       isSender: systemUserId === data?.sender?.id ? false : true,
		//     })
		//   );
		// });
		// // Chat Message Delete Event //
		// socket.on("CHAT_MESSAGE_DELETED", (data) => {
		//   dispatch(deleteChatMessage(data));
		// });
		// // Chat Message Seen Event //
		// socket.on("CHAT_MESSAGE_SEEN", (data) => {
		//   dispatch(seenChatMessage(data));
		// });
	}, [socket]);

	return <>{children}</>;
}
