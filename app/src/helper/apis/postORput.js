import { getLocalStorage } from "../Cache/TempStorage";
import { methodType } from "./methodType";
import Setting from "./Setting";
import urls from "./url";

let body = {
	actionCode: "",
	tid: "",
	sid: "",
	payload: {},
};

let postApiCall = (url, actionCode, payload, method, header) => {
	const setting = new Setting();
	let promise = new Promise(async (resolve, reject) => {
		if (payload instanceof FormData) {
			body = payload;
		} else {
			body = {
				// tid: Date.now() + 30000,
				// sid: setting.setSecurity(
				//   urls.headers["itpl-client-id"],
				//   Date.now() + 30000
				// ),
				actionCode: actionCode,
				payload: payload,
			};
		}
		let modifiedHeader = {};
		if (!header) {
			modifiedHeader = {
				...urls.headers,

				Authorization: "Basic aXRwbDppd2FudHVubGltaXRlZA==",
			};
		} else {
			modifiedHeader = {
				...urls.headers,
				...header,
				Authorization: `Bearer ${JSON.parse(await getLocalStorage("token"))}`,
			};
		}

		console.log(
			`${method}\n${url}\n${JSON.stringify(body, null, 2)}\n${JSON.stringify(
				{ headers: modifiedHeader },
				null,
				2
			)}`
		);
		methodType(method)(url, body, { headers: modifiedHeader })
			.then((response) => {
				resolve(response);
			})
			.catch((err) => {
				console.warn(err);
				console.error(`[${actionCode}]Api Call Failed : ${err}`);
				reject(err);
			});
	});
	return promise;
};
/**
 * url : api endpoinds
 * actionCode : actioncode for the api
 * payload: api request body
 * method: PUT / POST / GET / DELETE
 * header : true if api does not require token else false
 */
let executePost = (url, actionCode, payload, method, header) => {
	let promise = new Promise((resolve, reject) => {
		postApiCall(url, actionCode, payload, method, header)
			.then((response) => {
				//----------------------- this thing is for login oauth url------------------------------------
				let urlArray = url.split("/");
				if (
					urlArray[urlArray.length - 1] === "token" &&
					urlArray[urlArray.length - 2] === "oauth"
				) {
					let { status, data } = response;
					if (status === 200) {
						resolve(data);
					} else {
						reject(data);
					}
				} else {
					//-------------------------------------- this is for normal api call -------------------------

					let { statusCode, status, data } = response.data;
					if (statusCode === 0 || statusCode === 200 || status === 200) {
						resolve(data);
					} else {
						reject(response.data);
					}
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
	return promise;
};
export default postApiCall;
export { executePost };
