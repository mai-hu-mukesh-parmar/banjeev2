import React from "react";
import io from "socket.io-client";

export const socket = io
	.connect("wss://message.banjee.org/", {
		transports: ["websocket"],
		origins: "*",
		forceNew: true,
		reconnection: true,
		reconnectionDelay: 200,
		reconnectionDelayMax: 500,
		reconnectionAttempts: Infinity,
	})
	.connect();
export const SocketContext = React.createContext();
