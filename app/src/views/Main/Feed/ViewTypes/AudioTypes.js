import React, { useCallback, useContext, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import usePlayPauseAudio from "../../../../utils/hooks/usePlayPauseAudio";

export default function AudioTypes({ src, caption }) {
	const { icons, playAudio, stopPlayer } = usePlayPauseAudio(src, true);

	return (
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
					<Image
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
