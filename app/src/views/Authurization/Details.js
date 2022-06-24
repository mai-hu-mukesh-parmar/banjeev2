import { StyleSheet, View, ScrollView, Platform } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import jwtDecode from "jwt-decode";
import * as Location from "expo-location";
import { signup } from "../../helper/services/Auth";
import {
	getUserProfile,
	updateUser,
} from "../../helper/services/SettingService";
import BackGroundImg from "../../constants/components/BackGroundImg";
import AppLoading from "../../constants/components/ui-component/AppLoading";
import UserDetailForm from "../Main/Profile/UpdateInfo/UserDetailForm";
import Gender from "../Main/Profile/UpdateInfo/Gender";
import DOB from "../Main/Profile/UpdateInfo/DOB";
import AppButton from "../../constants/components/ui-component/AppButton";
import color from "../../constants/env/color";
import { useDispatch } from "react-redux";
import {
	saveUserData,
	saveUserProfile,
	saveUserRegistry,
} from "../../redux/store/action/useActions";
import Card from "../../constants/components/Card";
import { setLocalStorage } from "../../utils/Cache/TempStorage";
import { useUserUpdate } from "../../utils/hooks/useUserUpdate";
import { showToast } from "../../redux/store/reducer/toastAction";
import { getUserRegistryData } from "../../helper/services/SplashService";
export default function Details({ navigation }) {
	const dispatch = useDispatch();
	useUserUpdate(token, "Bottom");
	const [visible, setVisible] = React.useState(false);
	const [user, setUser] = React.useState(null);
	const currentDate = new Date();
	const limitYear = currentDate.getFullYear();
	const limitMonth = currentDate.getMonth();
	const limitDate = currentDate.getDate();
	const limit = new Date(parseInt(limitYear) - 13, limitMonth, limitDate);
	const [date, setDate] = React.useState(limit);
	const [token, setToken] = useState(null);

	const {
		params: { number, mcc, transactionCode },
	} = useRoute();

	React.useEffect(() => {
		if (user) {
			setDate(
				user?.birthDate
					? new Date(
							user?.birthDate
								?.split("-" || "/")
								.map((ele) => {
									if (ele.length < 2) {
										return `0${ele}`;
									} else {
										return ele;
									}
								})
								.join("-")
					  )
					: null
			);
		}
		return () => {
			setUser(null);
		};
	}, []);

	const updateMe = (data) => {
		signup({
			birthDate: new Date(date).toISOString().split("T")[0],
			city: null,
			course: null,
			domain: "banjee",
			email: data.email,
			emailVerified: false,
			external: null,
			externalSystemCode: null,
			externalUserId: null,
			firstName: data.firstName,
			gender: data.gender,
			id: null,
			institute: null,
			lastName: data.lastName,
			mcc: mcc,
			mobile: number,
			osName: Platform.OS,
			password: data.password,
			source: "mobile",
			systemUserId: null,
			transactionCode: transactionCode,
			userType: 0,
			username: data.username,
		})
			.then((res) => {
				if (res) {
					handleLogin(data.password, res.id);
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.statusCode === -101) {
					dispatch(showToast({ open: true, description: err.message }));
				}
			});
	};

	const handleLogin = (password, id) => {
		axios
			.post(
				"https://gateway.banjee.org/services/system-service/oauth/token",
				`username=${number}&password=${password}&domain=208991&accountType=0&grant_type=password&passwordType=password+`,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: "Basic aXRwbDppd2FudHVubGltaXRlZA==",
					},
				}
			)
			.then(async (res) => {
				await setLocalStorage("token", res.data.access_token);
				// const jwtToken = jwtDecode(res.data.access_token);
				setToken(res.data.access_token);
				dispatch(saveUserData({ ...res, user: jwtToken }));
				getUserProfileData(id, {
					Authorization: "Bearer " + res.data.access_token,
				});
			})
			.catch((err) => {
				console.warn("Login Error", err);
			});
	};

	const getUserProfileData = React.useCallback((id, header) => {
		getUserProfile(id, header)
			.then(async (res) => {
				dispatch(saveUserProfile(res));
				await getUser(res.systemUserId);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	const getUser = React.useCallback(async (id) => {
		let locationAsync = await Location.getCurrentPositionAsync({});

		const { longitude, latitude } = locationAsync.coords;

		getUserRegistryData(id)
			.then((res) => {
				if (res) {
					userHandler(
						{
							...res,
							currentLocation: { lat: latitude, lon: longitude },
						},
						"PUT"
					);
				} else {
					userHandler(
						{
							systemUserId: id,
							connections: [],
							pendingConnections: [],
							blockedList: [],
							currentLocation: { lat: latitude, lon: longitude },
						},
						"POST"
					);
				}
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	const userHandler = React.useCallback((data, method) => {
		updateUser(data, method)
			.then((res) => {
				dispatch(saveUserData(res));
				navigation.navigate("UpdateAvatar");
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);
	return (
		<BackGroundImg>
			{visible && <AppLoading visible={visible} />}
			<ScrollView showsVerticalScrollIndicator={false}>
				<Formik
					initialValues={{
						firstName: user?.firstName,
						lastName: user?.lastName,
						username: user?.username,
						email: user?.email,
						mobile: user?.mobile,
						gender: user?.gender,
						password: "",
					}}
					enableReinitialize={true}
					onSubmit={(values) => updateMe(values)}
				>
					{({ submitForm, resetForm }) => {
						return (
							<Card>
								{/*``````````````````````` PROFILE PIC */}

								<View
									style={{ position: "relative", alignItems: "center" }}
								></View>

								<UserDetailForm passwordFeild={true} />

								{/*``````````````````````` GENDER */}

								<Gender />
								<DOB onChange={setDate} value={date} />

								{/*``````````````````````` DATE OF BIRTH */}
								<View style={styles.btnView}>
									<AppButton
										onPress={submitForm}
										style={[styles.btn, { paddingHorizontal: 40 }]}
										title={"Register"}
									/>
								</View>
								{/*``````````````````````` NAME EMAIL PASSWORD CONTACTNO */}
							</Card>
						);
					}}
				</Formik>
			</ScrollView>
		</BackGroundImg>
	);
}

const styles = StyleSheet.create({
	img: {
		alignSelf: "center",
		height: 100,
		width: 100,
		marginTop: 5,
		borderRadius: 50,
		borderColor: color.white,
		borderWidth: 0.5,
	},
	appText: { fontSize: 14, marginTop: 20, fontWeight: "500" },
	inputView: {
		marginTop: -10,
		flexDirection: "row",
		alignItems: "center",
	},
	imgView: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		marginLeft: 15,
	},
	btn: {
		width: 150,
	},
	btnView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		marginTop: 20,
	},
	details: {
		marginTop: -40,
		marginLeft: 90,
		borderWidth: 0.5,
		borderColor: color.drawerGrey,
		borderRadius: 50,
		height: 40,
		position: "absolute",
		bottom: 0,
		left: "20%",
		width: 40,
		backgroundColor: color.white,
		alignItems: "center",
		justifyContent: "center",
	},
});
