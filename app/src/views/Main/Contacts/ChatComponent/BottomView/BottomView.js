import React from "react";
import {
	View,
	StyleSheet,
	Animated,
	Easing,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import FastImage from "react-native-fast-image";
import AppFabButton from "../../../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import color from "../../../../../constants/env/color";
import { Audio } from "expo-av";
import BottomAudioButton from "./BottomAudioButton";
import * as FileSystem from "expo-file-system";
import OverlayDrawer from "../../../../../constants/components/ui-component/OverlayDrawer";
import ShowImage from "../../../../../constants/components/ShowImage";
import GifComponent from "./GifComponent";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../../../Context/Socket";
import RBSheet from "react-native-raw-bottom-sheet";
import voiceChangerArray from "./voiceChangerArray";
import { Text } from "native-base";

// import BottomSheet from "react-native-bottomsheet-reanimated";
function BottomView({
	setImageModal,
	roomId,
	imageUri,
	setImageUri,
	sendData,
	setLoading,
}) {
	const {
		systemUserId,
		avtarUrl,
		currentUser: { mobile, email, username, userName, firstName },
	} = useSelector((state) => state.registry);
	const socket = useSelector((state) => state.socket);
	const refRBSheet = React.useRef(null);
	const [audio, setAudio] = React.useState("");
	const [audioTime, setAudioTime] = React.useState(0);
	const [icons, setIcons] = React.useState("play");
	const [distMess, setDistMess] = React.useState(false);
	const [player] = React.useState(new Audio.Sound());
	const [open, setOpen] = React.useState(false);
	const sheetRef = React.useRef(null);
	const renderContent = () => (
		<View
			style={{
				backgroundColor: "white",
				padding: 16,
				height: 450,
			}}
		>
			<AppText>Swipe down to close</AppText>
		</View>
	);
	const loadSound = async () => {
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			playsInSilentModeIOS: false,
		});
		let localUri = "";
		localUri = audio;
		player
			.loadAsync(
				{
					uri: localUri,
				},
				Platform.OS === "ios" ? true : false
			)
			.then(async (res) => {
				if (res.isLoaded) {
					await playSoundFunc();
				}
			})
			.catch((err) => {
				console.warn(err);
			});
	};
	const stopPlayer = () => {
		player
			.unloadAsync()
			.then((res) => {
				setIcons("play");
			})
			.catch((err) => {
				console.warn(err);
			});
	};
	const deleteAudio = async () => {
		setAudio("");
		stopPlayer();
	};
	React.useEffect(() => {
		async () => {
			setAudio("");
			setIcons("play");
			stopPlayer();
		};
	}, []);
	//``````````````````````````` Play Effect
	async function playSoundFunc() {
		const result = await player.getStatusAsync();
		if (result.isLoaded) {
			if (result.isPlaying === false) {
				player.playAsync().then((res) => {
					// console.log("Playing res", res);
					setIcons("pause");
					setTimeout(async () => {
						stopPlayer();
					}, res.durationMillis);
				});
			} else {
				stopPlayer();
			}
		}
	}
	async function playAudio() {
		console.log("loading sound");
		const result = await player.getStatusAsync();
		if (!result.isLoaded) {
			await loadSound();
		} else {
			await playSoundFunc();
		}
	}
	const animation = React.useRef(new Animated.Value(0)).current;
	const up = () => {
		Animated.spring(animation, {
			toValue: 1,
			duration: 1200,
			easing: Easing.bounce,
			useNativeDriver: true,
		}).start();
	};
	const down = () => {
		Animated.spring(animation, {
			toValue: 0,
			duration: 800,
			easing: Easing.bounce,
			useNativeDriver: true,
		}).start();
	};
	React.useEffect(() => {
		if (audio) {
			up();
		} else {
			down();
		}
	}, [audio]);
	const sendInChat = React.useCallback(
		(data, fileName, mimeType, selfDestructive) => {
			setLoading(true);
			let content;
			if (mimeType === "image/gif") {
				content = {
					base64Content: null,
					caption: systemUserId,
					height: 0,
					length: 0,
					mediaDesignType: 0,
					mimeType,
					src: data,
					sequenceNumber: 0,
					sizeInBytes: 0,
					title: fileName,
					width: 0,
				};
			} else {
				content = {
					base64Content: data,
					caption: systemUserId,
					height: 0,
					length: 0,
					mediaDesignType: 0,
					mimeType,
					sequenceNumber: 0,
					sizeInBytes: 0,
					title: fileName,
					width: 0,
				};
			}
			const payloadData = {
				canDownload: false,
				content,
				destructiveAgeInSeconds: selfDestructive ? audioTime : null,
				expired: false,
				expiryAgeInHours: 24,
				group: false,
				roomId,
				secret: false,
				selfDestructive: selfDestructive ? selfDestructive : false,
				sender: {
					age: 0,
					avtarImageUrl: avtarUrl,
					domain: "banjee",
					email,
					firstName: userName,
					id: systemUserId,
					mobile,
					username,
				},
				senderId: systemUserId,
			};
			// console.log(
			//    "Message sended",
			//    JSON.stringify({
			//        ...payloadData,
			//        content: { ...payloadData.content, base64Content: null },
			//    })
			// );
			socket.emit("CREATE_CHAT_MESSAGE", payloadData);
		},
		[socket]
	);
	const sendAudio = async (selfDestructive) => {
		console.log("send audio call---=====*&&&");
		stopPlayer();
		const fileName = audio.split("/")[audio.split("/").length - 1];
		let data = await FileSystem.readAsStringAsync(audio, {
			encoding: FileSystem.EncodingType.Base64,
		});
		sendInChat(data, fileName, "audio/mp3", selfDestructive);
		deleteAudio();
	};
	const sendImage = async (hideModal, selfDestructive) => {
		const fileName = imageUri.split("/")[imageUri.split("/").length - 1];
		let data = await FileSystem.readAsStringAsync(imageUri, {
			encoding: FileSystem.EncodingType.Base64,
		});
		sendInChat(data, fileName, "image/jpg", selfDestructive);
		hideModal();
	};
	return (
		<React.Fragment>
			{audio ? (
				<View style={styles.bottomView}>
					<View
						style={{
							flexDirection: "row",
							width: "60%",
							alignItems: "center",
							justifyContent: "space-evenly",
						}}
					>
						<Animated.View
							style={{
								opacity: animation,
								transform: [
									{
										translateY: animation.interpolate({
											inputRange: [0, 1],
											outputRange: [70, 0],
										}),
									},
								],
							}}
						>
							<AppFabButton
								size={22.5}
								style={{
									backgroundColor: "white",
									borderRadius: 50,
									marginTop: 2,
									width: 45,
									elevation: 2,
									height: 45,
								}}
								icon={
									<MaterialCommunityIcons
										name={"delete"}
										size={30}
										color={"#47129E"}
									/>
								}
								onPress={async () => {
									console.log("Delete");
									deleteAudio();
								}}
							/>
						</Animated.View>
						<Animated.View
							style={{
								opacity: animation,
								transform: [
									{
										translateY: animation.interpolate({
											inputRange: [0, 0.5, 1],
											outputRange: [10, 60, 0],
										}),
									},
								],
							}}
						>
							<AppFabButton
								// onPress={async () => {
								//   console.log("Send");
								//   sendAudio(false);
								// }}
								onPress={() => {
									setDistMess(false);
									refRBSheet?.current?.open();
								}}
								size={22.5}
								icon={
									<FastImage
										source={require("../../../../../../assets/EditDrawerIcon/ic_send_message_round.png")}
										style={{ height: 45, width: 45 }}
									/>
								}
							/>
						</Animated.View>
						<Animated.View
							style={{
								opacity: animation,
								transform: [
									{
										translateY: animation.interpolate({
											inputRange: [0, 0.5, 1],
											outputRange: [10, 40, 0],
										}),
									},
								],
							}}
						>
							<AppFabButton
								size={22.5}
								// onPress={async () => {
								//   console.log("Timer Send");
								//   sendAudio(true);
								// }}
								onPress={() => {
									setDistMess(true);
									refRBSheet?.current?.open();
								}}
								icon={
									<FastImage
										source={require("../../../../../../assets/EditDrawerIcon/ic_distructive.png")}
										style={{ height: 45, width: 45 }}
									/>
								}
							/>
						</Animated.View>
					</View>
				</View>
			) : (
				<View style={styles.bottomView}>
					<View style={styles.iconView}>
						<AppFabButton
							size={25}
							onPress={() => {
								setOpen(true);
								sheetRef?.current?.open();
							}}
							icon={
								<MaterialCommunityIcons
									name="file-gif-box"
									size={24}
									color={color.white}
								/>
							}
						/>
						<BottomAudioButton
							setAudioUrl={setAudio}
							setAudioTime={setAudioTime}
						/>
						<AppFabButton
							onPress={() => setImageModal(true)}
							size={25}
							icon={
								<MaterialCommunityIcons
									name="camera-outline"
									size={24}
									color={color.white}
								/>
							}
						/>
					</View>
				</View>
			)}
			<RBSheet
				customStyles={{ container: { borderRadius: 10 } }}
				height={280}
				ref={refRBSheet}
				dragFromTopOnly={true}
				closeOnDragDown={true}
				closeOnPressMask={true}
				draggableIcon
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						padding: 20,
					}}
				>
					{voiceChangerArray.map((ele, index) => (
						<TouchableOpacity
							key={index}
							style={{
								height: 40,
								width: "50%",
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								paddingLeft: 20,
								marginVertical: 2,
							}}
							onPress={() => {
								// if (ele?.value === "none") {
								console.log("Send Audio");
								sendAudio(distMess);
								refRBSheet?.current?.close();
								// }
							}}
						>
							<MaterialCommunityIcons
								name="account-voice"
								size={24}
								color="black"
							/>
							<Text
								onPress={() => {
									// voiceChangerFun(ele.value);
									// setActionState((prev) => ({ ...prev, voice: false }));
									// refRBSheet?.current?.close();
									// if (ele?.value === "none") {
									console.log("Send Audio");
									sendAudio(false);
									refRBSheet?.current?.close();
									// }
								}}
								style={{ marginLeft: 10 }}
							>
								{ele.name}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</RBSheet>
			{imageUri && (
				<OverlayDrawer
					transparent
					visible={Boolean(imageUri)}
					onClose={() => setImageUri(null)}
					closeOnTouchOutside
					animationType="fadeIn"
					containerStyle={{
						backgroundColor: "rgba(238, 238, 255, 0.7)",
						padding: 0,
						height: "100%",
						width: "100%",
					}}
					childrenWrapperStyle={{
						width: "100%",
						padding: 0,
						height: "100%",
					}}
					animationDuration={100}
				>
					{(hideModal) => (
						<ShowImage
							showBtn={true}
							hideModal={() => {
								sendImage(hideModal, false);
							}}
							image={imageUri}
						/>
					)}
				</OverlayDrawer>
			)}
			{open && <GifComponent sendInChat={sendInChat} refRBSheet={sheetRef} />}
		</React.Fragment>
	);
}
const styles = StyleSheet.create({
	bottomView: {
		height: 75,
		backgroundColor: "#303031",
		position: "absolute",
		bottom: 0,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	iconView: {
		flexDirection: "row",
		width: 172,
		justifyContent: "space-between",
		alignItems: "center",
	},
});
export default BottomView;
