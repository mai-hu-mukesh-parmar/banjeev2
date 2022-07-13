import {
	View,
	TouchableWithoutFeedback,
	Animated,
	VirtualizedList,
	StyleSheet,
} from "react-native";
import React, { Fragment, useCallback, useEffect } from "react";
import FastImage from "react-native-fast-image";
import { getFeed } from "../../../helper/services/PostFeed";
import { useDispatch, useSelector } from "react-redux";
import {
	saveFeed,
	saveFeedAction,
} from "../../../redux/store/action/feedAction";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import color from "../../../constants/env/color";
import usePermission from "../../../utils/hooks/usePermission";
import { useIsFocused } from "@react-navigation/native";
import { showToast } from "../../../redux/store/action/toastAction";
import FeedProfile from "./FeedSkeleton/FeedProfile";
import FeedHeader from "./FeedSkeleton/FeedHeader";
import FeedContent from "./FeedSkeleton/FeedContent";
import FeedFooter from "./FeedSkeleton/FeedFooter";
import AppLoading from "../../../constants/components/ui-component/AppLoading";

export default function FeedScreen() {
	const isFocused = useIsFocused();
	const dispatch = useDispatch();

	const { setOptions, navigate } = useNavigation();

	const { checkPermission } = usePermission();

	const {
		feed: {
			otherPostId,
			screen,
			feed: data,
			page,
			loadingData,
			refreshingData,
		},
	} = useSelector((state) => state);

	const scrollY = new Animated.Value(100);

	const diffClamp = Animated.diffClamp(scrollY, 0, 70);
	const translateY = diffClamp.interpolate({
		inputRange: [0, 70],
		useNativeDriver: true,
		outputRange: [0, 70],
	});
	const allFeed = useCallback(async () => {
		if (page === 0) {
			dispatch(saveFeedAction({ refreshingData: true }));
		} else {
			dispatch(saveFeedAction({ loadingData: true }));
		}

		await checkPermission("STORAGE");
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
			pageId: null,
			pageName: null,
			percentage: 0,
			reactions: null,
			page,
			pageSize: 20,
			reactionsCount: null,
			recentComments: null,
			text: null,
			totalComments: null,
			totalReactions: null,
			visibility: null,
		})
			.then((res) => {
				dispatch(saveFeedAction({ refreshingData: false }));
				dispatch(saveFeedAction({ loadingData: false }));

				if (res?.length > 0) {
					dispatch(
						saveFeed(res.map((ele) => ({ ...ele, key: Math.random() })))
					);
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
						onPress={() => navigate("FeedNotification")}
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
						<FastImage
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
		if (isFocused) {
			allFeed();
		}
	}, [allFeed, setHeader, isFocused]);

	function renderItem({ item }) {
		return (
			<View style={styles.mainView}>
				<View style={styles.grid}>
					<FeedProfile item={item} />
					<View style={styles.header}>
						<FeedHeader
							item={item}
							setDeletePostModal={() => {}}
							setPostId={() => {}}
						/>
					</View>
				</View>
				<FeedContent item={item} />
				<FeedFooter item={item} />
			</View>
		);
	}

	const getItemCount = (data) => data?.length;
	const keyExtractor = (data) => data?.key;
	const getItem = (data, index) => data[index];
	const onViewableItemsChanged = (data) =>
		dispatch(saveFeedAction({ viewableItems: data.viewableItems }));
	const onRefresh = () => dispatch(saveFeedAction({ page: 0 }));
	const onEndReached = () => dispatch(saveFeedAction({ page: page + 1 }));

	return (
		<Fragment>
			<View style={styles.container}>
				<VirtualizedList
					howsVerticalScrollIndicator={false}
					getItemCount={getItemCount}
					getItem={getItem}
					data={data}
					keyExtractor={keyExtractor}
					renderItem={renderItem}
					maxToRenderPerBatch={10}
					initialNumToRender={10}
					removeClippedSubviews={true}
					updateCellsBatchingPeriod={50}
					refreshing={refreshingData}
					viewabilityConfig={{
						itemVisiblePercentThreshold: 100,
					}}
					onViewableItemsChanged={onViewableItemsChanged}
					onRefresh={onRefresh}
					onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
					onEndReachedThreshold={0.2}
					onEndReached={onEndReached}
				/>
			</View>

			{loadingData && (
				<View
					style={{
						bottom: 8,
						position: "absolute",
						justifyContent: "center",
						flexDirection: "row",
						width: "100%",
					}}
				>
					{/* <Text>Loading data...</Text> */}
					<AppLoading
						style={{ marginRight: 15 }}
						visible={loadingData}
						size="small"
					/>
				</View>
			)}

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
		</Fragment>
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
	moreText: {
		flexDirection: "row",
		width: "95%",
		alignSelf: "center",
		marginLeft: 20,
		alignItems: "center",
	},
	mainView: {
		width: "100%",
		alignSelf: "flex-end",
		marginBottom: 17,
		backgroundColor: "white",
		paddingBottom: 15,
	},
	grid: {
		paddingLeft: "5%",
		width: "100%",
		flexDirection: "row",
		height: 56,
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		height: "100%",
		width: "87%",
		borderBottomColor: color.greyText,
		justifyContent: "space-between",
		marginLeft: 20,
	},

	mainView: {
		width: "100%",
		alignSelf: "flex-end",
		marginBottom: 17,
		backgroundColor: "white",
		paddingBottom: 15,
	},
	grid: {
		paddingLeft: "5%",
		width: "100%",
		flexDirection: "row",
		height: 56,
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		height: "100%",
		width: "87%",
		borderBottomColor: color.greyText,
		justifyContent: "space-between",
		marginLeft: 20,
	},
});
