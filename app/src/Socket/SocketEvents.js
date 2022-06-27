import React from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "../Context/Socket";
import {
  getChatMessage,
  deleteChatMessage,
  seenChatMessage,
} from "../redux/store/action/socketActions/chatMessageActions";

function SocketEvent({ children }) {
  const socket = React.useContext(SocketContext);
  const dispatch = useDispatch();

  // --------- Online Status Event Emit ---------- //

  socket.emit("ONLINE_STATUS_RECEIVER", "6176b3a771748e095f9a2d2a");

  // --------- Chat Messages Events Start ---------- //

  socket.on("CHAT_MESSAGE", (data) => {
    console.log("socket message recived");
    dispatch(getChatMessage(data));
  });
  socket.on("CHAT_MESSAGE_DELETED", (data) => {
    dispatch(deleteChatMessage(data));
  });
  socket.on("CHAT_MESSAGE_SEEN", (data) => {
    dispatch(seenChatMessage(data));
  });

  // --------- Chat Messages Events End ---------- //

  return <React.Fragment>{children}</React.Fragment>;
}

export default SocketEvent;
