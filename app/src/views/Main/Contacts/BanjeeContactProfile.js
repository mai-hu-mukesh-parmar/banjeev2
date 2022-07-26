import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import color from "../../../constants/env/color";
import { getProfile } from "../../../redux/store/action/Profile/userPendingConnection";
import { listProfileUrl } from "../../../utils/util-func/constantExport";

function BanjeeContactProfile(props) {
	const { item } = props;

	const dispatch = useDispatch();
	const { navigate } = useNavigation();
	return (
		<View style={{ width: "18%" }}>
			<TouchableWithoutFeedback
				style={{ zIndex: 999999 }}
				onPress={() => {
					dispatch(getProfile({ profileId: item.id }));
					navigate("BanjeeProfile");
				}}
			>
				<View style={styles.imgView}>
					<Avatar
						bgColor={color.primary}
						style={styles.img}
						source={{ uri: listProfileUrl(item?.id) }}
					>
						{item?.firstName?.charAt(0).toUpperCase() || ""}
						{/* <FastImage source={checkGender(item.gender)} style={styles.img} /> */}
					</Avatar>

					{/* ------------- ACTIVE STATUS OF USER -------------- */}

					{props?.showStatus === false ? null : (
						<View>
							{item?.connectedUserOnline && <View style={styles.status} />}
						</View>
					)}
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	imgView: {
		position: "relative",
		elevation: 10,
		height: 40,
		width: 40,
		borderRadius: 20,
		marginLeft: 16,
		shadowColor: color.black,
		shadowOffset: { width: 2, height: 6 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		zIndex: 99,
	},
	img: {
		// borderColor: color.primary,
		// borderWidth: 1,
		height: "100%",
		width: "100%",
		borderRadius: 20,
	},
	status: {
		height: 8,
		width: 8,
		borderRadius: 4,
		backgroundColor: color.activeGreen,
		position: "absolute",
		bottom: 0,
		left: "10%",
		zIndex: 1,
	},
});

export default BanjeeContactProfile;
