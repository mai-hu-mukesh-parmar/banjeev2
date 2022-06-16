import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Image, View, Platform } from "react-native";
import { HStack, Text } from "native-base";
import color from "../../constants/env/color";
import BackGroundImg from "../../constants/components/BackGroundImg";
import Card from "../../constants/components/Card";
import AppButton from "../../constants/components/ui-component/AppButton";
import { sendOtp, validateOtp } from "../../helper/services/Auth";

import axios from "axios";
import jwtDecode from "jwt-decode";
import { setLocalStorage } from "../../utils/Cache/TempStorage";
import AppInput from "../../constants/components/ui-component/AppInput";

function Otp({ route, navigation }) {
	const [showView, setShowView] = useState("auto");
	const [seconds, setSeconds] = useState(30);
	const [otp, setOtp] = useState("");
	const [transactionCode, setTransactionCode] = useState(null);
	const [otpError, setOtpError] = useState("");
	const { countryCode, number, directLogin, type } = route.params;

	let str = number.split("");
	str.splice(2, 5, "XXXX");
	str = str.join("");

	const renderDecision = () => {
		switch (type) {
			case "LOGIN":
				console.log(number, transactionCode, otp);
				// let formData = new FormData();
				// formData.append("password", otp);
				// formData.append("grant_type", "password");
				// formData.append("domain", "banjee");
				// formData.append("accountType", 0);
				// formData.append("passwordType", "otp");
				// formData.append("transactionCode", transactionCode);
				// formData.append("username", number);
				axios
					.post(
						"https://gateway.banjee.org/services/system-service/oauth/token",
						`password=${otp}&grant_type=password&domain=banjee&accountType=0&passwordType=otp&transactionCode=${transactionCode}&username=${number}`,
						{
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
								Authorization: "Basic aXRwbDppd2FudHVubGltaXRlZA==",
							},
						}
					)
					.then((res) => {
						console.log(res.data);
						// login(formData).then((res) => {
						setToken(res.data.access_token);
						setLocalStorage("token", res.data.access_token);
						const jwtToken = jwtDecode(res.data.access_token);
						setUser(jwtToken);
						if (res) {
							navigation.navigate("CompleteProfile");
						}
						// else {
						// 	navigation.navigate("CompleteProfile");
						// }
					})
					.catch((err) => {
						console.log("-------------", JSON.stringify(err, null, 2));
					});
				break;
			case "OTP":
				if (directLogin) {
					navigation.navigate("CompleteProfile");
				} else {
					navigation.navigate("Detail", {
						number,
						mcc,
						transactionCode,
					});
				}
				break;
			default:
				break;
		}
	};

	const getOTP = () => {
		console.log("OTP", otp);
		if (otp) {
			validateOtp({
				domain: "banjee",
				mobile: number,
				osName: Platform.OS,
				otp: Object.values(otp).join(""),
				source: "mobile",
				transactionCode: transactionCode,
			})
				.then((res) => {
					if (res.valid) {
						renderDecision();
						setOtp("");
						setSeconds(0);
						setOtpError("");
					} else {
						setOtpError(res.validationRespose);
					}
				})
				.catch((err) => {
					console.warn(err);
					setOtpError("Something Went Wrong !");
				});
		}
	};

	const sendOtpToUser = useCallback(() => {
		sendOtp({
			mcc: countryCode,
			mobile: number,
			domain: "banjee",
		})
			.then((res) => {
				setTransactionCode(res.transactionCode);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, [countryCode, number]);

	const callTimer = React.useCallback(() => {
		if (seconds > 0) {
			setShowView("none");
			setTimeout(() => setSeconds(seconds - 1), 1000);
		} else {
			setShowView("auto");
		}
	}, [seconds]);

	useEffect(() => {
		sendOtpToUser();
		return () => {};
	}, [sendOtpToUser]);

	useEffect(() => {
		callTimer();
		return () => {};
	}, [callTimer]);

	const inputs = new Array(4).fill(1).map((ele, index) => {
		return {
			refs: React.useRef(),
		};
	});

	return (
		<BackGroundImg>
			<Card>
				<Image
					source={require("../../../assets/logo.png")}
					style={[
						{ height: 80, width: 80, marginBottom: 26, alignSelf: "center" },
						styles.shadow,
					]}
				/>

				<View style={styles.txtBox}>
					<Text style={styles.txt1}>
						Please enter the 4 digit OTP, which is sent to the mobile number
						&nbsp;{str}
					</Text>
					<Text
						style={{
							alignSelf: "center",
							marginTop: 10,
							fontStyle: "italic",
							color: "red",
						}}
					>
						{otpError}
					</Text>
				</View>

				<View
					style={{
						height: 40,
						width: "100%",
					}}
				>
					<HStack justifyContent={"space-between"}>
						{inputs.map((ele, index) => (
							<AppInput
								w="20%"
								px="5"
								key={index}
								keyboardType="numeric"
								ref={inputs[index].refs}
								onKeyPress={({ nativeEvent: { key: keyValue } }) => {
									if (
										keyValue === "Backspace" &&
										inputs[index - 1] &&
										otp[index]
									) {
										inputs[index - 1].refs.current.focus();
									}
								}}
								value={
									Object.values(otp)[index] ? Object.values(otp)[index] : ""
								}
								maxLength={1}
								onChange={({ nativeEvent: { text } }) => {
									setOtp((prev) => ({ ...prev, [index]: text }));
									if (inputs[index + 1] && !otp[index]) {
										inputs[index + 1].refs.current.focus();
									}
								}}
							/>
						))}
					</HStack>
				</View>

				<View style={{ marginTop: 20 }}>
					{seconds > 0 && (
						<Text textAlign={"center"} style={{ paddingVertical: 10 }}>
							{seconds + " Seconds remaining"}
						</Text>
					)}
				</View>

				<Text style={styles.link} onPress={() => navigation.navigate("SignIn")}>
					Change phone number
				</Text>

				<AppButton
					style={{ marginTop: 20, width: "100%" }}
					onPress={getOTP}
					title={"Proceed"}
				/>

				{showView !== "none" ? (
					<View style={{ width: "100%" }} pointerEvents={showView}>
						<AppButton
							style={{
								marginTop: 10,
								width: "100%",
							}}
							onPress={() => {
								sendOtpToUser();
								setSeconds(30);
								setOtp(null);
							}}
							title={"Resend"}
						/>
					</View>
				) : (
					<View style={{ width: "100%" }} pointerEvents={showView}>
						<AppButton
							disabled={true}
							style={{
								marginTop: 10,
								width: "100%",
							}}
							onPress={(e) => {
								setOtp(null);
							}}
							title={"Resend"}
						/>
					</View>
				)}
			</Card>
		</BackGroundImg>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.card,
		zIndex: 0,
		width: 300,
		padding: 22,
		paddingBottom: 45,
		alignItems: "center",
	},
	shadow: {
		shadowColor: "grey",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 3,
	},
	sign: {
		display: "flex",
		flexDirection: "row",
		height: 40,
		width: "100%",
		alignItems: "center",
		backgroundColor: color.white,
		justifyContent: "space-evenly",
	},
	txtBox: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	txt1: { textAlign: "center", alignSelf: "center" },

	underlineStyleBase: {
		width: 40,
		fontSize: 16,
		height: 40,
		color: color.black,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: color.black,
		backgroundColor: color.white,
	},

	underlineStyleHighLighted: {
		borderColor: color.black,
	},
	link: {
		alignSelf: "center",
		textDecorationLine: "underline",
		color: color.link,
	},
});

export default Otp;
