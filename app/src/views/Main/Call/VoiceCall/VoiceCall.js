import {
	useNavigation,
	useRoute,
	StackActions,
} from "@react-navigation/native";
import React, {
	useEffect,
	useContext,
	useCallback,
	Fragment,
	useState,
} from "react";
import {
	View,
	StyleSheet,
	Image,
	ImageBackground,
	TouchableWithoutFeedback,
} from "react-native";
import { Text } from "native-base";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import OverlayDrawer from "../../../../constants/components/ui-component/OverlayDrawer";
import AppButton from "../../../../constants/components/ui-component/AppButton";

import {
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	mediaDevices,
} from "react-native-webrtc";
import InCallManager from "react-native-incall-manager";

import io from "socket.io-client";
import { LogBox } from "react-native";
import { useSelector } from "react-redux";
LogBox.ignoreLogs(["Setting a timer"]);

const urls = [
	"stun:bn-turn1.xirsys.com",
	"turn:bn-turn1.xirsys.com:3478?transport=udp",
	"turn:bn-turn1.xirsys.com:80?transport=udp",
	"turn:bn-turn1.xirsys.com:3478?transport=tcp",
	"turn:bn-turn1.xirsys.com:80?transport=tcp",
	"turns:bn-turn1.xirsys.com:443?transport=tcp",
	"turns:bn-turn1.xirsys.com:5349?transport=tcp",
];

const configuration = {
	iceServers: [
		{ urls: ["stun:bn-turn1.xirsys.com"] },
		...urls.map((ele) => ({
			url: ele,
			username:
				"OcBSZfFTJleQqUKJOKh-6y7vHJDso4yFIIGiUPzgX4GqPTMsZYPKJ-DzMMrhHXy4AAAAAGE_QvxoaXJlbnBhdGVsaHM=",
			credential: "8a7046e8-148d-11ec-9808-0242ac140004",
		})),
	],
};
// {
//   "addToCall": false,
//   "answer": null,
//   "callDuration": "00",
//   "callType": "Voice",
//   "eventType": "JOIN",
//   "fromUserId": "619cd4fc3fb9cb741a6d7d8f",
//   "groupCreatorId": null,
//   "groupMemberCounts": 0,
//   "groupName": null,
//   "iceCandidate": null,
//   "initiator": Object {
//     "authorities": Array [
//       "ROLE_CUSTOMER",
//     ],
//     "avtarImageUrl": "6253dc1f4d2f4a7e3ae902d2",
//     "domain": "208991",
//     "domainSsid": "208991",
//     "email": "vicky@gmail.com",
//     "externalReferenceId": "619cd4fc6a2ea70e3f4335a2",
//     "firstName": "vicky",
//     "id": "619cd4fc3fb9cb741a6d7d8f",
//     "lastName": null,
//     "locale": "eng",
//     "mcc": "+267",
//     "mobile": "323232",
//     "profileImageUrl": null,
//     "realm": "banjee",
//     "timeZoneId": "GMT",
//     "type": "CUSTOMER",
//     "userName": "vicky",
//     "userType": 0,
//   },
//   "mediaStream": null,
//   "offer": null,
//   "responseMessage": "Room Joined",
//   "roomId": "624eb3968e48941c7ff66618",
//   "targetUser": Object {
//     "authorities": null,
//     "avtarImageUrl": "6254386e4d2f4a7e3ae902e4",
//     "domain": null,
//     "domainSsid": null,
//     "email": null,
//     "externalReferenceId": null,
//     "firstName": "pintudi",
//     "id": "624d1a5251d8313090ec9fea",
//     "lastName": null,
//     "locale": null,
//     "mcc": null,
//     "mobile": null,
//     "profileImageUrl": null,
//     "realm": null,
//     "timeZoneId": null,
//     "type": null,
//     "userName": null,
//     "userType": 0,
//   },
//   "toAvatarSrc": null,
//   "toUserId": "624d1a5251d8313090ec9fea",
// }

function VoiceCall(props) {
	const { params } = useRoute();
	const { canGoBack, dispatch } = useNavigation();
	const { pop } = StackActions;
	const [user] = React.useState(params);
	const [audio, setAudio] = React.useState(false);
	const [video, setVideo] = React.useState(false);
	const [speaker, setSpeaker] = React.useState(false);
	const [timer, setTimer] = React.useState(0);
	const countRef = React.useRef(null);

	const [isReceiver, setIsReciver] = useState(false);
	const [pc] = React.useState(new RTCPeerConnection(configuration));
	const { systemUserId, currentUser, avtarUrl } = useSelector(
		(state) => state.registry
	);
	const [socket] = useState(
		io
			.connect("wss://message.banjee.org/", {
				upgrade: false,
				transports: ["websocket"],
				origins: "*",
				forceNew: true,
				reconnection: true,
				reconnectionDelay: 200,
				reconnectionDelayMax: 500,
				reconnectionAttempts: Infinity,
			})
			.connect()
	);

	const [userStream, setUserStream] = React.useState(null);
	const [myStream, setMyStream] = React.useState(null);

	const formatTime = () => {
		const getSeconds = `0${timer % 60}`.slice(-2);
		const minutes = `${Math.floor(timer / 60)}`;
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

		return `${getHours} : ${getMinutes} : ${getSeconds}`;
	};

	React.useEffect(() => {
		if (userStream) {
			countRef.current = setInterval(() => {
				setTimer((timer) => timer + 1);
			}, 1000);
		}
	}, [countRef]);

	const icecandidateHandler = React.useCallback(
		(data) => {
			const { candidate } = data;
			console.log("Getting icecandidate", candidate);

			const iceCandidate = {
				sdpMid: candidate?.sdpMid,
				sdp: candidate?.candidate,
				sdpMLineIndex: candidate?.sdpMLineIndex,
			};

			socket.emit("SIGNALLING_SERVER", {
				roomId: params.roomId,
				fromUserId: systemUserId,
				initiator: {
					...currentUser,
					avtarImageUrl: avtarUrl,
					firstName: currentUser.userName,
				},
				targetUser: params.targetUser,
				toUserId: params.targetUser.id,
				eventType: "ICE_CANDIDATE",
				iceCandidate: iceCandidate,
				offer: null,
				answer: null,
				mediaStream: null,
				responseMessage: "Room Joined",
				callDuration: "00",
				callType: "Voice",
				groupName: null,
				toAvatarSrc: null,
				groupMemberCounts: 0,
				groupCreatorId: null,
				addToCall: false,
			});
		},
		[socket, params]
	);

	const streamHandler = React.useCallback(
		(params) => {
			console.log("Getting Streams");
			pc.addStream(params.stream);
			setUserStream(params.stream);
		},
		[pc]
	);

	const sendReady = useCallback(() => {
		socket.emit("SIGNALLING_SERVER", {
			roomId: params.roomId,
			toUserId: params.initiator.id,
			targetUser: params.initiator,
			initiator: params.targetUser,
			fromUserId: params.targetUser.id,
			eventType: "READY",
			iceCandidate: null,
			offer: null,
			answer: null,
			mediaStream: null,
			responseMessage: "Room Joined",
			callDuration: "00",
			callType: "Voice",
			groupName: null,
			toAvatarSrc: null,
			groupMemberCounts: 0,
			groupCreatorId: null,
			addToCall: false,
		});
	}, [socket, params]);

	const addMediaSteam = React.useCallback(() => {
		let isFront = true;
		mediaDevices.enumerateDevices().then((sourceInfos) => {
			let videoSourceId;
			for (let i = 0; i < sourceInfos.length; i++) {
				const sourceInfo = sourceInfos[i];
				if (
					sourceInfo.kind == "videoinput" &&
					sourceInfo.facing == (isFront ? "front" : "environment")
				) {
					videoSourceId = sourceInfo.deviceId;
				}
			}
			mediaDevices
				.getUserMedia({
					audio: true,
					echoCancellation: true,
					noiseSuppression: true,
					video: {
						mandatory: {
							// minWidth: 480,
							// minHeight: 360,
							minFrameRate: 30,
						},
						facingMode: isFront ? "user" : "environment",
						optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
					},
				})
				.then((stream) => {
					setMyStream(stream);
					pc.addStream(stream);
				})
				.catch((error) => {
					console.log("Media Error ", error);
				});
		});
	}, [pc]);

	const createOffer = useCallback(
		(data) => {
			if (systemUserId === data?.initiator?.id) {
				pc.createOffer({
					offerToReceiveAudio: true,
					offerToReceiveVideo: true,
				})
					.then(async (offer) => {
						console.log("------------------", params.roomId);

						socket.emit("SIGNALLING_SERVER", {
							roomId: params.roomId,
							fromUserId: systemUserId,
							initiator: {
								...currentUser,
								avtarImageUrl: avtarUrl,
								firstName: currentUser.userName,
							},
							targetUser: params.targetUser,
							toUserId: params.targetUser.id,
							eventType: "OFFER",
							iceCandidate: null,
							offer: offer.sdp,
							answer: null,
							mediaStream: null,
							responseMessage: "Room Joined",
							callDuration: "00",
							callType: "Voice",
							groupName: null,
							toAvatarSrc: null,
							groupMemberCounts: 0,
							groupCreatorId: null,
							addToCall: false,
						});
					})
					.catch((err) => {
						console.log("Create Offer ", err);
					});
			}
		},
		[systemUserId, pc, socket, currentUser, avtarUrl, params]
	);

	const createAnswer = useCallback(
		async (data) => {
			if (systemUserId !== data?.initiator?.id) {
				await pc.setRemoteDescription(
					new RTCSessionDescription({ type: "offer", sdp: data.offer })
				);

				pc.createAnswer({
					offerToReceiveAudio: true,
					offerToReceiveVideo: true,
				})
					.then(async (answer) => {
						await pc.setLocalDescription(new RTCSessionDescription(answer));
						socket.emit("SIGNALLING_SERVER", {
							roomId: params.roomId,
							toUserId: systemUserId,
							targetUser: {
								...currentUser,
								avtarImageUrl: avtarUrl,
								firstName: currentUser.userName,
							},
							initiator: params.targetUser,
							fromUserId: params.targetUser.id,
							eventType: "ANSWER",
							iceCandidate: null,
							offer: null,
							answer: answer.sdp,
							mediaStream: null,
							responseMessage: "Room Joined",
							callDuration: "00",
							callType: "Voice",
							groupName: null,
							toAvatarSrc: null,
							groupMemberCounts: 0,
							groupCreatorId: null,
							addToCall: false,
						});
					})
					.catch((err) => {
						console.log("Create Offer ", err);
					});
			} else {
				await pc.setLocalDescription(
					new RTCSessionDescription({ type: "offer", sdp: data.offer })
				);
			}
		},
		[systemUserId, pc, socket, currentUser, avtarUrl, params]
	);

	const reciveAnswer = useCallback(
		async (data) => {
			if (systemUserId === data?.initiator?.id) {
				await pc.setRemoteDescription(
					new RTCSessionDescription({ type: "answer", sdp: data.answer })
				);
			}
		},
		[systemUserId, pc]
	);

	const iceCandidateEvent = useCallback(
		async (data) => {
			const { iceCandidate } = data;

			if (iceCandidate && Object.keys(iceCandidate).length > 0) {
				try {
					await pc.addIceCandidate(new RTCIceCandidate(iceCandidate));
				} catch (err) {
					console.log("err", err);
				}
			} else {
				sendReady();
			}
		},
		[sendReady, pc]
	);

	useEffect(async () => {
		// await connectSocket(socket, () => {
		addMediaSteam();
		if (systemUserId === params.targetUser.id) {
			sendReady();
		}
		// });
		InCallManager.stopRingtone();
		InCallManager.start({ media: "video" });
		socket.on("READY", (data) => {
			createOffer(data);
		});

		socket.on("OFFER", async (data) => {
			await createAnswer(data);
		});

		socket.on("ANSWER", async (data) => {
			await reciveAnswer(data);
		});

		socket.on("ICE_CANDIDATE", async (data) => {
			await iceCandidateEvent(data);
		});

		socket.on("VIDEO_CALL_REQUEST", (data) => {
			console.log(data);
		});

		socket.on("VIDEO_CALL_REQUEST_ACCEPTED", (data) => {
			console.log(data);
		});
		socket.on("VIDEO_CALL_REQUEST_DECLINED", (data) => {
			console.log(data);
		});
		socket.on("DISCONNECT", async () => {
			// await connectSocket(socket);
			pc.removeStream(userStream);
			pc.close();
			if (canGoBack()) {
				dispatch(pop(2));
			}
		});

		pc.onicecandidate = icecandidateHandler;
		pc.onaddstream = streamHandler;

		return () => {
			InCallManager.stop();
			// pc.removeStream(userStream);
			// pc.close();
		};
	}, [
		socket,
		sendReady,
		addMediaSteam,
		createOffer,
		icecandidateHandler,
		streamHandler,
		pc,
	]);

	console.log(socket.connected);
	const arr = [
		{
			name: "AUDIO",
			icon: "microphone-off",
			//   icon: audio ? "microphone-off" : "microphone-outline",
			onPress: () => {
				setAudio(!audio);
				myStream.getAudioTracks()[0].enabled =
					!myStream.getAudioTracks()[0].enabled;
			},
			color: !audio ? "white" : "black",
			bg: !audio ? "transparent" : "white",
		},
		{
			name: "SWITCH TO VIDEO",
			//   icon: video ? "video-off-outline" : "video-outline",
			icon: "video-outline",
			onPress: () => {
				socket.emit("VIDEO_CALL_REQUEST", {
					...params,
					initiator: params.targetUser,
					toUserId: params.fromUserId,
					fromUserId: params.toUserId,
					targetUser: params.initiator,
					eventType: "VIDEO_CALL_REQUEST",
					iceCandidate: null,
					offer: null,
					answer: null,
					mediaStream: null,
					responseMessage: "VIDEO_CALL_REQUEST successful",
					callDuration: "00",
					callType: "Voice",
					groupName: null,
					toAvatarSrc: null,
					groupMemberCounts: 0,
					groupCreatorId: null,
					addToCall: false,
					eventType: "VIDEO_CALL_REQUEST",
				});
				setVideo(!video);
			},
			color: !video ? "white" : "black",
			bg: !video ? "transparent" : "white",
		},
		{
			name: "SPEAKER",
			icon: "volume-high",
			onPress: () => setSpeaker(!speaker),
			color: !speaker ? "white" : "black",
			bg: !speaker ? "transparent" : "white",
		},
	];
	useEffect(() => {
		InCallManager.setForceSpeakerphoneOn(speaker);
	}, [speaker]);
	return (
		// <View style={styles.container}>
		<Fragment>
			{userStream ? (
				<LinearGradient
					start={{ x: 1, y: 1 }}
					end={{ x: 0, y: 0 }}
					colors={["#e6252024", "#252024"]}
					style={styles.gradient}
				>
					<Image
						source={{
							uri: profileUrl(
								systemUserId === params.initiator.id
									? user?.targetUser?.avtarImageUrl
									: user?.initiator?.avtarImageUrl
							),
						}}
						style={styles.profileImg}
					/>

					<Text style={styles.name}>
						{systemUserId === params.initiator.id
							? user?.targetUser?.firstName
							: user?.initiator?.firstName}
					</Text>

					<View style={styles.iconView}>
						{arr.map((ele, i) => (
							<View key={i}>
								<View style={{ flexDirection: "column", alignItems: "center" }}>
									<View
										style={[styles.iconActive, { backgroundColor: ele.bg }]}
									>
										<AppFabButton
											onPress={() => ele.onPress()}
											icon={
												<MaterialCommunityIcons
													name={ele.icon}
													size={18}
													color={ele.color}
												/>
											}
										/>
									</View>
									<Text style={styles.iconName}>{ele.name}</Text>
								</View>
							</View>
						))}
					</View>

					{/* ````````````````````` CALL END ````````````````````` */}

					{countRef && (
						<Text
							style={{ alignSelf: "center", position: "absolute", bottom: 120 }}
						>
							{timer ? formatTime() : "00:00:00"}
						</Text>
					)}
					<TouchableWithoutFeedback
						onPress={async () => {
							socket.emit("SIGNALLING_SERVER", {
								roomId: params.roomId,
								fromUserId: systemUserId,
								initiator: {
									...currentUser,
									avtarImageUrl: avtarUrl,
									firstName: currentUser.userName,
								},
								targetUser: params.targetUser,
								toUserId: params.targetUser.id,
								eventType: "DISCONNECT",
								iceCandidate: null,
								offer: null,
								answer: null,
								mediaStream: null,
								responseMessage: "Room Joined",
								callDuration: timer,
								callType: "Voice",
								groupName: null,
								toAvatarSrc: null,
								groupMemberCounts: 0,
								groupCreatorId: null,
								addToCall: false,
							});
							// await connectSocket(socket);
							pc.removeStream(userStream);
							pc.close();
							if (canGoBack()) {
								dispatch(pop(2));
							}
						}}
					>
						<View
							style={[styles.callBackground, { backgroundColor: "#f8394f" }]}
						>
							<Image
								source={require("../../../../../assets/EditDrawerIcon/ic_call.png")}
								style={[styles.callImg, { transform: [{ rotate: "130deg" }] }]}
							/>
						</View>
					</TouchableWithoutFeedback>
					{/* </View> */}

					{video && (
						<OverlayDrawer
							transparent
							visible={video}
							onClose={() => {
								setVideo(!video);
							}}
							closeOnTouchOutside
							animationType="fadeIn"
							containerStyle={{
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								//   padding: 0,
								height: "100%",
								width: "100%",
							}}
							childrenWrapperStyle={{
								// height: "0%",
								borderRadius: 4,
								paddingVertical: 30,
								paddingHorizontal: 50,
								backgroundColor: "white",
								alignSelf: "center",
							}}
							animationDuration={100}
						>
							{(hideModal) => (
								<View>
									<Text
										style={{
											alignSelf: "center",
											textAlign: "center",
											width: "80%",
											fontWeight: "bold",
											marginBottom: 20,
										}}
									>
										Requesting to switch to video call
									</Text>
									<AppButton
										onPress={() => {
											setVideo(!video);
										}}
										style={{ width: 110, alignSelf: "center" }}
										title={"Cancel"}
									/>
								</View>
							)}
						</OverlayDrawer>
					)}
				</LinearGradient>
			) : (
				<ImageBackground
					resizeMode="cover"
					source={{ uri: profileUrl(params?.initiator?.avtarImageUrl) }}
					blurRadius={2}
					style={{ height: "100%", width: "100%" }}
				>
					<View style={styles.subView}>
						<View>
							<Text style={styles.name}>
								{params?.initiator?.userName
									? params?.initiator?.userName
									: params?.initiator?.firstName}
							</Text>

							<Text style={styles.subText}>Ringing....</Text>
						</View>

						<AppFabButton
							style={{ borderRadius: 50, zIndex: 1, backgroundColor: "red" }}
							onPress={async () => {
								socket.emit("SIGNALLING_SERVER", {
									roomId: params.roomId,
									fromUserId: systemUserId,
									initiator: {
										...currentUser,
										avtarImageUrl: avtarUrl,
										firstName: currentUser.userName,
									},
									targetUser: params.targetUser,
									toUserId: params.targetUser.id,
									eventType: "DISCONNECT",
									iceCandidate: null,
									offer: null,
									answer: null,
									mediaStream: null,
									responseMessage: "Room Joined",
									callDuration: timer,
									callType: "Voice",
									groupName: null,
									toAvatarSrc: null,
									groupMemberCounts: 0,
									groupCreatorId: null,
									addToCall: false,
								});
								// await connectSocket(socket);
							}}
							icon={
								<Image
									source={require("../../../../../assets/EditDrawerIcon/ic_call.png")}
									style={[
										styles.callImg,
										{ transform: [{ rotate: "130deg" }] },
									]}
								/>
							}
						/>
					</View>
				</ImageBackground>
			)}
			<OverlayDrawer
				transparent
				visible={isReceiver}
				onClose={() => {
					setIsReciver(!isReceiver);
				}}
				closeOnTouchOutside
				animationType="fadeIn"
				containerStyle={{
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					//   padding: 0,
					height: "100%",
					width: "100%",
				}}
				childrenWrapperStyle={{
					// height: "0%",
					borderRadius: 4,
					paddingVertical: 30,
					paddingHorizontal: 50,
					backgroundColor: "white",
					alignSelf: "center",
				}}
				animationDuration={100}
			>
				{() => (
					<View>
						<Text
							style={{
								alignSelf: "center",
								textAlign: "center",
								width: "80%",
								fontWeight: "bold",
								marginBottom: 20,
							}}
						>
							{params?.initiator?.firstName} is requesting to switch to video
							call
						</Text>
						<View>
							<AppButton
								onPress={() => {
									socket.emit("SIGNALLING_SERVER", {
										...params,
										fromUserId: params?.targetUser?.id,
										toUserId: params?.initiator?.id,
										targetUser: params?.initiator,
										initiator: params?.targetUser,
										eventType: "VIDEO_CALL_REQUEST_ACCEPTED",
									});
								}}
								style={{ width: 110, alignSelf: "center" }}
								title={"Accept"}
							/>
							<AppButton
								onPress={() => {
									socket.emit("SIGNALLING_SERVER", {
										...params,
										fromUserId: params?.targetUser?.id,
										toUserId: params?.initiator?.id,
										targetUser: params?.initiator,
										initiator: params?.targetUser,
										eventType: "VIDEO_CALL_REQUEST_DECLINED",
									});
								}}
								style={{ width: 110, alignSelf: "center" }}
								title={"Decline"}
							/>
						</View>
					</View>
				)}
			</OverlayDrawer>
		</Fragment>
	);
}

const styles = StyleSheet.create({
	gradient: {
		height: "100%",
		width: "100%",
		zIndex: -1,
	},
	container: { backgroundColor: "#252024", flex: 1 },
	profileImg: {
		height: 150,
		width: 150,
		borderRadius: 75,
		alignSelf: "center",
		marginTop: 110,
		borderWidth: 1,
		borderColor: "white",
	},
	iconView: {
		marginTop: 150,
		flexDirection: "row",
		alignSelf: "center",
		width: "70%",
		justifyContent: "space-between",
	},
	iconActive: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	name: {
		marginTop: 10,
		fontSize: 24,
		fontWeight: "500",
		alignSelf: "center",
		color: "white",
	},
	iconName: {
		fontSize: 12,
		color: "white",
		alignSelf: "center",
		marginTop: 10,
	},
	callBackground: {
		position: "absolute",
		bottom: 50,
		alignSelf: "center",
		height: 50,
		width: 50,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	callImg: { height: 24, width: 24 },
	buttonsContainer: {
		flexDirection: "row",
	},
	button: {
		margin: 5,
		paddingVertical: 10,
		backgroundColor: "lightgrey",
		borderRadius: 5,
	},
	textContent: {
		fontFamily: "Avenir",
		fontSize: 20,
		textAlign: "center",
	},
	videosContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
	rtcView: {
		width: 100, //dimensions.width,
		height: 200, //dimensions.height / 2,
		backgroundColor: "black",
	},
	scrollView: {
		flex: 1,
		// flexDirection: 'row',
		backgroundColor: "teal",
		padding: 15,
	},
	rtcViewRemote: {
		width: "100%",
		zIndex: 0,
		height: "100%", //dimensions.height / 2,
		// backgroundColor: "black",
	},
	subView: {
		display: "flex",
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 50,
		marginBottom: 30,
	},
	subText: {
		fontSize: 16,
		alignSelf: "center",
		color: "white",
		marginTop: 10,
	},
	reciveCall: {
		flexDirection: "row",
		alignSelf: "center",
		justifyContent: "center",
		position: "absolute",
		bottom: 30,
	},
});

export default VoiceCall;
