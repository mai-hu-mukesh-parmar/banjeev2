import { LinearGradient } from "expo-linear-gradient";

import React from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import ImageModal from "../../../Others/ImageModal";

function SelectImage({
	imageModal,
	setImageModal,
	roomUri,
	setRoomUri,
	editRoomUri,
}) {
	console.warn("editRoomUri", editRoomUri);
	return (
		<View style={{ position: "relative", marginTop: 24 }}>
			<Image
				style={{ height: 120, width: 120, borderRadius: 60 }}
				source={
					roomUri
						? roomUri?.name
							? { uri: roomUri.name }
							: editRoomUri
							? { uri: profileUrl(editRoomUri) }
							: require("../../../../../assets/EditDrawerIcon/dummy_image_group.png")
						: editRoomUri
						? { uri: profileUrl(editRoomUri) }
						: require("../../../../../assets/EditDrawerIcon/dummy_image_group.png")
					//   roomUri
					//     ? editRoomUri
					//       ? { uri: profileUrl(editRoomUri) }
					//       : { uri: roomUri.name }
					//     : require("../../../../assets/EditDrawerIcon/dummy_image_group.png")
				}
			/>

			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0.2, y: 1 }}
				colors={["rgba(237, 69, 100, 1 )", "rgba(169, 50, 148, 1 )"]}
				style={styles.gradient2}
			>
				<TouchableWithoutFeedback onPress={() => setImageModal(true)}>
					<Image
						style={{ height: 24, width: 24 }}
						source={require("../../../../../assets/EditDrawerIcon/ic_white_camera.png")}
					/>
				</TouchableWithoutFeedback>
			</LinearGradient>

			<ImageModal
				imageModal={imageModal}
				imageModalHandler={setImageModal}
				roomImage={true}
				setRoomUri={setRoomUri}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	gradient2: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		right: -10,
	},
});

export default SelectImage;
