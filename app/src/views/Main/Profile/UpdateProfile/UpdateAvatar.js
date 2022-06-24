import { View, StyleSheet, Image } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import { updateUser } from "../../../../helper/services/SettingService";
import { useDispatch, useSelector } from "react-redux";
import { saveUserRegistry } from "../../../../redux/store/action/useActions";
import { Text } from "native-base";
import color from "../../../../constants/env/color";
import { getLocalStorage } from "../../../../utils/Cache/TempStorage";

export default function UpdateAvatar({ navigation, route }) {
	const userData = useSelector((state) => state.registry);
	const dispatch = useDispatch();
	const [done, setDone] = React.useState(false);
	const [visible, setVisible] = React.useState(false);
	const [galleryImg, setGalleryImg] = React.useState();
	const [userImg, setUserImg] = React.useState(route.params);

	const openAvatarGallery = () => {
		return navigation.navigate("PickAvatar");
	};

	const openGallery = async () => {
		setUserImg(null);
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 0.4,
		});
		if (!result.cancelled) {
			setGalleryImg(result);
		}
	};

	const getBlobFroUri = async (uri) => {
		console.log(uri);
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});

		return blob;
	};
	function updateGalleryImage() {
		console.log(galleryImg?.uri);
		getBlobFroUri(galleryImg?.uri)
			.then(async (res) => {
				delete res._data.__collector;
				delete res._data.blobId;
				console.log(JSON.stringify(res._data));

				const url =
					"https://gateway.banjee.org/services/media-service/api/resources/bulk";
				let formData = new FormData();
				formData.append("directoryId", "root");
				formData.append("domain", "banjee");
				formData.append("actionCode", "ACTION_UPLOAD_RESOURCE");
				formData.append("files", res._data);
				const token = await getLocalStorage("token");
				console.log(JSON.stringify(formData));
				console.log(token);
				axios
					.post(url, formData, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: "Bearer " + token,
						},
					})
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const updateUserImage = (data) => {
		updateUser({ ...userData, avtarUrl: data })
			.then((res) => {
				setVisible(true);
				console.warn(res);
				dispatch(saveUserRegistry(res));
				setUserData(res);
				setVisible(false);
				setDone(true);
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	console.log(galleryImg);

	return (
		<React.Fragment>
			{visible && <AppLoading visible={visible} />}
			<View style={styles.container}>
				<Text style={{ textAlign: "center", marginTop: 30, marginBottom: 30 }}>
					There are some pre-defined Avatar for you. Please pick your favorite
					one from Gallery
				</Text>

				<View
					style={[
						{ borderWidth: 1, borderColor: color.white, overflow: "hidden" },
						styles.shadow,
					]}
				>
					<Image
						style={{ height: 230, width: "100%" }}
						source={
							userImg
								? {
										uri: profileUrl(userImg),
								  }
								: galleryImg?.uri
								? { uri: galleryImg?.uri }
								: userData?.avtarUrl
								? { uri: profileUrl(userData?.avtarUrl) }
								: require("../../../../../assets/EditDrawerIcon/neutral_placeholder.png")
						}
					/>
				</View>

				<Text style={{ marginTop: 20, marginBottom: 20, alignSelf: "center" }}>
					{userData?.name}
				</Text>

				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<AppButton
						onPress={openAvatarGallery}
						style={{ width: 120 }}
						title="Pick Avatar"
					/>
					<AppButton
						onPress={openGallery}
						style={{ width: 120 }}
						title="Pick from Gallery"
					/>
				</View>

				{!done && (galleryImg?.uri || route.params) && (
					<AppButton
						style={{ marginTop: 20 }}
						onPress={() =>
							userImg ? updateUserImage(userImg) : updateGalleryImage()
						}
						title={"Update Avatar"}
					/>
				)}
			</View>
		</React.Fragment>
	);
}
const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "60%",
		alignSelf: "center",
	},
	shadow: {
		elevation: 3,
		shadowColor: "grey",
		shadowRadius: 1,
		shadowOpacity: 0.5,
		shadowOffset: {
			height: 1,
			width: 1,
		},
	},
});
