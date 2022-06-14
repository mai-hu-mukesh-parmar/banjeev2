import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Formik } from "formik";
// import {
// 	getCountryCode,
// 	validateUser,
// } from "../../Services/AuthServices/service";

import { validateUser, getCountryCode } from "../../helper/services/Auth";
import BackGroundImg from "../../constants/components/BackGroundImg";
import Card from "../../constants/components/Card";

import { Text, useToast, Input, Button } from "native-base";
// import Text from '../../Components/AppComponents/Text';

// import AppButton from '../../Components/AppComponents/AppButton';
import color from "../../constants/env/color";

// import AppTextInput from '../../Components/AppComponents/AppTextInput';
// import DropDownPicker from 'react-native-dropdown-picker';
// import ToastMessage from '../../Components/ToastMessage';

function Sign_In({ navigation }) {
	const buttonPress = ({ number }, resetForm) => {
		if (mcc) {
			validateUser({ domain: "banjee", mobile: number, userType: 0 })
				.then((res) => {
					resetForm();
					if (!res) {
						navigation.navigate("OtpScreen", { mcc, number });
					} else {
						navigation.navigate("Login", { mcc, number });
					}
				})
				.catch((err) => {
					console.warn(err);
				});
		} else {
			useToast("Plese select your country code");
		}
	};

	const [mccData, setMccData] = React.useState([]);
	const [mcc, setMcc] = React.useState();

	React.useEffect(() => {
		getCountryCode()
			.then((res) => setMccData(res))
			.catch((err) => console.log(err));
		return () => {};
	}, []);

	return (
		<BackGroundImg>
			<Formik
				initialValues={{ number: "" }}
				validate={(values) => {
					const errors = {};
					const { number } = values;
					if (!number) {
						errors.number = "Phone Number is required";
					} else {
						if (
							number.length < 6 ||
							number.length > 11 ||
							!/^\d+$/.test(number)
						) {
							errors.number = "Enter valid phone number";
						}
					}
					return errors;
				}}
				// onSubmit={buttonPress}
				onSubmit={(values, { resetForm }) => {
					buttonPress(values, resetForm);
				}}
			>
				{({
					submitForm,
					setFieldValue,
					setTouched,
					touched,
					errors,
					values,
				}) => {
					return (
						<Card>
							{/* `````````````````````` LOGO */}
							<View style={{ alignItems: "center" }}>
								<Text style={{ fontSize: 24, marginBottom: 24, marginTop: 23 }}>
									Sign Up
								</Text>
								<Image
									source={require("../../../assets/logo.png")}
									style={[
										{ height: 80, width: 80, marginBottom: 18 },
										styles.shadow,
									]}
								/>

								<Text>Please enter your mobile number</Text>

								{/* `````````````````````````` COUNTRY CODE ````````````````````` */}

								<View
									style={{
										position: "relative",
										flexDirection: "row",
										alignItems: "center",
										alignSelf: "center",
										width: "100%",
									}}
								>
									{/* <DropDownPicker
                    items={mccData.map(ele => {
                      return {
                        label: [ele.emoji, ' ', ' ', ele.mcc],
                        value: [ele.emoji, ' ', ' ', ele.mcc],
                      };
                    })}
                    // showArrow={false}
                    defaultIndex={0}
                    defaultValue={0}
                    zIndex={99999}
                    containerStyle={{
                      height: 40,
                      width: 80,
                      marginTop: 20,
                      borderWidth: 0,
                    }}
                    dropDownStyle={{borderWidth: 0, zIndex: 99999}}
                    onChangeItem={item => {
                      setMcc(item.label[3]);
                    }}
                  /> */}

									<Input
										mx="3"
										w="100%"
										onBlur={() => setTouched()}
										// style={{width: '70%', paddingLeft: 10, borderWidth: 0}}
										onChangeText={(num) => setFieldValue("number", num)}
										value={values.number}
										placeholder="Mobile Number"
										keyboardType="phone-pad"
									/>
								</View>

								{errors?.number && touched?.number && (
									<Text
										style={{ color: "red", fontStyle: "italic", fontSize: 14 }}
									>
										{errors?.number}
									</Text>
								)}
							</View>

							<Text
								style={{
									marginTop: 5,
									fontSize: 14,
									// fontStyle: "italic",
									textAlign: "center",
								}}
							>
								By clicking next,You agree to our
								<Text
									onPress={() =>
										navigation.navigate("termsAndConditions", {
											url: "https://www.banjee.org/tnc",
											label: "Tearms & Conditions",
										})
									}
									style={{
										fontSize: 14,
										fontStyle: "italic",
										color: color.link,
									}}
								>
									Terms
								</Text>
								and
								<Text
									onPress={() =>
										navigation.navigate("termsAndConditions", {
											url: "https://www.banjee.org/privacypolicy",
											label: "Privacy Policy",
										})
									}
									style={{
										fontSize: 14,
										fontStyle: "italic",
										color: color.link,
									}}
								>
									Privacy Policy
								</Text>
								.
							</Text>

							<View style={{ zIndex: 0 }}>
								<Button
									style={{ marginTop: 20, width: "100%" }}
									onPress={submitForm}
									title={"Next"}
								/>
							</View>
						</Card>
					);
				}}
			</Formik>
		</BackGroundImg>
	);
}

const styles = StyleSheet.create({
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
	phoneContainer: {
		width: "100%",
		height: 40,
		borderRadius: 3,
		marginTop: 20,
	},
	textInput: {
		paddingVertical: 0,
	},
});

export default Sign_In;
