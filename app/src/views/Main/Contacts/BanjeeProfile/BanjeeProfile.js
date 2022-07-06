import React from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	ImageBackground,
	Dimensions,
	TouchableWithoutFeedback,
	DevSettings,
	ActivityIndicator,
	Image,
	SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import { getUserRegistryData } from "../../../../helper/services/SplashService";
import usePlayPauseAudio from "../../../../utils/hooks/usePlayPauseAudio";
import { FriendRequest } from "../../../../helper/services/FriendRequest";
import { BlockUser } from "../../../../helper/services/Service";
import { unfriend } from "../../../../helper/services/UnfriendService";
import {
	acceptRequest,
	rejectRequest,
} from "../../../../helper/services/AcceptAndRejectFriendRequest";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import ReportUser from "../../../../constants/components/Cards/ReportUser";
import { Text } from "native-base";
import AppMenu from "../../../../constants/components/ui-component/AppMenu";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import Room from "../../Room/Room";
import ConfirmModal from "../ChatComponent/ConfirmModal";
import FeedScreen from "../../Feed/FeedScreen";
import {
	checkGender,
	listProfileUrl,
} from "../../../../utils/util-func/constantExport";
import BanjeeProfileFriendList from "./BanjeeProfileFriendList";
import {
	getProfile,
	pendingConnection,
	removeProfileData,
} from "../../../../redux/store/action/Profile/userPendingConnection";
import { otherBanjee_service } from "../../../../helper/services/OtherBanjee";
import ProfilePost from "./ProfilePost";

function BanjeeProfile() {
	const { systemUserId, currentUser, voiceIntroSrc, ...userData } = useSelector(
		(state) => state.registry
	);
	const {
		mutualFriend,
		loading,
		pendingId,
		pendingReq,
		showReqestedFriend,
		connectionId,
	} = useSelector((state) => state.viewProfile);
	const [banjee, setBanjee] = React.useState(true);
	const [room, setRoom] = React.useState(false);
	const [post, setPost] = React.useState(false);
	const [reportModal, setReportModal] = React.useState(false);
	const [ourProfile, setOurProfile] = React.useState(null);
	const [load, setLoad] = React.useState(true);
	const [imageError, setImageError] = React.useState("");
	const [unfriendModal, setUnfriendModal] = React.useState(false);
	const [blockModal, setBlockModal] = React.useState(false);
	const [acceptFrndReq, setAcceptFrndReq] = React.useState(false);
	const [rejectFrndReq, setRejectFrndReq] = React.useState(false);
	const dispatch = useDispatch();
	const navigator = [
		{
			label: " Banjees",
			textColor: banjee ? color.black : color.white,
			bg: banjee ? color.white : "transparent",
			onPress: () => {
				setBanjee(true);
				setPost(false);
				setRoom(false);
			},
		},

		{
			label: " Rooms",
			textColor: room ? color.black : color.white,
			bg: room ? color.white : "transparent",
			onPress: () => {
				setBanjee(false);
				setPost(false);
				setRoom(true);
			},
		},
		{
			label: " Posts",
			textColor: post ? color.black : color.white,
			bg: post ? color.white : "transparent",
			onPress: () => {
				setBanjee(false);
				setPost(true);
				setRoom(false);
			},
		},
	];
	const { navigate, goBack } = useNavigation();

	const { profileId } = useSelector((state) => state.viewProfile);

	const getRegistryData = React.useCallback(() => {
		getUserRegistryData(profileId)
			.then((res) => {
				setLoad(false);
				setOurProfile(res);
				console.warn(res);
				// console.log("res", JSON.stringify(res));
			})
			.catch((err) => console.log(err));
	}, [profileId]);

	React.useEffect(() => {
		getRegistryData();
		return () => {
			setLoad(false);
			setOurProfile();
		};
	}, [getRegistryData]);

	const { icons, playAudio } = usePlayPauseAudio(ourProfile?.voiceIntroSrc);

	function pendingConnections() {
		// let x = ourProfile?.pendingConnections.filter((ele) => data?.includes(ele));
		// setPendingFrienReq(x);
		console.warn(pendingConnections);
	}
	const data = [
		{
			label: "Intro",
			onPress: () => playAudio(),
		},
		{
			img: require("../../../../../assets/EditDrawerIcon/ic_video_call_white.png"),
			label: "Video",
			onPress: () => searchBanjee(profileId, "video"),
		},
		{
			img: require("../../../../../assets/EditDrawerIcon/ic_call.png"),
			label: "Call",
			onPress: () => searchBanjee(profileId, "voice"),
		},
		{
			img: require("../../../../../assets/EditDrawerIcon/ic_voice_record.png"),
			label: "Voice",
			onPress: () => searchBanjee(profileId, "chat"),
		},
	];

	const frndReqData = [
		{
			label: "Intro",
			onPress: () => playAudio(),
		},
		{
			img: require("../../../../../assets/EditDrawerIcon/ic_delivered.png"),
			label: "Accept",
			onPress: () => setAcceptFrndReq(true),
			tintColor: "white",
		},
		{
			img: require("../../../../../assets/EditDrawerIcon/wrong.png"),
			label: "Reject",
			onPress: () => setRejectFrndReq(true),
			tintColor: "white",
		},
	];

	const searchBanjee = React.useCallback(
		(userId, type) => {
			otherBanjee_service({
				blocked: "false",
				circleId: null,
				connectedUserId: null,
				fromUserId: systemUserId,
				id: null,
				keyword: null,
				page: 0,
				pageSize: 0,
				toUserId: userId,
				userId: null,
			})
				.then((res) => {
					res.content.map((ele) => {
						let x = {
							age: 0,
							avtarUrl: ele.connectedUser.avtarUrl,
							birthDate: ele.connectedUser.birthDate,
							chatroomId: ele.chatroomId,
							connectedUserOnline: ele.connectedUserOnline,
							email: ele.connectedUser.email,
							firstName: ele.connectedUser.firstName,
							gender: ele.connectedUser.gender,
							id: ele.connectedUser.id,
							mobile: ele.connectedUser.mobile,
							name: null,
							realm: null,
							ssid: null,
							systemUserId: null,
							timeZoneId: null,
							userId: ele.userId,
							userLastSeen: ele.cuserLastSeen,
							username: null,
						};

						switch (type) {
							case "video":
								navigate("MakeVideoCall", { ...x, callType: "Video" });
								break;
							case "voice":
								navigate("MakeVideoCall", { ...x, callType: "Voice" });
								break;
							case "chat":
								navigate("BanjeeUserChatScreen", { item: x });
								break;
						}
					});
				})
				.catch((err) => console.warn(err));
		},
		[systemUserId]
	);

	const saveIntro = async () => {
		// console.log("===============>", userItem);
		const toUser = {
			avtarUrl: ourProfile.avtarUrl,
			domain: "208991",
			email: ourProfile?.user?.email,
			firstName: ourProfile?.user?.firstName,
			id: ourProfile?.systemUserId,
			lastName: ourProfile?.user?.lastName,
			locale: "eng",
			mcc: ourProfile?.user?.mcc,
			mobile: ourProfile?.user?.mobile,
			realm: "banjee",
			ssid: null,
			systemUserId: ourProfile.systemUserId,
			timeZoneId: "GMT",
			username: ourProfile?.name,
		};
		let d = await Location.getCurrentPositionAsync();
		const { latitude, longitude } = d.coords;

		let payload = {
			accepted: null,
			circleId: null,
			content: {
				aspectRatio: null,
				base64Content: null,
				caption: null,
				description: null,
				height: null,
				length: null,
				mediaSource: null,
				mimeType: "audio/mp3",
				sequenceNumber: null,
				sizeInBytes: null,
				src: null,
				subTitle: null,
				tags: null,
				title: "MediaVoice",
				type: null,
				width: null,
			},
			currentLocation: {
				lat: latitude,
				lon: longitude,
			},
			defaultReceiver: toUser.id,
			domain: "banjee",
			fromUser: {
				...currentUser,
				id: systemUserId,
				firstName: currentUser.userName,
			},
			fromUserId: systemUserId,
			message: `from ${currentUser.userName} to ${toUser.firstName}`,
			processedOn: null,
			rejected: null,
			toUser: toUser,
			toUserId: toUser.id,
			voiceIntroSrc,
		};

		// console.log("payload ---> ", JSON.stringify(payload, null, 2));
		delete payload.fromUser.authorities;

		FriendRequest(payload)
			.then(async (res) => {
				let notificationRingtone = require("../../../../../assets/ringtones/sendFriendRequestTone.mp3");

				let { sound } = await Audio.Sound.createAsync(notificationRingtone);
				console.log("playing sound");

				await sound.playAsync();
				console.log("audio played");

				ToastMessage("Friend Request Sent Successfully");
			})
			.catch((err) => {
				console.warn(err);
			});
	};
	const unMutual = [
		{
			label: "Intro",
			onPress: () => playAudio(),
		},
		{
			label:
				pendingId?.filter((ele) => ele === systemUserId).length > 0
					? "Request Sent"
					: "Connect",
			img: require("../../../../../assets/EditDrawerIcon/ic_add_contact.png"),
			tintColor:
				pendingId?.filter((ele) => ele === systemUserId).length > 0
					? "grey"
					: "white",
			borderColor:
				pendingId?.filter((ele) => ele === systemUserId).length > 0
					? "grey"
					: "white",
			onPress:
				pendingId?.filter((ele) => ele === systemUserId).length > 0
					? console.log("hiii")
					: saveIntro,
		},
	];

	const userType = showReqestedFriend
		? frndReqData
		: mutualFriend
		? data
		: unMutual;

	const blockUser = () => {
		BlockUser(ourProfile?.id)
			.then(() => goBack())
			.catch((err) => console.warn(err));
	};
	const unfriendUser = () => {
		unfriend(ourProfile?.id)
			.then(() => {
				goBack();
				friendList();
			})
			.catch((err) => console.log(err));
	};

	const acceptFriendRequest = () => {
		acceptRequest(connectionId)
			.then(() => {
				dispatch(
					getProfile({
						connectionId: undefined,
						showReqestedFriend: false,
						profileId: profileId,
					})
				),
					navigate("BanjeeProfile");
			})
			.catch((err) => console.warn(err));
	};

	const rejectFriendRequest = () => {
		rejectRequest(connectionId)
			.then(() => {
				goBack();
			})
			.catch((err) => console.warn(err));
	};

	return (
		<React.Fragment>
			{/* {loading && <AppLoading visible={loading} />} */}

			{loading && (
				<View
					style={{
						// zIndex: 2,
						height: "100%",
						width: "100%",
						position: "absolute",
						justifyContent: "center",
						backgroundColor: "white",
					}}
				>
					<AppLoading color={color.primary} />
				</View>
			)}

			{reportModal && (
				<ReportUser
					setModalVisible={setReportModal}
					modalVisible={reportModal}
					systemUserId={ourProfile?.systemUserId}
				/>
			)}

			<SafeAreaView style={styles.container}>
				<ScrollView nestedScrollEnable={true} stickyHeaderIndices={[3]}>
					<View style={styles.header}>
						<Text
							style={{ marginLeft: 10, color: color.white, fontWeight: "500" }}
						>
							{ourProfile?.name}
						</Text>
					</View>
					<Image
						onError={({ nativeEvent: { error } }) => setImageError(error)}
						source={
							// imageError

							// 	? checkGender(ourProfile?.gender)
							// 	:
							{ uri: listProfileUrl(ourProfile?.systemUserId) }
						}
						style={{ height: 360, width: "100%", marginBottom: 60 }}
					/>

					<ImageBackground
						source={require("../../../../../assets/EditDrawerIcon/rectangle.png")}
						style={{
							height: 170,
							width: "100%",
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
							marginTop: -68,
						}}
					>
						{/* ---------------------------- APPMENU */}

						<View
							style={{
								position: "absolute",
								right: 0,
								marginTop: 20,
							}}
						>
							<AppMenu
								menuColor={color.white}
								menuContent={
									mutualFriend
										? [
												{
													icon: "account-minus",
													label: "Unfriend",
													onPress: () => setUnfriendModal(true),
												},
												{
													icon: "block-helper",
													label: "Block User",
													onPress: () => setBlockModal(true),
												},
												{
													icon: "flag",
													label: "Report This User",
													onPress: () => setReportModal(true),
												},
										  ]
										: [
												{
													icon: "block-helper",
													label: "Block User",
													onPress: () => setBlockModal(true),
												},
												{
													icon: "flag",
													label: "Report This User",
													onPress: () => setReportModal(true),
												},
										  ]
								}
							/>
						</View>

						<Text style={styles.name} numberOfLines={1}>
							{ourProfile?.name}
						</Text>

						<View style={styles.iconImg}>
							{userType.map((ele, i) => (
								<View
									key={i}
									style={{
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<AppFabButton
										onPress={() => ele.onPress()}
										size={22}
										icon={
											<View
												style={[
													styles.icon,
													{
														borderColor: ele?.borderColor
															? "grey"
															: color.white,
													},
												]}
											>
												{i === 0 ? (
													<MaterialCommunityIcons
														name={icons}
														color={color.white}
														size={24}
													/>
												) : (
													<Image
														source={ele.img}
														style={{
															height: 24,
															width: 24,
															tintColor: ele?.tintColor,
														}}
													/>
												)}
											</View>
										}
									/>
									<Text style={styles.label}>{ele.label}</Text>
								</View>
							))}
						</View>
					</ImageBackground>

					{/* ````````````````````````````` TAB NAVIGATOR */}

					<LinearGradient
						style={{ flex: 1, zIndex: 1 }}
						start={{ x: 1, y: 1 }}
						end={{ x: 0, y: 0 }}
						colors={["#2C3034", "#586166"]}
					>
						<View style={styles.tabView}>
							{navigator.map((ele, i) => (
								<TouchableWithoutFeedback key={i} onPress={() => ele.onPress()}>
									<View
										style={[
											styles.textView,
											{
												backgroundColor: ele.bg,
												borderTopLeftRadius: i === 0 ? 10 : 0,
												borderTopRightRadius: i === 2 ? 10 : 0,
											},
										]}
									>
										<Text
											onPress={() => ele.onPress()}
											style={[styles.tab, { color: ele.textColor }]}
										>
											{ele.label}
										</Text>
									</View>
								</TouchableWithoutFeedback>
							))}
						</View>
					</LinearGradient>

					{/* `````````````````````````````````` TAB VIEW */}

					<View style={{ width: "96%", alignSelf: "center", height: "100%" }}>
						{ourProfile?.id && banjee && (
							<BanjeeProfileFriendList
								pendingConnectionsHandler={pendingConnections}
							/>
						)}

						{room && <Room otherUser={profileId} />}
						{post && <ProfilePost />}
						{/* {post && <FeedScreen otherPostId={profileId} />} */}
					</View>
				</ScrollView>
			</SafeAreaView>

			{/* ```````````` confirm block modal ````````````` */}

			{unfriendModal && (
				<ConfirmModal
					title={`Are you sure, you want to unfriend ${ourProfile?.name} ?`}
					setModalVisible={setUnfriendModal}
					btnLabel={"Unfriend"}
					message={"Unfriend User"}
					onPress={unfriendUser}
				/>
			)}
			{blockModal && (
				<ConfirmModal
					title={`Are you sure, you want to block ${ourProfile?.name} ?`}
					setModalVisible={setBlockModal}
					btnLabel={"Block"}
					message={"Block User"}
					onPress={blockUser}
				/>
			)}

			{acceptFrndReq && (
				<ConfirmModal
					title={`You have accepted ${ourProfile?.name}'s Banjee request. Now you can send voice message or call directly.`}
					setModalVisible={setAcceptFrndReq}
					btnLabel={"Accept"}
					message={"Accept friend request"}
					onPress={acceptFriendRequest}
				/>
			)}
			{rejectFrndReq && (
				<ConfirmModal
					title={`You have opted for rejection of ${ourProfile?.name}'s Banjee request.`}
					setModalVisible={setRejectFrndReq}
					btnLabel={"Reject"}
					message={"Reject request"}
					onPress={rejectFriendRequest}
				/>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 0,
		flex: 1,
	},
	header: {
		height: 56,
		width: "100%",
		position: "absolute",
		top: 0,
		zIndex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	gradient: {
		height: 208,
		width: "90%",
		alignSelf: "center",
		marginTop: -50,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		position: "relative",
	},
	name: {
		fontSize: 20,
		color: color.white,
		alignSelf: "center",
		textAlign: "center",
		marginTop: 25,
		width: "70%",
	},
	iconImg: {
		marginTop: 44,
		flexDirection: "row",
		justifyContent: "space-around",
		width: "80%",
		alignSelf: "center",
	},
	icon: {
		// backgroundColor: "rgba(0,0,0,0.2)",
		height: 40,
		width: 40,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 0.5,
	},
	label: {
		fontSize: 14,
		color: color.white,
		marginTop: 5,
	},
	tabView: {
		height: 46,
		// marginTop: -46,
		// width: "96%",
		alignSelf: "center",
		flexDirection: "row",
		// backgroundColor: "rgba(0,0,0,0.2)",
		justifyContent: "space-between",
	},
	textView: {
		zIndex: 1,
		justifyContent: "center",
		height: "100%",
		width: "32%",
		// borderTopLeftRadius: 10,
		// borderTopRightRadius: 10,
		borderLeftWidth: 0.5,
		borderRightWidth: 0.5,
		borderTopWidth: 0.5,
	},
	tab: {
		textAlign: "center",
		height: "100%",
		fontSize: 14,
		paddingTop: 15,
	},
});

export default BanjeeProfile;
