import io from "socket.io-client";

export const socketMain = io.connect("wss://message.banjee.org/", {
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
