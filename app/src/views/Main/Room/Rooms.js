import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import {
	View,
	StyleSheet,
	Image,
	VirtualizedList,
	Animated,
} from "react-native";
import { useSelector } from "react-redux";
import AppButton from "../../../constants/components/ui-component/AppButton";
import {
	deleteRoom,
	listOurRoom,
} from "../../../helper/services/CreateRoomService";
import RoomElement from "./RoomComponents/RoomElement";

function Room(props) {
	const { navigate } = useNavigation();
	const { systemUserId } = useSelector((state) => state.registry);
	const [myRoom, setMyRoom] = React.useState([]);
	const [refresh, setRefresh] = React.useState(false);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [id, setId] = React.useState();

	const scrollY = new Animated.Value(0);
	const diffClamp = Animated.diffClamp(scrollY, 0, 70);

	const translateY = diffClamp.interpolate({
		inputRange: [0, 70],
		outputRange: [0, 70],
	});

	const removeRoom = () => {
		deleteRoom(id)
			.then(() => getAllRoom())
			.catch((err) => console.warn(err));
	};

	function renderItem({ item }) {
		return (
			<RoomElement
				item={item}
				userRoom="userRoom"
				otherUser={props?.otherUser}
				setDeleteModal={setDeleteModal}
				setId={setId}
			/>
		);
	}

	const getAllRoom = React.useCallback(() => {
		setRefresh(true);
		let data = {
			allCanAddBanjees: false,
			allCanReact: false,
			allCanSpeak: false,
			allCanSwitchVideo: false,
			allUseVoiceFilters: false,
			category: null,
			categoryId: null,
			categoryName: null,
			chatroomId: null,
			communityType: null,
			connectedUserIds: null,
			connectedUsers: null,
			connectionReq: null,
			content: null,
			createdOn: null,
			domain: null,
			group: false,
			groupName: null,
			id: null,
			imageCommunityUrl: null,
			imageContent: null,
			lastUpdatedBy: null,
			lastUpdatedOn: null,
			likes: 0,
			onlyAudioRoom: false,
			playing: false,
			recordSession: false,
			seekPermission: false,
			subCategoryId: null,
			subCategoryName: null,
			unreadMessages: 0,
			user: null,
			userId: props?.otherUser ? props?.otherUser : systemUserId,
			userIds: null,
		};

		listOurRoom(data)
			.then((res) => {
				setRefresh(false);
				setMyRoom(res.content ? res.content : null);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, []);

	React.useEffect(() => {
		getAllRoom();
	}, [getAllRoom]);

	return (
		<React.Fragment>
			<View style={styles.container}>
				{myRoom.length === 0 ? (
					<View
						style={{
							alignItems: "center",
							width: "100%",
							justifyContent: "center",
							// height: (Dimensi ons.get("window").height = "87.5%"),
							height: "87.5%",
							paddingBottom: 55, //``````````````````````
						}}
					>
						<Text style={{ fontSize: 24 }}>Hey There!!</Text>
						<Image
							source={require("../../../../assets/EditDrawerIcon/dummy_delete_user.png")}
							style={{
								height: 120,
								width: 120,
								marginTop: 20,
								marginBottom: 10,
							}}
						/>

						<Text>You haven't created any Rooms Yet!!</Text>
						<Text style={{ textAlign: "center", width: "80%", marginTop: 10 }}>
							Create Rooms based on your intrests and start interactions
						</Text>
					</View>
				) : (
					<VirtualizedList
						getItemCount={(myRoom) => myRoom.length}
						getItem={(data, index) => data[index]}
						showsVerticalScrollIndicator={false}
						refreshing={refresh}
						onRefresh={() => getAllRoom()}
						style={{ paddingTop: 2 }}
						data={myRoom}
						keyExtractor={(data) => data.id}
						renderItem={renderItem}
						onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
					/>
				)}
				<View
					style={{
						width: 150,
						alignSelf: "center",
						position: "absolute",
						bottom: 70,
						height: 40,
					}}
				>
					<Animated.View style={{ transform: [{ translateY: translateY }] }}>
						<AppButton
							onPress={() => navigate("CreateRoom")}
							title={"Create My Room"}
						/>
					</Animated.View>
				</View>
			</View>

			{deleteModal && (
				<ConfirmModal
					title={"Are you sure that you want to delete this room ?"}
					setModalVisible={setDeleteModal}
					btnLabel={"Delete"}
					message={"Delete Room"}
					onPress={removeRoom}
				/>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		// flex: 1,
		height: "100%",
		width: "100%",
		backgroundColor: "white",
		paddingBottom: 60,
	},
});

export default Room;
