import { Platform } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { PERMISSIONS, request } from "react-native-permissions";

// readonly ACCEPT_HANDOVER: "android.permission.ACCEPT_HANDOVER";
// readonly ACCESS_BACKGROUND_LOCATION: "android.permission.ACCESS_BACKGROUND_LOCATION";
// readonly ACCESS_COARSE_LOCATION: "android.permission.ACCESS_COARSE_LOCATION";
// readonly ACCESS_FINE_LOCATION: "android.permission.ACCESS_FINE_LOCATION";
// readonly ACCESS_MEDIA_LOCATION: "android.permission.ACCESS_MEDIA_LOCATION";
// readonly ACTIVITY_RECOGNITION: "android.permission.ACTIVITY_RECOGNITION";
// readonly ADD_VOICEMAIL: "com.android.voicemail.permission.ADD_VOICEMAIL";
// readonly ANSWER_PHONE_CALLS: "android.permission.ANSWER_PHONE_CALLS";
// readonly BLUETOOTH_ADVERTISE: "android.permission.BLUETOOTH_ADVERTISE";
// readonly BLUETOOTH_CONNECT: "android.permission.BLUETOOTH_CONNECT";
// readonly BLUETOOTH_SCAN: "android.permission.BLUETOOTH_SCAN";
// readonly BODY_SENSORS: "android.permission.BODY_SENSORS";
// readonly CALL_PHONE: "android.permission.CALL_PHONE";
// readonly CAMERA: "android.permission.CAMERA";
// readonly GET_ACCOUNTS: "android.permission.GET_ACCOUNTS";
// readonly PROCESS_OUTGOING_CALLS: "android.permission.PROCESS_OUTGOING_CALLS";
// readonly READ_CALENDAR: "android.permission.READ_CALENDAR";
// readonly READ_CALL_LOG: "android.permission.READ_CALL_LOG";
// readonly READ_CONTACTS: "android.permission.READ_CONTACTS";
// readonly READ_EXTERNAL_STORAGE: "android.permission.READ_EXTERNAL_STORAGE";
// readonly READ_PHONE_NUMBERS: "android.permission.READ_PHONE_NUMBERS";
// readonly READ_PHONE_STATE: "android.permission.READ_PHONE_STATE";
// readonly READ_SMS: "android.permission.READ_SMS";
// readonly RECEIVE_MMS: "android.permission.RECEIVE_MMS";
// readonly RECEIVE_SMS: "android.permission.RECEIVE_SMS";
// readonly RECEIVE_WAP_PUSH: "android.permission.RECEIVE_WAP_PUSH";
// readonly RECORD_AUDIO: "android.permission.RECORD_AUDIO";
// readonly SEND_SMS: "android.permission.SEND_SMS";
// readonly USE_SIP: "android.permission.USE_SIP";
// readonly WRITE_CALENDAR: "android.permission.WRITE_CALENDAR";
// readonly WRITE_CALL_LOG: "android.permission.WRITE_CALL_LOG";
// readonly WRITE_CONTACTS: "android.permission.WRITE_CONTACTS";
// readonly WRITE_EXTERNAL_STORAGE: "android.permission.WRITE_EXTERNAL_STORAGE";

export default function usePermission(permission) {
	const [result, setResult] = useState(null);

	const checkOS = useCallback(() => {
		console.log(Platform.OS);

		if (Platform.OS === "android") {
			checkAndroidFunc();
		} else {
			checkIosFunc();
		}
	}, []);

	const getRequest = useCallback(async (per) => {
		const data = await request(per);
		console.log("PERMISSIONS", data);
		setResult(data);
	}, []);

	const checkAndroidFunc = useCallback(async () => {
		const getOS = PERMISSIONS.ANDROID;
		switch (permission) {
			case "STORAGE":
				await getRequest(getOS.WRITE_EXTERNAL_STORAGE);
				await getRequest(getOS.READ_EXTERNAL_STORAGE);
				break;
			case "LOCATION":
				await getRequest(getOS.ACCESS_COARSE_LOCATION);
				await getRequest(getOS.ACCESS_BACKGROUND_LOCATION);
				await getRequest(getOS.ACCESS_FINE_LOCATION);
				break;
			case "MEDIA":
				await getRequest(getOS.ACCESS_MEDIA_LOCATION);
				break;
			case "BLUETOOTH":
				await getRequest(getOS.BLUETOOTH_CONNECT);
				break;
			case "CAMERA":
				await getRequest(getOS.CAMERA);
				break;
			case "AUDIO":
				await getRequest(getOS.RECORD_AUDIO);

				break;
			default:
				break;
		}
	}, [permission, getRequest]);

	const checkIosFunc = useCallback(async () => {
		const getOS = PERMISSIONS.IOS;
		switch (permission) {
			case "STORAGE":
				await getRequest(getOS.MEDIA_LIBRARY);

				break;
			case "LOCATION":
				console.log("Waiting for permission");
				// await getRequest(getOS.LOCATION_ALWAYS);
				await getRequest(getOS.LOCATION_WHEN_IN_USE);

				break;
			case "MEDIA":
				await getRequest(getOS.MEDIA_LIBRARY);
				await getRequest(getOS.PHOTO_LIBRARY);
				break;
			// case "BLUETOOTH":
			// 	await getRequest(getOS.);
			// 	break;
			case "CAMERA":
				await getRequest(getOS.CAMERA);
				break;
			case "AUDIO":
				await getRequest(getOS.MICROPHONE);

				break;
			default:
				break;
		}
	}, [permission, getRequest]);

	useEffect(() => {
		checkOS();
	}, [checkOS]);

	return result;
}
