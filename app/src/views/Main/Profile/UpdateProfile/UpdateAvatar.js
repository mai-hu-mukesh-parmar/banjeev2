import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import { updateUser } from "../../../../helper/services/SettingService";
import { useDispatch, useSelector } from "react-redux";
import { saveUserRegistry } from "../../../../redux/store/action/useActions";
import { Text } from "native-base";
import color from "../../../../constants/env/color";
import { getLocalStorage } from "../../../../utils/Cache/TempStorage";
import { returnSource } from "../../../../utils/util-func/uploadToImage";

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

	async function updateGalleryImage() {
		setVisible(true);
		// console.log(galleryImg?.uri);
		const token = await getLocalStorage("token");
		// console.log(token);
		var myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + JSON.parse(token));
		myHeaders.append("Content-Type", "multipart/form-data");

		var formdata = new FormData();
		formdata.append("directoryId", "root");
		formdata.append("domain", "banjee");
		formdata.append("actionCode", "ACTION_UPLOAD_RESOURCE");
		formdata.append("files", returnSource(galleryImg), "[PROXY]");

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		};

		fetch(
			"https://gateway.banjee.org/services/media-service/api/resources/bulk",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				updateUserImage(result.data[0].data.id);
			})
			.catch((error) => {
				setVisible(false);
				console.log("error", error);
			});
	}

	useEffect(() => {
		return () => {
			setVisible(false);
		};
	}, []);

	const updateUserImage = (data) => {
		console.log(userData);
		updateUser({ ...userData, avtarUrl: data }, "PUT")
			.then((res) => {
				setVisible(true);
				dispatch(saveUserRegistry(res));
				setVisible(false);
				setDone(true);
				navigation.navigate("Bottom");
			})
			.catch((err) => {
				setVisible(false);
				console.warn(err);
			});
	};

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
						width={120}
						style={{ width: 120 }}
						title="Pick Avatar"
					/>
					<AppButton
						onPress={openGallery}
						width={120}
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
		width: "70%",
		// width: "60%",
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
