import { View, Image, TouchableWithoutFeedback, Animated } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getFeed } from "../../../helper/services/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import { saveFeed } from "../../../redux/store/action/feedAction";
import { showToast } from "../../../redux/store/reducer/toastAction";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Viewport } from "@skele/components";
import { Text } from "native-base";

export default function Feed() {
	const dispatch = useDispatch();
	const { setOptions, navigate } = useNavigation();

	const { otherPostId, feed, screen } = useSelector((state) => state.feed);

	const [loadingData, setLoadingData] = useState(false);
	const [page, setPage] = useState(0);
	const [refresh, setRefresh] = useState(false);

	const allFeed = useCallback(() => {
		setLoadingData(true);
		getFeed({
			author: null,
			authorId: null,
			createdOn: null,
			deleted: null,
			geoLocation: null,
			id: null,
			locationId: null,
			mediaContent: null,
			mediaRootDirectoryId: null,
			otherUserId: null,
			page: page,
			pageId: null,
			pageName: null,
			pageSize: 15,
			percentage: 0,
			reactions: null,
			reactionsCount: null,
			recentComments: null,
			text: null,
			totalComments: null,
			totalReactions: null,
			visibility: null,
		})
			.then((res) => {
				setRefresh(false);
				console.log("Feeds page", page);
				setLoadingData(false);

				if (res?.length > 0) {
					dispatch(saveFeed(res));
				} else {
					dispatch(
						showToast({
							open: true,
							description: "you have reached at the end of the post ",
						})
					);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

	const setHeader = useCallback(() => {
		if (!otherPostId) {
			setOptions({
				headerRight: () => (
					<AppFabButton
						onPress={() => navigate("FriendRequestNotification")}
						size={24}
						icon={
							<React.Fragment>
								<MaterialCommunityIcons
									name="bell-outline"
									size={25}
									color={"black"}
								/>
								<View
									style={{
										position: "absolute",
										bottom: 0,
										height: 10,
										left: 0,
										width: 10,
										backgroundColor: "lightgreen",
										borderRadius: 50,
									}}
								/>
							</React.Fragment>
						}
					/>
				),
				headerLeft: () => (
					<View
						style={{
							width: 130,
							justifyContent: "center",
							height: "100%",
						}}
					>
						<Image
							source={require("../../../../assets/EditDrawerIcon/banjee_feed.png")}
							style={{ width: 130, height: 30 }}
							resizeMode="contain"
						/>
					</View>
				),
			});
		}
	}, []);

	useEffect(() => {
		setHeader();
		dispatch(showToast({ open: true, description: "Hey! welcome" }));
		allFeed();
	}, [allFeed, setHeader]);

	function renderItem({ item }) {
		return (
			<HomeSceen
				key={Math.random()}
				item={item}
				myPost={myPost}
				// myFeed={myFeed}
				allFeed={allFeed}
			/>
		);
	}

	return (
		<View>
			<View style={styles.container}>
				{loadingData && <FeedSkeleton />}
				{data?.length > 0 ? (
					<Viewport.Tracker>
						<VirtualizedList
							howsVerticalScrollIndicator={false}
							getItemCount={(data) => data.length}
							getItem={(data, index) => data[index]}
							data={data}
							keyExtractor={(data) => data.id}
							renderItem={renderItem}
							refreshing={loadingData}
							onRefresh={() => setPage(0)}
							onEndReachedThreshold={1}
							onEndReached={() => setPage((prev) => prev + 1)}
						/>
					</Viewport.Tracker>
				) : (
					<React.Fragment>
						{/* <FeedSkeleton /> */}
						<Text
							style={{
								alignSelf: "center",
								textAlign: "center",
								position: "absolute",
								bottom: 0,
							}}
						>
							Loading...
						</Text>
					</React.Fragment>
				)}
				{myPost && data.length === 0 && (
					<Text style={{ alignSelf: "center", marginTop: 120 }}>
						You have not created any post yet...!
					</Text>
				)}
			</View>

			<View style={styles.filterView}>
				<Animated.View style={{ transform: [{ translateY: translateY }] }}>
					<TouchableWithoutFeedback
						onPress={() => navigate("CreateFeed", { allFeed: allFeed })}
					>
						<View style={styles.subView}>
							<Text
								onPress={() => navigate("CreateFeed", { data: null })}
								style={{ zIndex: 99, fontSize: 12, color: color.white }}
							>
								Post Your Feed
							</Text>
						</View>
					</TouchableWithoutFeedback>
				</Animated.View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		zIndex: -1,
	},
	filterView: {
		height: 34,
		position: "absolute",
		bottom: 100,
		flexDirection: "row",
		width: 256,
		alignSelf: "center",
		justifyContent: "space-between",
	},
	subView: {
		width: 120,
		borderWidth: 1,
		borderColor: "#666e7b",
		backgroundColor: "rgba(0,0,0,0.5)",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},
	filterView: {
		height: 34,
		position: "absolute",
		bottom: 20,
		flexDirection: "row",
		width: 256,
		alignSelf: "center",
		alignItems: "center",
		zIndex: 9,
		justifyContent: "center",
	},
	subView: {
		width: 120,
		borderWidth: 1,
		borderColor: "#666e7b",
		backgroundColor: "rgba(0,0,0,0.5)",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
		zIndex: 99,
	},
});
