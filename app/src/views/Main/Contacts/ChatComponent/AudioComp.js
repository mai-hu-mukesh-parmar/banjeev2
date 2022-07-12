import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import React from "react";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "native-base";

import { destructChat } from "../../../../helper/services/ChatService";

export default function AudioComp({
	messId,
	isSender,
	mediaPlayer: play,
	setMediaPlayer: setPlay,
	src,
	selfDestructive: { selfDestructive, destructiveAgeInSeconds },
}) {
	const countRef = React.useRef(null);

	const [timer, setTimer] = React.useState(destructiveAgeInSeconds);
	const [timerStart, setTimerStart] = React.useState(false);

	const destructChatApiCall = React.useCallback(() => {
		destructChat(messId)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.warn(err));
	}, []);

	React.useEffect(() => {
		if (selfDestructive && isSender && timerStart) {
			let myInterval = setInterval(() => {
				if (timer > 0) {
					setTimer(timer - 1);
				}
				if (timer === 26) {
					destructChatApiCall();
				}
				if (timer === 0) {
					console.log("time over");
					clearInterval(myInterval);
				}
			}, 1000);
			return () => {
				clearInterval(myInterval);
			};
		}
	}, [timer, timerStart]);

	return (
		<View
			style={{
				width: 230,
				height: 80,
			}}
		>
			{isSender ? (
				<FastImage
					style={{
						width: 230,
						height: 80,
						position: "absolute",
						// top: 5,
					}}
					resizeMode="contain"
					source={require("../../../../../assets/EditDrawerIcon/audio_sender.png")}
				/>
			) : (
				<FastImage
					style={{
						width: 230,
						height: 80,
						position: "absolute",
						// top: 5,
					}}
					resizeMode="contain"
					source={require("../../../../../assets/EditDrawerIcon/audio_reciver.png")}
				/>
			)}
			{selfDestructive && !isSender && (
				<View
					style={{
						position: "absolute",
						left: 60,
						top: 22,
						shadowOpacity: 0,
					}}
				>
					<FastImage
						source={require("../../../../../assets/EditDrawerIcon/ic_distructive.png")}
						style={{ height: 40, width: 40, shadowOpacity: 0 }}
					/>
				</View>
			)}
			{selfDestructive && isSender && (
				<View
					style={{
						height: 40,
						width: 40,
						backgroundColor: "#FFF",
						position: "absolute",
						top: 8,
						right: 10,
						borderRadius: 50,
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<FastImage
						source={require("../../../../../assets/EditDrawerIcon/oval.png")}
						style={{ height: "100%", width: "100%" }}
					/>
					<Text style={{ position: "absolute" }}>{timer}</Text>
				</View>
			)}
			<View
				style={{
					position: "absolute",
					top: isSender ? 20 : 10,
					left: isSender ? 5 : 4,
					display: "flex",
					flexDirection: "row",
				}}
			>
				<AppFabButton
					size={17}
					style={{
						backgroundColor: "white",
						borderRadius: 50,
						marginTop: 3,
						marginLeft: 3,
						width: 34,
						height: 34,
					}}
					icon={
						<View
							style={{
								borderColor: "black",
								borderWidth: 1,
								borderRadius: 50,
							}}
						>
							<MaterialCommunityIcons
								name={src === play.src && play.play ? "pause" : "play"}
								size={20}
								color={"black"}
							/>
						</View>
					}
					onPress={() => {
						if (selfDestructive && isSender) {
							setTimerStart(true);
						}
						setPlay((prev) => {
							return {
								src: src,
								play: true,
							};
						});
					}}
				/>

				{src === play.src && play.play && (
					<FastImage
						resizeMode="cover"
						source={require("../../../../../assets/Animations/wave.gif")}
						style={{
							opacity: play ? 1 : 0,
							width: 160,
							height: 20,
							marginTop: 9,
							marginLeft: 5,
						}}
					/>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
