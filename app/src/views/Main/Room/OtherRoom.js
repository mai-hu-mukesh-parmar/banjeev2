import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import {
	View,
	StyleSheet,
	Image,
	VirtualizedList,
	Animated,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../../constants/components/ui-component/AppButton";
import color from "../../../constants/env/color";
import { categoryService } from "../../../helper/services/CategoryService";
import { listOtherRoom } from "../../../helper/services/CreateRoomService";
import { resetRoomData } from "../../../redux/store/action/roomAction";
import RoomElement from "./RoomComponents/RoomElement";

function OtherRoom(props) {
	const { navigate } = useNavigation();

	const { systemUserId } = useSelector((state) => state.registry);
	const [myRoom, setMyRoom] = React.useState([]);
	const [refresh, setRefresh] = React.useState(false);

	const scrollY = new Animated.Value(0);
	const diffClamp = Animated.diffClamp(scrollY, 0, 70);
	const [category, setCategory] = React.useState([]);
	const [roomType, setRoomType] = React.useState(null);
	const translateY = diffClamp.interpolate({
		inputRange: [0, 70],
		outputRange: [0, 70],
	});
	const dispatch = useDispatch();
	const diffClamp2 = Animated.diffClamp(scrollY, -70, 0);

	const translateYHeader = diffClamp2.interpolate({
		inputRange: [-70, 0],
		outputRange: [-70, 0],
	});

	const opacity = diffClamp2.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0],
	});

	const getAllRoom = React.useCallback(() => {
		setRefresh(true);
		let data = {
			allCanAddBanjees: false,
			allCanReact: false,
			allCanSpeak: false,
			allCanSwitchVideo: false,
			allUseVoiceFilters: false,
			category: null,
			categoryId: roomType,
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
			userId: systemUserId,
			userIds: null,
		};

		listOtherRoom(data)
			.then((res) => {
				setRefresh(false);
				setMyRoom(res.content);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, [roomType, systemUserId]);

	React.useEffect(() => {
		getAllRoom();
	}, [getAllRoom]);

	React.useEffect(() => {
		categoryService({
			categoryId: null,
			categoryName: null,
			description: null,
			name: null,
		})
			.then((res) => {
				let x = res.content.map((ele) => {
					return { name: ele.name, id: ele.id };
				});
				setCategory([{ name: "All", id: null }, ...x]);
			})
			.catch((err) => console.warn(err));
	}, []);
	function renderItem({ item }) {
		return <RoomElement item={item} />;
	}

	return (
		<View style={styles.container}>
			{myRoom === null ? (
				<View
					style={{
						alignItems: "center",
						width: "100%",
						height: "87.5%",
						justifyContent: "center",
						paddingBottom: 55, //``````````````````````
					}}
				>
					<Text style={{ fontSize: 24 }}>Hey There!!</Text>
					<Image
						source={require("../../../../assets/EditDrawerIcon/dummy_delete_user.png")}
						style={{ height: 120, width: 120, marginTop: 20, marginBottom: 10 }}
					/>

					<Text>There are no any Rooms Yet!!</Text>
					<Text style={{ textAlign: "center", width: "80%", marginTop: 10 }}>
						Be the first on to Create Rooms
					</Text>
				</View>
			) : (
				<View style={{ position: "relative" }}>
					<Animated.View
						style={[
							{ transform: [{ translateY: translateYHeader }] },
							styles.category,
						]}
					>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							{category.length > 0 &&
								category.map((ele, i) => (
									<TouchableOpacity
										key={i}
										onPress={() => setRoomType(ele?.id)}
									>
										<View
											style={{
												height: 40,
												padding: 10,
												borderRadius: 20,
												borderWidth: 1,
												marginRight: 8,
												borderColor: color.primary,
											}}
										>
											<Text onPress={() => setRoomType(ele?.id)}>
												{ele.name}
											</Text>
										</View>
									</TouchableOpacity>
								))}
						</ScrollView>
					</Animated.View>

					<VirtualizedList
						getItemCount={(myRoom) => myRoom.length}
						getItem={(data, index) => data[index]}
						showsVerticalScrollIndicator={false}
						refreshing={refresh}
						onRefresh={() => getAllRoom()}
						style={{ paddingTop: 2 }}
						data={myRoom}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
					/>
				</View>
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
				<Animated.View
					style={{ transform: [{ translateY: translateY }], opacity: opacity }}
				>
					<AppButton
						onPress={() => {
							dispatch(resetRoomData()), navigate("CreateRoom");
						}}
						title={"Create My Room"}
					/>
				</Animated.View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		height: "100%",
		width: "100%",
		paddingBottom: 60,
		backgroundColor: color.white,
	},
	category: {
		paddingLeft: "3%",
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		alignItems: "center",
		height: 50,
		flexWrap: "nowrap",
		backgroundColor: color.white,
		position: "absolute",
		zIndex: 1,
	},
	cardView: {
		height: 150,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		borderColor: color.black,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: color.white,
	},
});

export default OtherRoom;
