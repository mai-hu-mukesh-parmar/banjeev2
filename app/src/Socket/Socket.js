import jwtDecode from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { SocketContext } from "../Context/Socket";
import { getLocalStorage } from "../utils/Cache/TempStorage";

export default function AuthSocket({ children }) {
  const socket = React.useContext(SocketContext);

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
  }, []);

  socket.on("connect_error", (err) => {
    console.warn("socket connection error", err);
  });

  React.useEffect(() => {
    loginSocket();
  }, [loginSocket]);

  return <>{children}</>;
}
