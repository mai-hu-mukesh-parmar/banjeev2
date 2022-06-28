import React, { useCallback, useEffect } from "react";
import {
	View,
	StyleSheet,
	Image,
	Linking,
	TouchableWithoutFeedback,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import AppButton from "../../constants/components/ui-component/AppButton";
import { Text } from "native-base";
import OverlayDrawer from "../../constants/components/ui-component/OverlayDrawer";
import { PERMISSIONS, check, request } from "react-native-permissions";
import usePermission from "../../utils/hooks/usePermission";
import { setRoomData } from "../../redux/store/action/roomAction";
import { useDispatch } from "react-redux";

function ImageModal({
	imageModal,
	imageModalHandler,
	imageUriHandler,
	roomImage,
}) {
	const dispatch = useDispatch();

	const { checkPermission } = usePermission();
	const permissionRequest = async () => {
		const per = await checkPermission("CAMERA");

		console.log(per);

		if (per === "granted") {
			getCameraPermission();
		} else {
			Linking.openSettings();
			// await checkPermission("CAMERA");
		}
	};

	const getCameraPermission = async () => {
		let result = await ImagePicker.launchCameraAsync({
			base64: true,
		});

		if (!result.cancelled) {
			if (roomImage) {
				dispatch(
					setRoomData({
						imageContent: {
							imageBase64: result.base64,
							name: result.uri.split("/")[result.uri.split("/").length - 1],
							url: result.uri,
						},
					})
				);
			} else {
				imageUriHandler(result.uri);
			}
		}
		imageModalHandler(false);
	};

	const getGallery = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			// aspect: [4, 4],
			base64: true,
			quality: 1,
		});

		if (!result.cancelled) {
			if (roomImage) {
				dispatch(
					setRoomData({
						imageContent: {
							imageBase64: result.base64,
							name: result.uri.split("/")[result.uri.split("/").length - 1],
							url: result.uri,
						},
					})
				);
			} else {
				imageUriHandler(result.uri);
			}
		}
		imageModalHandler(false);
	};
	return (
		<React.Fragment>
			<OverlayDrawer
				transparent
				visible={imageModal}
				onClose={() => {
					imageModalHandler(false);
				}}
				closeOnTouchOutside
				animationType="fadeIn"
				containerStyle={{
					backgroundColor: "rgba(0, 0, 0, 0.4)",
					padding: 0,
					height: "100%",
					width: "100%",
				}}
				childrenWrapperStyle={{
					width: 328,
					height: 269,
					alignSelf: "center",
				}}
				animationDuration={100}
			>
				{(hideModal) => (
					<View style={styles.container}>
						<Text style={styles.txt}>Please choose image from the source</Text>

						<View style={styles.imgView}>
							<TouchableWithoutFeedback
								onPress={() => {
									// imageModalHandler(false);
									getGallery();
								}}
							>
								<View style={styles.subImgView}>
									<Image
										source={require("../../../assets/EditDrawerIcon/ic_gallary.png")}
										style={styles.img}
									/>
									<Text style={{ fontSize: 13 }}>Gallery</Text>
								</View>
							</TouchableWithoutFeedback>

							<TouchableWithoutFeedback
								onPress={() => {
									// imageModalHandler(false);
									// getCameraPermission();
									permissionRequest();
								}}
							>
								<View style={styles.subImgView}>
									<Image
										source={require("../../../assets/EditDrawerIcon/ic_capture.png")}
										style={styles.img}
									/>
									<Text style={{ fontSize: 13 }}>Camera</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
						<AppButton
							onPress={() => {
								imageModalHandler(false);
							}}
							title={"Cancel"}
							style={{ width: "80%", alignSelf: "center", marginTop: 20 }}
						/>
					</View>
				)}
			</OverlayDrawer>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: "column" },
	txt: { width: 150, alignSelf: "center", textAlign: "center" },
	imgView: {
		flexDirection: "row",
		width: "80%",
		alignItems: "center",
		justifyContent: "space-evenly",
		marginTop: 20,
		alignSelf: "center",
	},
	subImgView: {
		flexDirection: "column",
		alignItems: "center",
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 3,
	},
});

export default ImageModal;
