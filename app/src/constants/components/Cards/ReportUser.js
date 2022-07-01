import React from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import ReportUserService from "../../../helper/services/ReportService";
import AppInput from "../ui-component/AppInput";
import AppButton from "../ui-component/AppButton";
import color from "../../env/color";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "native-base";
import { showToast } from "../../../redux/store/action/toastAction";

function ReportUser({ modalVisible, setModalVisible, systemUserId }) {
	const userData = useSelector((state) => state.registry);
	const [voiceReport, setVoiceReport] = React.useState(false);
	const [scamReport, setScamReport] = React.useState(false);
	const [reportMsg, setReportMsg] = React.useState("");
	const dispatch = useDispatch();
	const submitReport = () => {
		ReportUserService({
			connectionRequestId: null,
			fromUserId: userData.systemUserId,
			toUserId: systemUserId,
			inappropriate_Voice_Message: voiceReport,
			other: reportMsg,
			scam_Bot: scamReport,
		})
			.then((res) => {
				dispatch(showToast({ open: true, description: "User reported..!!" }));
				setModalVisible(false);
			})
			.catch((err) => console.warn(err));
	};

	return (
		<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
			<View
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					zIndex: 9,
					backgroundColor: "rgba(0,0,0,0.5)",
				}}
			>
				<View
					style={{ display: "flex", justifyContent: "center", height: "100%" }}
				>
					<View style={styles.container}>
						<BouncyCheckbox
							style={{ marginTop: 36 }}
							size={20}
							fillColor="black"
							unfillColor="#FFFFFF"
							text="Inappropriate Voice Message"
							iconStyle={{ borderColor: "black", borderRadius: 2 }}
							textStyle={{ color: color.black, textDecorationLine: "none" }}
							onPress={(isChecked) => {
								isChecked ? setVoiceReport(true) : setVoiceReport(false);
							}}
						/>

						<BouncyCheckbox
							style={{ marginTop: 14 }}
							size={20}
							fillColor="black"
							unfillColor="#FFFFFF"
							text="This is Scam/Bot"
							iconStyle={{ borderColor: "black", borderRadius: 2 }}
							textStyle={{ color: color.black, textDecorationLine: "none" }}
							onPress={(isChecked) => {
								isChecked ? setScamReport(true) : setScamReport(false);
							}}
						/>

						<Text style={{ marginTop: 20, marginBottom: 10 }}>Other</Text>

						<AppInput
							multiline={true}
							numberOfLines={4}
							textAlignVertical={"top"}
							placeholder={"Please Type...."}
							style={{ height: 86, textAlignVertical: "top", padding: 9 }}
							onChangeText={(e) => setReportMsg(e)}
						/>

						<View
							style={{
								flexDirection: "row",
								width: "100%",
								justifyContent: "center",
								marginTop: 40,
							}}
						>
							<AppButton
								onPress={() => submitReport()}
								style={{ width: 120, borderRadius: 20 }}
								title={"Report"}
							/>
							{/* 
              <AppButton
                style={{ width: 120, borderRadius: 20 }}
                title={"Block Banjee"}
              /> */}
						</View>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		// zIndex: 2,
		// height: 310,
		display: "flex",
		width: 305,
		backgroundColor: color.white,
		borderRadius: 8,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 20,
		elevation: 50,
		shadowColor: "grey",
		shadowOffset: {
			height: 10,
			width: 10,
		},
		shadowRadius: 50,
		shadowOpacity: 0.8,
		borderWidth: 1,
		borderColor: color.white,
	},
});

export default ReportUser;
