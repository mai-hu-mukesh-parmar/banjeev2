import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
	ScrollView,
	TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { Video, Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Radio, Text } from "native-base";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";

import AppBorderButton from "../../../../constants/components/ui-component/AppBorderButton";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import color from "../../../../constants/env/color";
import { useDispatch, useSelector } from "react-redux";
import {
	returnSource,
	uploadToCloudinaryFunc,
} from "../../../../utils/util-func/uploadToImage";
import {
	createFeedData,
	removeFeedData,
} from "../../../../redux/store/action/createFeedAction";
import { postFeed } from "../../../../helper/services/PostFeed";
import { showToast } from "../../../../redux/store/action/toastAction";

function CreateFeed(props) {
	const { navigate } = useNavigation();
	const { params } = useRoute();

	const dispatch = useDispatch();
	// const [text, setText] = useState("");
	// const [connection, setConnection] = useState("PUBLIC");
	const { text, connection } = useSelector((state) => state.createdFeedData);

	const [play, setPlay] = useState("");
	const [disable, setDisable] = useState(false);

	const [uploadContentData, setUploadContentData] = useState([]);

	const [apploading, setApploading] = useState(false);

	const {
		id,
		origin: { x, y },
	} = useSelector((state) => state.registry);

	console.warn(text, connection, "testing");

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
		});
		if (!result.cancelled) {
			let data = await uploadToCloudinary(
				returnSource(result),
				"image",
				"feed_image"
			);
			if (data) {
				setUploadContentData((prev) => [...prev, data]);
			}
		}
	};

	const cameraPickImg = async () => {
		let result = await ImagePicker.launchCameraAsync({ base64: false });
		if (!result.cancelled) {
			let data = await uploadToCloudinary(
				returnSource(result),
				"image",
				"feed_image"
			);
			if (data) {
				console.log(data);
				setUploadContentData((prev) => [...prev, data]);
			}
		}
	};

	const uploadVideo = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: true,
		});

		if (!result.cancelled) {
			let data = await uploadToCloudinary(
				returnSource(result),
				"video",
				"feed_video"
			);
			if (data) {
				setUploadContentData((prev) => [...prev, data]);
			}
		}
	};

	const uploadAudio = async () => {
		let media = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
		const source = {
			name: media.name,
			type: media.mimeType,
			uri: media.uri,
		};
		const data = await uploadToCloudinary(source, "auto", "feed_audio");
		if (data) {
			// console.log(data);
			setUploadContentData((prev) => [...prev, data]);
		}
	};

	const xdata = [
		{
			title: "Upload image from gallery",
			icon: require("../../../../../assets/EditDrawerIcon/icons_gallery.png"),
			onPress: () => pickImage(),
		},
		{
			title: "Capture",
			icon: require("../../../../../assets/EditDrawerIcon/ic_camera.png"),
			onPress: () => cameraPickImg(),
		},
		{
			title: "Upload Video",
			icon: require("../../../../../assets/EditDrawerIcon/icons_gallery.png"),
			onPress: () => uploadVideo(),
		},
		{
			title: "Upload Audio",
			icon: require("../../../../../assets/EditDrawerIcon/icons_gallery.png"),
			onPress: () => uploadAudio(),
		},
		{
			title: "Tag Location",
			icon: require("../../../../../assets/EditDrawerIcon/ic_location.png"),
			onPress: () => navigate("SearchLocation"),
		},
	];

	const reset_Post = () => {
		dispatch(removeFeedData());
		dispatch(createFeedData({ connection: "PUBLIC" }));

		setUploadContentData([]);
	};

	function bytesToSize(bytes) {
		var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		if (bytes == 0) return "0 Byte";
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		console.warn(
			"size in mb,kb",
			Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
		);
		return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
	}
	const uploadToCloudinary = async (source, mime, mediaAssets) => {
		setApploading(true);
		console.log("uploadToCloudinary called");
		try {
			setApploading(false);
			const d = await uploadToCloudinaryFunc(source, mime, mediaAssets);
			const newD = await d.json();
			const result = await newD;
			console.log("result", result);

			bytesToSize(result.bytes);

			const {
				format,
				resource_type,
				public_id,
				url,
				original_filename,
				version,
			} = result;

			return {
				aspectRatio: "",
				base64Content: null,
				caption: id,
				description: url,
				height: 0,
				length: 0,
				mimeType: `${
					mediaAssets === "feed_audio" ? "audio" : resource_type
				}/${format}`,
				sequenceNumber: 0,
				sizeInBytes: 0,
				src: public_id,
				subTitle: version,
				title: `${original_filename}.${format}`,
				type: "",
				width: 0,
				resource_type,
			};
		} catch (err) {
			setApploading(false);

			dispatch(
				showToast({
					open: true,
					description: "size of video is too large",
				})
			);

			console.log(
				"--------- Catch Error --------->>",
				JSON.parse(JSON.stringify(err))
			);
		}
	};

	const submitPost = () => {
		console.warn("---------->", uploadContentData);
		if (uploadContentData.length <= 5) {
			let payload = {
				geoLocation: {
					x: x,
					y: y,
				},
				mediaContent: uploadContentData,
				text: text ? text : null,
				visibility: connection,
			};
			uploadContentData.length > 0 || text.length > 0
				? (setDisable(true),
				  postFeed(payload)
						.then((res) => {
							setDisable(false);
							console.log(JSON.stringify(res, null, 2));
							navigate("Feed");
						})
						.catch((err) => {
							console.warn(err);
						}))
				: dispatch(
						showToast({
							open: true,
							description: "add some comment or select any media",
						})
				  );
		} else {
			dispatch(
				showToast({ open: true, description: "You can upload maximum 5 post " })
			);
		}
	};

	const renderMedia = (ele) => {
		switch (ele.resource_type) {
			case "image":
				return (
					<Image style={styles.postImg} source={{ uri: ele.description }} />
				);
			case "video":
				return (
					<Video
						source={{
							uri: ele.description,
						}}
						style={styles.postImg}
						useNativeControls
					/>
				);
			case "audio":
				return (
					<View
						style={[styles.postImg, { backgroundColor: "black" }]}
						source={{ uri: ele.description }}
					>
						<AppFabButton
							onPress={() => {
								if (play) {
									setPlay(null);
								} else {
									setPlay(ele);
								}
							}}
							icon={
								play ? (
									<AntDesign name="playcircleo" size={24} color="white" />
								) : (
									<AntDesign name="pause" size={24} color="white" />
								)
							}
						/>
					</View>
				);
			default:
				break;
		}
	};

	return (
		<View style={styles.container}>
			<View style={{ width: "95%", alignSelf: "center" }}>
				<View style={{ marginTop: 20 }}>
					<TextInput
						height={156}
						value={text}
						onChangeText={(e) => dispatch(createFeedData({ text: e }))}
						style={styles.tb}
						placeholder={"Write your feedback title...."}
						multiline={true}
						textAlignVertical={"top"}
					/>
				</View>
				<View
					style={{
						marginTop: 20,
						borderTopColor: color.line,
						borderTopWidth: 1,
					}}
				>
					{xdata?.map((item, i) => (
						<TouchableWithoutFeedback key={i} onPress={() => item.onPress()}>
							<View style={styles.postView}>
								<Image source={item.icon} style={styles.smallImg} />
								<Text
									style={{ color: color.primary }}
									onPress={() => item.onPress()}
								>
									{item.title === "Tag Location"
										? params?.locData
											? params.locData?.formatted_address
											: item.title
										: item.title}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					))}
				</View>

				<View
					style={{
						width: "100%",
						borderBottomColor: color.line,
						borderBottomWidth: 1,
						justifyContent: "center",
						height: 48,
					}}
				>
					<Radio.Group
						defaultValue={connection}
						onChange={(value) => {
							dispatch(createFeedData({ connection: value }));
						}}
					>
						<View style={styles.radio}>
							<Radio value="CONNECTIONS">CONNECTIONS</Radio>
							<Radio value="PUBLIC">PUBLIC</Radio>
						</View>
					</Radio.Group>
				</View>

				{/* ```````````````````````````` IMAGES */}

				<ScrollView horizontal={true}>
					{uploadContentData.length > 0 && (
						<View style={styles.postImgView}>
							{uploadContentData
								?.map((ele, i) => {
									return (
										<View key={i} style={{ position: "relative" }}>
											<View style={styles.mapView}>
												<AppFabButton
													onPress={() => {
														setUploadContentData((prev) =>
															prev.filter((el) => el.src !== ele?.src)
														);
													}}
													size={15}
													icon={<Entypo size={20} name="cross" color="white" />}
												/>
											</View>

											{ele.mimeType === "audio/mp3" ? (
												<Image
													style={styles.postImg}
													source={require("../../../../../assets/EditDrawerIcon/mp3.png")}
												/>
											) : (
												<Image
													style={styles.postImg}
													source={{ uri: ele?.description }}
												/>
											)}
										</View>
									);
								})
								.reverse()}
						</View>
					)}
				</ScrollView>

				{/* ``````````````````````````````` SUBMIT BUTTONS */}

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 24,
						// marginTop: 24,
						width: 256,
						alignSelf: "center",
					}}
				>
					<AppButton
						disabled={disable}
						title={"Post now"}
						onPress={() => submitPost()}
						style={{ width: 120 }}
					/>
					<AppBorderButton
						title={"Reset"}
						onPress={() => reset_Post()}
						width={120}
					/>
				</View>
			</View>
			{apploading && <AppLoading visible={apploading} />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	tb: {
		padding: 15,
		lineHeight: 21,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: color.line,
	},
	postImgView: {
		height: 100,
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		flexDirection: "row",
		paddingLeft: "5%",
		marginTop: 24,
	},
	mapView: {
		zIndex: 1,
		position: "absolute",
		right: 7,
		height: 20,
	},
	postImg: {
		marginRight: 10,
		height: 80,
		width: 80,
		borderRadius: 8,
	},
	radio: {
		flexDirection: "row",
		width: "60%",
		justifyContent: "space-between",
	},
	postView: {
		height: 48,
		flexDirection: "row",
		width: "100%",
		borderBottomColor: color.line,
		borderBottomWidth: 1,
		alignItems: "center",
	},
	smallImg: { height: 24, width: 24, marginRight: 16 },
});

export default CreateFeed;
