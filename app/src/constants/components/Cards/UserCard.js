import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import AppText from "../../../Components/AppComponents/AppText";
import color from "../../../Config/color";
import { EvilIcons } from "@expo/vector-icons";
import { checkGender, profileUrl } from "../../../Services/constantExport";

function UserCard(props) {
	const { avtarUrl: profileImg, gender, locationName } = props;

	return (
		<View style={styles.container}>
			{/* ````````````````````````````````````` AVATAR */}

			<View style={{ backfaceVisibility: "visible" }}>
				<AppText>
					{locationName && (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								width: "80%",
								alignSelf: "center",
							}}
						>
							<AppText style={{ color: color.white }} numberOfLines={1}>
								{locationName}
							</AppText>

							<EvilIcons name="location" color={"white"} size={20} />
						</View>
					)}
				</AppText>
			</View>
			<FastImage
				resizeMode="cover"
				style={styles.img}
				source={
					profileImg
						? {
								uri: profileUrl(profileImg),
						  }
						: checkGender(gender)
				}
			/>

			{/* ```````````````````````````````````` PAUSE AND FLAG ICONS */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		flex: 1,
		position: "relative",
	},
	img: {
		marginTop: (Dimensions.get("window").marginTop = "7%"),
		height: (Dimensions.get("window").height = "70%"),
		width: (Dimensions.get("window").width = "90%"),
		flex: 1,
		borderRadius: 5,
		borderColor: color.white,
		borderWidth: 5,
		alignSelf: "center",
		marginBottom: "10%",
	},
	iconView: {
		zIndex: 1,
		alignSelf: "center",
		width: "90%",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
	mainBottomView: {
		backgroundColor: color.white,
		height: 150,
		width: "100%",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		alignItems: "center",
		flexDirection: "column",
		paddingTop: 10,
	},
	bottomView: {
		height: 130,
		width: "100%",
		justifyContent: "space-evenly",
		flexDirection: "column",
		backgroundColor: color.white,
		alignSelf: "center",
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		alignItems: "center",
		paddingBottom: 40,
	},
	fabButton: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		backgroundColor: color.primary,
	},

	icons: {
		height: 34,
		width: 34,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},
	gif: {
		height: 30,
		width: "100%",
		zIndex: 1,
		marginLeft: 5,
	},
	btnGrp: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
		width: 96,
	},
});

export default UserCard;
