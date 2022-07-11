import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import color from "../../../constants/env/color";
import {
	removeUserData,
	removeUserProfile,
	removeUserRegistry,
	saveUserData,
	saveUserProfile,
	saveUserRegistry,
} from "../../../redux/store/action/useActions";
import {
	removeLocalStorage,
	removeProfileLocation,
} from "../../../utils/Cache/TempStorage";
import { onShare } from "../../Other/ShareApp";

function SettingBottomSheet({ refRBSheet, setOpen, setDeleteAccountModal }) {
	const dispatch = useDispatch();
	const { navigate, reset } = useNavigation();
	const {
		userObject: { mcc, mobile },
	} = useSelector((state) => state.registry);

	const logout = async () => {
		await removeLocalStorage("token")
			.then(() => {
				reset({
					index: 0,
					stale: true,
					routes: [{ name: "Splash" }],
				});
				// dispatch(removeUserData({}));
				// dispatch(removeUserProfile({}));
				// dispatch(removeUserRegistry({}));
				// dispatch(removeProfileLocation({}));
			})
			.catch((err) => console.warn(err));

		console.log("Logout");
	};

	const drawerNavArr = [
		{
			label: "Invite to Banjee",
			icon: require("../../../../assets/invite.png"),
			nav: () => onShare(),
		},
		{
			icon: require("../../../../assets/EditDrawerIcon/ic_edit_profile.png"),
			label: "Change Password",
			nav: () => {
				navigate("Otp", { mcc, number: mobile, ResetPassword: true });
				setOpen(false);
			},
		},
		{
			label: "Blocked Banjees",
			icon: require("../../../../assets/blocked.png"),
			nav: () => {
				navigate("Blocked_Banjee_Contacts");
				setOpen(false);
			},
		},
		{
			label: "Banjee FAQs",
			icon: require("../../../../assets/faqs.png"),
			nav: () => {
				setOpen(false);
				navigate("faq", { url: "https://www.banjee.org/faqs", label: "FAQ's" });
			},
		},
		{
			label: "Privacy Policy",
			icon: require("../../../../assets/EditDrawerIcon/ic_privacy.png"),
			nav: () => {
				setOpen(false);

				navigate("faq", {
					url: "https://www.banjee.org/privacypolicy",
					label: "Privacy Policy",
				});
			},
		},
		{
			label: "Delete Account",
			icon: require("../../../../assets//EditDrawerIcon/chat_delete.png"),
			nav: () => {
				setOpen(false);
				setDeleteAccountModal(true);
			},
		},
		{
			label: "Logout",
			icon: require("../../../../assets/logout.png"),
			nav: () => {
				logout();
				setOpen(false);
			},
		},
	];
	return (
		<React.Fragment>
			<View style={styles.bottomsheet}>
				<RBSheet
					customStyles={{
						container: { borderRadius: 10, backgroundColor: color.drawerGrey },
					}}
					height={370}
					ref={refRBSheet}
					dragFromTopOnly={true}
					closeOnDragDown={true}
					closeOnPressMask={true}
					draggableIcon
				>
					<React.Fragment>
						{drawerNavArr.map((ele, index) => (
							<TouchableWithoutFeedback onPress={() => ele.nav()} key={index}>
								<View
									style={{
										flexDirection: "row",
										height: 48,
										marginTop: index === 0 ? 15 : 0,
									}}
								>
									<FastImage
										source={ele.icon}
										height={20}
										width={20}
										style={styles.img}
									/>
									<Text style={styles.label}>{ele.label}</Text>
								</View>
							</TouchableWithoutFeedback>
						))}
					</React.Fragment>
				</RBSheet>
			</View>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	bottomsheet: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	container: {
		height: 48,
		alignItems: "center",
		flexDirection: "row",
	},
	img: {
		height: 20,
		width: 20,
		marginLeft: 16,
		tintColor: color.white,
		marginRight: 20,
	},
	label: { color: color.white },
});

export default SettingBottomSheet;
