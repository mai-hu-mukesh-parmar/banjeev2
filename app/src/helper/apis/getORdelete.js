import { getLocalStorage } from "../../utils/Cache/TempStorage";
import { methodType } from "./methodType";
import Setting from "./Setting";
import urls from "../../constants/env/urls";
// import { useToast } from "native-base";

let httpRequest = (url, actionCode, payload, method, header) => {
	const setting = new Setting();
	let promise = new Promise(async (resolve, reject) => {
		let tid = Date.now() + 30000;
		let sid = setting.setSecurity(
			urls.headers["itpl-client-id"],
			Date.now() + 30000
		);
		let query = `?tid=${tid}&sid=${sid}&actionCode=${actionCode}`;
		url = url + query;
		let modifiedHeader = {};
		if (!header) {
			modifiedHeader = {
				...urls.headers,
				Authorization: "Basic aXRwbDppd2FudHVubGltaXRlZA==",
			};
		} else {
			modifiedHeader = {
				...urls.headers,
				Authorization: `Bearer ${JSON.parse(await getLocalStorage("token"))}`,
				...header,
			};
		}
		console.log(
			`${method}\n${url}\n${JSON.stringify(
				{ headers: modifiedHeader },
				null,
				2
			)}`
		);
<<<<<<< HEAD

=======
>>>>>>> 32c64e3f027082e6e610255d55f171b1a17b5d4f
		methodType(method)(url, { headers: modifiedHeader })
			.then((response) => {
				resolve(response);
			})
			.catch((err) => {
				console.error(
					`Failed => HTTP/${method}, ${actionCode}: url :${url}, error: ${err}`
				);
				console.warn(err);
				reject(err);
			});
	});
	return promise;
};
// const toast = useToast();

let executeGet = (url, actionCode, payload, method, header) => {
	let promise = new Promise((resolve, reject) => {
		httpRequest(url, actionCode, payload, method, header)
			.then((response) => {
				let { statusCode, data, status } = response.data;
				if (statusCode === 0 || statusCode === 200 || status === 200) {
					resolve(data);
<<<<<<< HEAD
=======
				} else if (statusCode === 500) {
					console.warn(" network error....................");
>>>>>>> 32c64e3f027082e6e610255d55f171b1a17b5d4f
				} else {
					reject(response.data);
				}
			})
			.catch((err) => {
<<<<<<< HEAD
=======
				// toast.show({ description: "No internet connection " });
>>>>>>> 32c64e3f027082e6e610255d55f171b1a17b5d4f
				reject(err);
			});
	});
	return promise;
};
export default httpRequest;
export { executeGet };
