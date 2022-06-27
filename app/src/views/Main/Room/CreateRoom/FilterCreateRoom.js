import React from "react";
import { View, StyleSheet, Switch, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "native-base";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import color from "../../../../constants/env/color";
import { useSelector } from "react-redux";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import { updateRoom } from "../../../../helper/services/CreateRoomService";

function FilterCreateRoom(props) {
	const {
		allCanSwitchVideo,
		allCanReact,
		allCanSpeak,
		allCanAddBanjees,
		recordSession,
		seekPermission,
		allUseVoiceFilters,
		onlyAudioRoom,
	} = -useSelector((state) => state.room);

	const {
		params: {
			update,
			data,
			data: { editRoom, userCount },
		},
	} = useRoute();

	const { setOptions, navigate } = useNavigation();
	const [disable, setDisable] = React.useState(false);

	const {
		userObject: { id, avtarUrl },
	} = useSelector((state) => state.registry);

	const user = useSelector((state) => state.user);
	const btnClick = React.useCallback(() => {
		setDisable(true);
		if (editRoom) {
			// console.warn("----------------------------------", data?.audioUri.url);
			// console.warn("editRoom?.imageContent", editRoom?.imageContent);
			// console.warn(
			//   "Imagecontettgfgdfgdfg",
			//   data?.roomUri?.base64Content === undefined
			//     ? {
			//         ...editRoom?.imageContent,
			//         mimeType: "image/jpg",
			//       }
			//     : {
			//         aspectRatio: null,
			//         base64Content: data.roomUri.imageBase64,
			//         caption: null,
			//         description: null,
			//         height: 0,
			//         length: 0,
			//         mediaDesignType: 0,
			//         mediaSource: null,
			//         mimeType: "image/jpg",
			//         sequenceNumber: 0,
			//         sizeInBytes: 0,
			//         src: null,
			//         subTitle: null,
			//         tags: null,
			//         title: data.roomUri.url,
			//         type: null,
			//         width: 0,
			//       }
			// );
			// 'console.log(',console.log(
			//   "data.roomUri",
			//   data?.roomUri?.base64Content,
			//   "data.audioUri.base64Content",
			//   data.audioUri?.base64Content,
			//   "data.audioUri.url",
			//   data.audioUri?.url
			// );
			// console.log("Update Apicall");
			updateRoom({
				allCanAddBanjees: toggle.add_banjee,
				allCanReact: toggle.feedback,
				allCanSpeak: toggle.speak,
				allCanSwitchVideo: toggle.switch_video,
				allUseVoiceFilters: toggle.voice_filter,
				category: null, //reamining
				categoryId: data.categoryId,
				categoryName: data.params.subCategoryItem,
				chatroomId: editRoom?.chatroomId, //remaining
				communityType: data.communityType,
				connectedUserIds: data.params.checkUser.map((ele) => ele.id.toString()),
				connectedUsers: data.params.checkUser, //remaining
				connectionReq: null, //remaining
				content:
					data?.audioUri?.audioBase64 === undefined ||
					data?.audioUri?.audioBase64 === null
						? editRoom?.content
						: {
								aspectRatio: null,
								base64Content: data?.audioUri?.audioBase64,
								caption: null,
								description: null,
								height: 0,
								length: 0,
								mediaDesignType: 0,
								mediaSource: null,
								mimeType: "audio/mp3",
								sequenceNumber: 0,
								sizeInBytes: 0,
								src: null,
								subTitle: null,
								tags: null,
								title: data.audioUri.url,
								type: null,
								width: 0,
						  },
				createdOn: editRoom?.createdOn,
				domain: editRoom?.domain,
				group: true,
				groupName: data.txt,
				id: editRoom?.id,
				imageCommunityUrl: null,
				imageContent:
					data?.roomUri?.base64Content === undefined
						? {
								...editRoom?.imageContent,
								base64Content: editRoom?.imageContent?.src,
								mimeType: "image/jpg",
						  }
						: {
								aspectRatio: null,
								base64Content: data.roomUri.imageBase64,
								caption: null,
								description: null,
								height: 0,
								length: 0,
								mediaDesignType: 0,
								mediaSource: null,
								mimeType: "image/jpg",
								sequenceNumber: 0,
								sizeInBytes: 0,
								src: null,
								subTitle: null,
								tags: null,
								title: data.roomUri.url,
								type: null,
								width: 0,
						  },
				lastUpdatedBy: null,
				lastUpdatedOn: null,
				likes: 0,
				onlyAudioRoom: toggle.audio_only,
				playing: false,
				recordSession: false,
				seekPermission: false,
				subCategoryId: data.subCategoryId,
				subCategoryName: data.txt,
				unreadMessages: 0,
				user: user,
				userId: id,
				userIds: [id],
			})
				.then((res) => {
					navigate("Room");
					ToastMessage("Room updated Successfully");
				})
				.catch((err) => console.log(err));
		} else {
			console.log("EditApiCall");
			createRoom({
				allCanAddBanjees: toggle.add_banjee,
				allCanReact: toggle.feedback,
				allCanSpeak: toggle.speak,
				allCanSwitchVideo: toggle.switch_video,
				allUseVoiceFilters: toggle.voice_filter,
				category: null, //reamining
				categoryId: data.categoryId,
				categoryName: data.params.subCategoryItem,
				chatroomId: null, //remaining
				communityType: data.communityType,
				connectedUserIds: data.params.checkUser.map((ele) => ele.id),
				connectedUsers: null, //remaining
				connectionReq: null, //remaining
				content: {
					aspectRatio: null,
					base64Content: data.audioUri.audioBase64,
					caption: null,
					description: null,
					height: 0,
					length: 0,
					mediaDesignType: 0,
					mediaSource: null,
					mimeType: "audio/mp3",
					sequenceNumber: 0,
					sizeInBytes: 0,
					src: null,
					subTitle: null,
					tags: null,
					title: data.audioUri.url,
					type: null,
					width: 0,
				},
				createdOn: null,
				domain: null,
				group: true,
				groupName: data.txt,
				id: null,
				imageCommunityUrl: null,
				imageContent: {
					aspectRatio: null,
					base64Content: data.roomUri.imageBase64,
					caption: null,
					description: null,
					height: 0,
					length: 0,
					mediaDesignType: 0,
					mediaSource: null,
					mimeType: "image/jpg",
					sequenceNumber: 0,
					sizeInBytes: 0,
					src: null,
					subTitle: null,
					tags: null,
					title: data.roomUri.url,
					type: null,
					width: 0,
				},
				lastUpdatedBy: null,
				lastUpdatedOn: null,
				likes: 0,
				onlyAudioRoom: toggle.audio_only,
				playing: false,
				recordSession: false,
				seekPermission: false,
				subCategoryId: data.subCategoryId,
				subCategoryName: data.txt,
				unreadMessages: 0,
				user: null,
				userId: id,
				userIds: [id],
			})
				// .then((res) => console.log(res))
				.then((res) => {
					navigate("RoomVideoCall", { room: res });
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	React.useEffect(() => {
		return setOptions({
			headerTitle: () => (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View style={{ elevation: 1, borderRadius: 20, marginRight: 10 }}>
						<Image
							source={
								// userData.avatarUrl
								{ uri: profileUrl(avtarUrl) }
								// : require("../../assets/EditDrawerIcon/neutral_placeholder.png")
							}
							style={styles.profile}
						/>
					</View>
					<Text>{editRoom ? "Update Room" : "Create Room"}</Text>
				</View>
			),
		});
	}, []);

	const [toggle, setToggle] = React.useState({
		audio_only: onlyAudioRoom ? onlyAudioRoom : false,
		speak: allCanSpeak ? allCanSpeak : false,
		permission: seekPermission ? seekPermission : false,
		voice_filter: allUseVoiceFilters ? allUseVoiceFilters : false,
		feedback: allCanReact ? allCanReact : false,
		switch_video: allCanSwitchVideo ? allCanSwitchVideo : false,
		add_banjee: allCanAddBanjees ? allCanAddBanjees : false,
		record_session: recordSession ? recordSession : false,
	});

	console.log("toggeleee", toggle);
	console.log("toggleleeeDataaaaa", {
		allCanAddBanjees: allCanAddBanjees,
		allCanReact: allCanReact,
		allCanSpeak: allCanSpeak,
		allCanSwitchVideo: allCanSwitchVideo,
		allUseVoiceFilters: allUseVoiceFilters,
		seekPermission: seekPermission,
		recordSession: recordSession,
		onlyAudioRoom: onlyAudioRoom,
	});

	const content = [
		{
			title: "All can Speak",
			isEnabled: toggle.speak,
			id: 0,
			setIsEnable: () => setToggle((prev) => ({ ...prev, speak: !prev.speak })),
		},
		{
			title: "seek permission",
			id: 1,
			isEnabled: toggle.permission,
			setIsEnable: () =>
				setToggle((prev) => ({ ...prev, permission: !prev.permission })),
		},
		{
			title: "All can use Voice Filters",
			id: 2,
			isEnabled: toggle.voice_filter,
			setIsEnable: () =>
				setToggle((prev) => ({ ...prev, voice_filter: !prev.voice_filter })),
		},
		{
			title: "Feedback",
			id: 3,
			isEnabled: toggle.feedback,
			setIsEnable: () =>
				setToggle((prev) => ({ ...prev, feedback: !prev.feedback })),
		},
		{
			title: "All can switch on Video",
			isEnabled: toggle.switch_video,
			id: 4,
			setIsEnable: () =>
				setToggle((prev) => ({ ...prev, switch_video: !prev.switch_video })),
		},
		{
			title: "All can add Banjee",
			id: 5,
			isEnabled: toggle.add_banjee,
			setIsEnable: () =>
				setToggle((prev) => ({
					...prev,
					add_banjee: !prev.add_banjee,
				})),
		},
		{
			title: "Record the Session",
			id: 6,
			isEnabled: toggle.record_session,
			setIsEnable: () =>
				setToggle((prev) => ({
					...prev,
					record_session: !prev.record_session,
				})),
		},
		{
			title: "Audio only",
			id: 7,
			isEnabled: toggle.audio_only,
			setIsEnable: () =>
				setToggle((prev) => ({
					...prev,
					audio_only: !prev.audio_only,
				})),
		},
	];

	return (
		<React.Fragment>
			<View style={styles.container}>
				<View style={{ alignItems: "center" }}>
					<Text style={{ textAlign: "center", marginBottom: 24 }}>
						You have selected {userCount?.length} members for your {data?.txt}
						Room
					</Text>
					<Text>Set appropriate permissions for others</Text>
				</View>

				<View
					style={{
						width: "80%",
						marginTop: 36,
						alignSelf: "center",
						borderTopWidth: 1,
						borderColor: "#d8d8d8",
					}}
				>
					{content.map((item, i) => (
						<View
							key={i}
							style={{
								justifyContent: "center",
								width: "100%",
								height: 48,
								borderBottomWidth: 1,
								borderColor: "#d8d8d8",
								position: "relative",
							}}
						>
							<Text style={{ fontSize: 14 }}>{item.title}</Text>

							<Switch
								style={{
									width: 50,

									alignSelf: "flex-end",
									position: "absolute",
								}}
								trackColor={{ false: "#7b7b7b", true: "#608582" }}
								thumbColor={item.isEnabled ? "#80cbc4" : "#bdbdbd"}
								ios_backgroundColor="#3e3e3e"
								onValueChange={() => item.setIsEnable()}
								value={item.isEnabled}
							/>
						</View>
					))}
				</View>
			</View>

			<View style={styles.btnGrp}>
				<AppButton
					disabled={disable}
					style={{ width: 160 }}
					title={editRoom ? "Update Room" : "Go Live Now"}
					onPress={() => {
						console.log("Called");
						btnClick();
					}}
				/>
			</View>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	profile: {
		height: 40,
		width: 40,
		borderRadius: 20,
		borderColor: color.primary,
		borderWidth: 1,
	},
	container: {
		width: "75%",
		alignSelf: "center",
	},
	btnGrp: {
		width: "100%",
		justifyContent: "center",
		flexDirection: "row",
		marginTop: 36,
	},
});

export default FilterCreateRoom;
