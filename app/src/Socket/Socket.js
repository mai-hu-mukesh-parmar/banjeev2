import jwtDecode from "jwt-decode";
import React from "react";
import io from "socket.io-client";
import { SocketContext } from "../Context/Socket";

export default function AuthSocket({ children }) {
	const socket = React.useContext(SocketContext);

	const token =
		"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0TmFtZSI6InBhdGVsIiwiZG9tYWluU3NpZCI6IjIwODk5MSIsImdlbmRlciI6Ik1hbGUiLCJ1c2VyX25hbWUiOiI2MjY3YjcyNTdlNGE2YTRlOGRiMjFiM2MiLCJpbmNvZ25pdG8iOmZhbHNlLCJtY2MiOiIrMjY3IiwidHlwZSI6IkNVU1RPTUVSIiwibG9jYWxlIjoiZW5nIiwiY2xpZW50X2lkIjoiaXRwbCIsImV4dGVybmFsUmVmZXJlbmNlSWQiOiI2MjY3YjcyNTk2ZWNmMzExZGQ4YmZjN2QiLCJzY29wZSI6WyJSZWFkIiwiV3JpdGUiXSwiaWQiOiI2MjY3YjcyNTdlNGE2YTRlOGRiMjFiM2MiLCJleHAiOjE2NTk5MjIzMjksImp0aSI6IjFhYjc0MTY4LWVjOWYtNDVlNC04NjU4LWVkMmIwZDc1NDQ2NCIsImVtYWlsIjoicmoxMnBhdGVsQGdtYWlsLmNvbSIsIkdyYW50ZWQtQXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQ1VTVE9NRVIifV0sInRpbWVab25lSWQiOiJHTVQiLCJtb2JpbGUiOiI5Nzk3OTciLCJleHRlcm5hbFN5c3RlbUNvZGUiOm51bGwsInVzZXJOYW1lIjoickpwYXRlbCIsImJpcnRoRGF0ZSI6IjIwMDktMDYtMDJUMTg6MzA6MDAuMDAwWiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQ1VTVE9NRVIiXSwiZmlyc3ROYW1lIjoicmpnZHVkIiwiZXh0ZXJuYWxVc2VySWQiOm51bGwsImRvbWFpbiI6IjIwODk5MSIsInJlYWxtIjoiYmFuamVlIiwidXNlclR5cGUiOjAsInVzZXJuYW1lIjoickpwYXRlbCJ9.AMS0ITj2yXe-DkVpSL98iaFBMLC4cOGbH3L6OjdafMy1ls9tF--3VWIvFixG8rOEld9qUlik4CNKZp3ECtDMdUy9sKq_Sgj2Q2GOFcUB29lfYHEiAZo6SJM9MMX2HcolT7J6zl5eN-lzM8NaEKLv3h4AfoY8KR_pzgSj1U7LHaBsBVkiY-PEwG0GBaoS5P8B-ajBl5n-LnIrwCpmC_yWPI-vxJHel4OkjL8n4GYi28bRiWh6sCdannzED2lLDV5FBMDgk08Ay_pCMh9BTgioIQjCrEVgSKQTk2wujfLkWlMV-3YYomi4vPIByVr60UxQc10FTp9T9tp4wsdLPA";

	const loginSocket = React.useCallback(() => {
		socket.on("connect", () => {
			socket.on("AUTH", (sessionId) => {
				socket.emit("LOGIN", { token: token, sessionId });
			});
		});
	}, [token]);

	socket.on("connect_error", (err) => {
		console.warn("socket connection error", err);
	});

	React.useEffect(() => {
		loginSocket();
	}, [loginSocket]);

	return <>{children}</>;
}
