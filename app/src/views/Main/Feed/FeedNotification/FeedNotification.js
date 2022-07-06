import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import {
	View,
	StyleSheet,
	VirtualizedList,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { NotifyFriendRequest } from "../../../../helper/services/FriendRequest";
import { getLocalStorage } from "../../../../utils/Cache/TempStorage";
import {
	checkGender,
	listProfileUrl,
} from "../../../../utils/util-func/constantExport";
import { Text } from "native-base";
import FeedReactionNotification from "./FeedReaction/FeedReactionNotification";
import color from "../../../../constants/env/color";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import { getProfile } from "../../../../redux/store/action/Profile/userPendingConnection";

function FeedNotification(props) {
	const { navigate } = useNavigation();
	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [notificationData, setNotificationData] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [imageError, setImageError] = React.useState();
	const { systemUserId } = useSelector((state) => state.registry);
	const dispatch = useDispatch();

	const apiCall = React.useCallback(
		() =>
			NotifyFriendRequest({
				accepted: "false",
				circleId: null,
				content: null,
				currentLocation: null,
				defaultReceiver: null,
				domain: null,
				fromUser: null,
				fromUserId: null,
				message: null,
				processedOn: null,
				rejected: "false",
				toUser: null,
				toUserId: systemUserId,
				voiceIntroSrc: null,
			})
				.then((res) => {
					setLoading(false);
					setData(res.content);
				})
				.catch((err) => console.warn(err)),
		[]
	);

	const allBanjeeNotification = React.useCallback(async () => {
		let token = await getLocalStorage("token");

		return axios
			.post(
				"https://gateway.banjee.org/services/message-broker/api/message/delivery/filter",
				{
					all: true,
					eventName: [
						"NEW_COMMENT",
						"FEED_REACTION",
						"REPLIED",
						"COMMENT_REACTION",
						"ACCEPT_REQUEST",
						"FEED_REMOVED",
					],
					page: page,
					pageSize: 15,
					sortby: "createdOn desc",
				},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(token)}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				setLoading(false);
				setNotificationData((prev) => [...prev, ...res.data.content]);
			})
			.catch((err) => {
				console.warn(err);
			});
	}, [page]);

	const callApis = React.useCallback(async () => {
		apiCall();
		await allBanjeeNotification();
	}, [apiCall, allBanjeeNotification]);

	React.useEffect(() => {
		callApis();
	}, [callApis]);

	function updatePage() {
		setPage((prev) => prev + 1);
	}

	function renderItem(item, i) {
		console.warn(JSON.stringify(item, null, 2));

		return (
			<TouchableWithoutFeedback
				key={i}
				onPress={() => {
					dispatch(
						getProfile({
							showReqestedFriend: true,
							profileId: item.fromUserId,
							connectionId: item.id,
							apiCall,
						})
					),
						navigate("BanjeeProfile");
				}}
			>
				<View style={styles.container}>
					<View style={styles.subContainer}>
						<Image
							onError={({ nativeEvent: { error } }) => setImageError(error)}
							source={
								imageError
									? checkGender(item?.fromUser?.gender)
									: { uri: listProfileUrl(item?.fromUser?.id) }
							}
							style={styles.img}
						/>

						<Text
							style={styles.txt}
							numberOfLines={1}
							onPress={() => {
								dispatch(
									getProfile({
										showReqestedFriend: true,
										profileId: item.fromUserId,
										connectionId: item.id,
										apiCall,
									})
								),
									navigate("BanjeeProfile");
							}}
						>
							<Text
								style={{ fontWeight: "bold" }}
								onPress={() => {
									dispatch(
										getProfile({
											showReqestedFriend: true,
											profileId: item.fromUserId,
											connectionId: item.id,
											apiCall,
										})
									),
										navigate("BanjeeProfile");
								}}
							>
								{item?.sender?.userName}
							</Text>{" "}
							sent you voice Intro
						</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	function showNotificationList({ item }) {
		return <FeedReactionNotification item={item} />;
	}

	return (
		<LinearGradient
			style={{ flex: 1 }}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			colors={["#ffffff", "#eeeeff"]}
		>
			{loading && <AppLoading visible={loading} />}

			{data.length > 0 && (
				<React.Fragment>
					<Text
						style={{
							fontWeight: "bold",
							marginLeft: 10,
							marginBottom: data.length > 0 ? 0 : 10,
						}}
					>
						Friend Request
					</Text>

					{data.map((ele, i) => renderItem(ele, i))}

					{/* <VirtualizedList
            showsVerticalScrollIndicator={false}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            onRefresh={() => apiCall()}
            refreshing={loading}
            data={data}
            keyExtractor={(data) => data.id}
            renderItem={renderItem}
          /> */}
				</React.Fragment>
			)}

			{notificationData?.length > 0 && (
				<React.Fragment>
					<Text
						style={{
							fontWeight: "bold",
							marginLeft: 10,
							marginBottom: 10,
							marginTop: data.length > 0 ? 10 : 0,
						}}
					>
						Notification
					</Text>
					<View style={{ marginBottom: 58 }}>
						<VirtualizedList
							showsVerticalScrollIndicator={false}
							getItemCount={(notificationData) => notificationData?.length}
							getItem={(notificationData, index) => notificationData[index]}
							onRefresh={() => apiCall()}
							refreshing={loading}
							data={notificationData}
							keyExtractor={() => Math.random()}
							renderItem={showNotificationList}
							onEndReachedThreshold={0.1}
							onEndReached={() => {
								// setPage((prev) => prev + 1);
								updatePage();
							}}
						/>
					</View>
				</React.Fragment>
			)}
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 56,
		width: "100%",
	},
	subContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 0.5,
		borderColor: "black",
		height: "100%",
		width: "100%",
	},
	img: {
		height: 40,
		width: 40,
		borderRadius: 20,
		marginLeft: 10,
	},

	txt: { fontSize: 14, color: color.greyText, marginLeft: 20 },
});

export default FeedNotification;
