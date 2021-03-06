import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import usePlayPauseAudio from "../../../../utils/hooks/usePlayPauseAudio";
import FastImage from "react-native-fast-image";

export default function AudioTypes({ src }) {
	const { icons, playAudio, stopPlayer } = usePlayPauseAudio(src, true);

	useEffect(() => {
		return () => {
			stopPlayer();
		};
	}, [stopPlayer]);

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				position: "relative",
				flex: 1,
				justifyContent: "center",
				width: "95%",
			}}
		>
			<FastImage
				style={{ width: "100%", borderRadius: 4, height: 60 }}
				source={require("../../../../../assets/EditDrawerIcon/feedAudioBg.png")}
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
				<TouchableOpacity onPress={() => playAudio(src, "feed_audio")}>
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
					<FastImage
						style={{
							height: "80%",
							width: "85%",
							alignSelf: "center",
						}}
						source={require("../../../../../assets/Animations/wave.gif")}
					/>
				)}
			</View>
		</View>
	);
}
