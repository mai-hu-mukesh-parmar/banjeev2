import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../Context/Socket";
// import {
//   getChatMessage,
//   deleteChatMessage,
//   seenChatMessage,
// } from "../redux/store/action/socketActions/chatMessageActions";
import { onlineStatus } from "../redux/store/action/socketActions/onlineStatusAction";

function SocketEvent({ children }) {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();
  const { systemUserId } = useSelector((state) => state.registry);

  // --------- Online Status Event Emit ---------- //

  socket.emit("ONLINE_STATUS_RECEIVER", systemUserId);

  // // --------- Chat Messages Events Start ---------- //

  // // Chat Message Recieve Event //
  // socket.on("CHAT_MESSAGE", (data) => {
  //   dispatch(getChatMessage(data));
  // });
  // // Chat Message Delete Event //
  // socket.on("CHAT_MESSAGE_DELETED", (data) => {
  //   dispatch(deleteChatMessage(data));
  // });
  // // Chat Message Seen Event //
  // socket.on("CHAT_MESSAGE_SEEN", (data) => {
  //   dispatch(seenChatMessage(data));
  // });

  // // --------- Chat Messages Events End ---------- //

  // --------- Online Status Event Start ---------- //

  socket.on("ONLINE_STATUS", (data) => {
    dispatch(onlineStatus(data));
  });

  // --------- Online Status Event End ---------- //

  return <React.Fragment>{children}</React.Fragment>;
}

export default SocketEvent;
