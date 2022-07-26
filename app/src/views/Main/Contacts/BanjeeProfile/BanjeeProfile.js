import React from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	SafeAreaView,
} from "react-native";

import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import { getUserRegistryData } from "../../../../helper/services/SplashService";
import { BlockUser } from "../../../../helper/services/Service";
import { unfriend } from "../../../../helper/services/UnfriendService";
import {
	acceptRequest,
	rejectRequest,
} from "../../../../helper/services/AcceptAndRejectFriendRequest";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import ReportUser from "../../../../constants/components/Cards/ReportUser";
import { Text } from "native-base";
import Room from "../../Room/Room";
import ConfirmModal from "../ChatComponent/ConfirmModal";
import { listProfileUrl } from "../../../../utils/util-func/constantExport";
import BanjeeProfileFriendList from "./BanjeeProfileFriendList";
import {
	getProfile,
	removeProfileData,
} from "../../../../redux/store/action/Profile/userPendingConnection";
import ProfilePost from "./ProfilePost";
import FriendType from "./FriendType";

function BanjeeProfile({ id }) {
	const { loading, connectionId, apiCall, profileId } = useSelector(
		(state) => state.viewProfile
	);

	const [banjee, setBanjee] = React.useState(true);
	const [room, setRoom] = React.useState(false);
	const [post, setPost] = React.useState(false);
	const [reportModal, setReportModal] = React.useState(false);
	const [ourProfile, setOurProfile] = React.useState(null);
	const [blockModal, setBlockModal] = React.useState(false);
	const [unfriendModal, setUnfriendModal] = React.useState(false);
	const [acceptFrndReq, setAcceptFrndReq] = React.useState(false);
	const [rejectFrndReq, setRejectFrndReq] = React.useState(false);

	const dispatch = useDispatch();

	React.useEffect(() => {
		getRegistryData();
		return () => {
			removeProfileData({});
			setOurProfile();
		};
	}, [getRegistryData]);

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

	const getRegistryData = React.useCallback(() => {
		getUserRegistryData(profileId)
			.then((res) => {
				setOurProfile(res);
				// console.log("res", JSON.stringify(res));
			})
			.catch((err) => console.log(err));
	}, [profileId]);

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
				apiCall();
			})
			.catch((err) => console.warn(err));
	};

	return (
		<React.Fragment>
			{loading && (
				<View
					style={{
						// zIndex: 2,
						height: "100%",
						width: "100%",
						position: "absolute",
						justifyContent: "center",
						zIndex: 99999,
						// backgroundColor: "white",
					}}
				>
					<AppLoading visible={loading} />
				</View>
			)}

			<SafeAreaView style={styles.container}>
				<ScrollView nestedScrollEnable={true} stickyHeaderIndices={[3]}>
					<View style={styles.header}>
						<Text
							fontSize={20}
							numberOfLines={1}
							style={{ marginLeft: 10, color: color.white, fontWeight: "500" }}
						>
							{ourProfile?.name}'s profile
						</Text>
					</View>
					<FastImage
						// onError={({ nativeEvent: { error } }) => setImageError(error)}
						source={
							// imageError

							// 	? checkGender(ourProfile?.gender)
							// 	:
							{ uri: listProfileUrl(ourProfile?.systemUserId) }
						}
						style={{ height: 360, width: "100%", marginBottom: 60 }}
					/>

					{/* ------------------------------ TYPE OF FRIEND */}

					<FriendType
						ourProfile={ourProfile}
						setUnfriendModal={setUnfriendModal}
						setReportModal={setReportModal}
						setBlockModal={setBlockModal}
						setAcceptFrndReq={setAcceptFrndReq}
						setRejectFrndReq={setRejectFrndReq}
					/>

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
						{ourProfile?.id && banjee && <BanjeeProfileFriendList />}

						{room && <Room otherUser={profileId} />}

						{post && <ProfilePost />}
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

			{reportModal && (
				<ReportUser
					setModalVisible={setReportModal}
					modalVisible={reportModal}
					systemUserId={ourProfile?.systemUserId}
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
		backgroundColor: "rgba(0,0,0,0.4)",
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
