import React, { useState } from "react";
import { Video, Audio } from "expo-av";
import { Image, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import usePlayPauseAudio from "../../../utils/hooks/usePlayPauseAudio";
import FeedZoom from "./FeedZoom";
import { cloudinaryFeedUrl } from "../../../utils/util-func/constantExport";
import { Viewport } from "@skele/components";

const ViewportAwareImage = Viewport.Aware(View);

function ContentViewer({ mimeType, src }) {
	const { icons, playAudio, stopPlayer } = usePlayPauseAudio(src, false);
	const videoRef = React.useRef(null);
	const { addListener } = useNavigation();

	const unsubscribe = addListener("blur", async (e) => {
		// e.preventDefault();
		await videoRef?.current?.stopAsync();
		await stopPlayer();
	});
	React.useEffect(() => {
		if (mimeType === "video/mp4") {
			videoRef?.current?.playAsync();
		} else if (mimeType === "audio/mp3") {
			playAudio();
		}
		return () => {
			unsubscribe();
		};
	}, [stopPlayer, unsubscribe]);

	const renderComp = () => {
		if (mimeType && src) {
			switch (mimeType) {
				case "video/mp4":
					return (
						<Video
							ref={videoRef}
							source={{ uri: cloudinaryFeedUrl(src, "video") }}
							resizeMode="contain"
							useNativeControls={true}
							style={{
								width: "100%",
								aspectRatio: 1,
							}}
							onError={(err) => {
								console.log(err);
							}}
						/>
					);
				case "audio/mp3":
					return (
						<View
							style={{
								height: 364,
								width: "100%",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								flex: 1,
							}}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									position: "relative",
									height: 60,
								}}
							>
								<Image
									style={{ width: "100%", borderRadius: 4, height: "100%" }}
									source={require("../../../../assets/EditDrawerIcon/feedAudioBg.png")}
								/>
								<View
									style={{
										position: "absolute",
										display: "flex",
										flexDirection: "row",
										height: 60,
										width: "100%",
										padding: 8,
									}}
								>
									<TouchableOpacity
										onPress={() => playAudio(src, "feed_audio")}
									>
										<View
											style={{
												marginRight: 10,
												width: 44,
												height: 44,
												display: "flex",
												flexDirection: "row",
												justifyContent: "center",
												alignItems: "center",
												backgroundColor: "#FFF",
												borderRadius: 50,
											}}
										>
											<MaterialCommunityIcons name={icons} size={30} />
										</View>
									</TouchableOpacity>
									{icons === "pause" && (
										<Image
											style={{
												height: "80%",
												width: "85%",
												alignSelf: "center",
											}}
											source={require("../../../../assets/Animations/wave.gif")}
										/>
									)}
								</View>
							</View>
						</View>
					);
				case "image/jpg":
					return <FeedZoom imageUri={cloudinaryFeedUrl(src, "image")} />;
			}
		} else return <View />;
	};

	return <View>{renderComp()}</View>;
}

export default ContentViewer;
