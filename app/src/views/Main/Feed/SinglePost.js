import React, { memo, useEffect, useRef, useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
	Share,
	SafeAreaView,
} from "react-native";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	Ionicons,
	Entypo,
} from "@expo/vector-icons";
import { Text } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import ViewMoreText from "react-native-view-more-text";
import * as Sharing from "expo-sharing";
import RNFetchBlob from "rn-fetch-blob";
import { searchFeed } from "../../../helper/services/SearchFeedbyId";
import { useSelector } from "react-redux";
import AppLoading from "../../../constants/components/ui-component/AppLoading";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import color from "../../../constants/env/color";
import {
	cloudinaryFeedUrl,
	listProfileUrl,
} from "../../../utils/util-func/constantExport";
import { convertTime } from "../../../utils/util-func/convertTime";
import Reaction from "./Reaction";
import AppMenu from "../../../constants/components/ui-component/AppMenu";
import FeedContent from "./FeedContent";

function SinglePost() {
	const { params } = useRoute();
	const [item, setItem] = useState();
	const [open, setOpen] = useState(false);
	const [showReaction, setShowReaction] = useState(false); //for reaction
	const [selectedReaction, setSelectedReaction] = useState();
	const [reaction, setReaction] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const refRBSheet = useRef(null);
	const { goBack, navigate } = useNavigation();
	const { systemUserId } = useSelector((state) => state.registry);

	const onShare = async (url) => {
		var date = new Date();

		const { config, fs } = RNFetchBlob;
		let PictureDir = fs.dirs.DownloadDir;
		let options = {
			fileCache: true,
			addAndroidDownloads: {
				useDownloadManager: true,
				notification: true,
				path:
					PictureDir +
					"/image_" +
					Math.floor(date.getTime() + date.getSeconds() / 2) +
					".png",
				description: "Image",
			},
		};
		config(options)
			.fetch("GET", url)
			.then(async (res) => {
				console.warn(res.data);
				console.warn(`file://${res.data}`);

				await Sharing.shareAsync(`file:/${res.data}`, {
					mimeType: "image.jpg",
				});

				console.warn("Image Downloaded Successfully.");
			});
	};

	useEffect(() => {
		if (params.newItem) {
			setLoading(false);
			setItem(params.newItem);
		} else if (params.feedId) {
			searchFeed(params.feedId)
				.then((res) => {
					setLoading(false);
					setItem(res);
				})
				.catch((err) => {
					if (err.statusCode) {
						setError(true);
					} else {
						console.warn(err);
					}
				});
		}
	}, [params]);

	function renderViewMore(onPress) {
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={styles.moreText}>
					<MaterialCommunityIcons
						name="chevron-down"
						size={20}
						color={color.greyText}
					/>
					<Text style={{ color: color.greyText }}>Show more</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	function renderViewLess(onPress) {
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={styles.moreText}>
					<MaterialCommunityIcons
						name="chevron-up"
						size={20}
						color={color.greyText}
					/>
					<Text style={{ color: color.greyText }}>Show less</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	function seeProfile() {
		if (systemUserId === item.authorId) {
			navigate("Profile");
		} else {
			navigate("BanjeeProfile", { item: { id: item.authorId } });
		}
	}
	return (
		<React.Fragment>
			{error ? (
				<View
					style={{
						alignItems: "center",
						height: "100%",
						width: "100%",
						justifyContent: "center",
					}}
				>
					<Text style={{ fontSize: 20 }}>
						Requested feed no longer available
					</Text>
				</View>
			) : (
				<React.Fragment>
					{loading ? (
						<AppLoading visible={loading} height={"100%"} />
					) : (
						<SafeAreaView>
							<View style={styles.mainView}>
								{/* <AppFabButton
                style={{ alignSelf: "flex-end", marginTop: 10 }}
                size={20}
                onPress={() => goBack()}
                icon={<Entypo name="cross" size={24} color={color.black} />}
              /> */}
								<View style={styles.grid}>
									<TouchableWithoutFeedback onPress={() => seeProfile()}>
										<Image
											source={
												item?.authorId
													? {
															uri: listProfileUrl(item?.authorId),
													  }
													: require("../../../../assets/EditDrawerIcon/neutral_placeholder.png")
											}
											style={{ height: 40, width: 40, borderRadius: 20 }}
										/>
									</TouchableWithoutFeedback>

									<View style={styles.header}>
										<View
											style={{
												width: "85%",
												height: "100%",
												overflow: "hidden",
												justifyContent: "center",
											}}
										>
											<Text numberOfLines={1} style={{ fontWeight: "bold" }}>
												{item?.author?.username}
											</Text>

											<View style={{ flexDirection: "row" }}>
												{item?.locationId ? (
													<View
														style={{
															maxWidth: "70%",
															// Width: "70%",
															flexDirection: "row",
															alignItems: "center",
															marginRight: 10,
														}}
													>
														<Ionicons
															name="location-outline"
															size={15}
															color={color.greyText}
														/>
														<Text
															style={{ color: color.greyText, fontSize: 14 }}
															numberOfLines={1}
														>
															{item?.locationId}
														</Text>
													</View>
												) : null}
												<View
													style={{
														flexDirection: "row",
														width: "30%",
														alignItems: "center",
													}}
												>
													<MaterialIcons
														name="access-time"
														size={15}
														color={color.greyText}
													/>
													<Text
														numberOfLines={1}
														style={{
															color: color.greyText,
															fontSize: 14,
															marginLeft: 2,
														}}
													>
														{convertTime(item?.createdOn)}
													</Text>
												</View>
											</View>
										</View>

										<View
											style={{
												// width: "10%",
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "flex-end",
												marginRight: 14,
											}}
										>
											{systemUserId === item?.authorId ? (
												<AppMenu
													menuColor={color.black}
													menuContent={[
														{
															icon: "delete",
															label: "Delete post",
															onPress: () => {
																deletePost(item.id);
																goBack();
															},
														},
													]}
												/>
											) : (
												<AppMenu
													menuColor={color.black}
													menuContent={[
														{
															icon: "account-minus",
															label: "Report this feed",
															onPress: () => console.log("report feed"),
														},
													]}
												/>
											)}
										</View>
									</View>
								</View>

								{/* APP TITLE */}

								{/* <Text style={styles.postTitle}>{item.post}</Text> */}

								{/* POST */}

								{item?.text?.length > 0 && (
									<ViewMoreText
										numberOfLines={10}
										renderViewMore={renderViewMore}
										renderViewLess={renderViewLess}
										textStyle={{
											width: "95%",
											alignSelf: "center",
											paddingLeft: 10,
											marginTop: 10,
											marginBottom: 8,
										}}
									>
										<Text>{item?.text.trim()}</Text>
									</ViewMoreText>
								)}

								{item?.mediaContent?.length > 0 && (
									<View
										style={{
											width: "95%",
											alignSelf: "center",
											marginTop: item?.text?.length === 0 ? 10 : 0,
										}}
									>
										{item?.mediaContent && (
											<FeedContent item={item?.mediaContent} />
										)}
									</View>
								)}

								<View
									style={{
										flexDirection: "row",
										position: "absolute",
										bottom: 80,
										width: "95%",
										paddingLeft: 10,
										alignSelf: "center",
									}}
								>
									<View
										style={{
											alignItems: "center",
											flexDirection: "row",
										}}
									>
										<Reaction
											postId={item?.id}
											reaction={reaction}
											setReaction={setReaction}
											selectedReaction={selectedReaction}
											setSelectedReaction={setSelectedReaction}
											setShowReaction={setShowReaction}
											showReaction={showReaction}
											size={20}
											ourLike={item?.reactions?.filter(
												(ele) => ele.userId === systemUserId
											)}
										/>

										<Text
											style={{
												color: color.greyText,
												fontSize: 12,
												paddingLeft: 10,
											}}
											onPress={() =>
												navigate("ViewLike", { userReaction: item?.reactions })
											}
										>
											{item?.totalReactions}
										</Text>
									</View>
									<View
										style={{
											alignItems: "center",
											flexDirection: "row",
											marginLeft: 20,
										}}
									>
										<AppFabButton
											size={16}
											onPress={() => navigate("Comment", { postId: item?.id })}
											icon={
												<Ionicons
													name="chatbubble-outline"
													color={color.greyText}
													size={20}
												/>
											}
										/>

										<Text style={{ color: color.greyText, fontSize: 12 }}>
											{item?.totalComments}
										</Text>
									</View>
									<View style={{ position: "absolute", right: 0 }}>
										<AppFabButton
											onPress={() =>
												onShare(
													cloudinaryFeedUrl(
														item?.mediaContent[0].src,
														item?.mediaContent[0].mimeType.split("/")[0]
													)
												)
											}
											// onPress={() => sharePost(item?.text, item?.mediaContent)}
											size={16}
											icon={
												<MaterialCommunityIcons
													name="share-variant"
													color={color.greyText}
													size={20}
												/>
											}
										/>
									</View>
								</View>
								<TouchableWithoutFeedback
									onPress={() => navigate("Comment", { postId: item?.id })}
								>
									<View
										style={{
											backgroundColor: color.lightGrey,
											justifyContent: "center",
											width: "95%",
											alignSelf: "center",
											height: 40,
											position: "absolute",
											bottom: 20,
											borderRadius: 10,
										}}
									>
										<Text
											style={{
												paddingLeft: 10,
												fontSize: 18,
												color: color.greyText,
											}}
											onPress={() => navigate("Comment", { postId: item?.id })}
										>
											Type your comment here...
										</Text>
									</View>
								</TouchableWithoutFeedback>
								{/* LIKE VIEW */}
								{/* 
									<View
										style={{
										paddingLeft: "5%",

										flexDirection: "row",
										width: "95%",
										alignItems: "center",
										marginTop: 8,
										}}
									>
										<Image
										source={item.profile}
										style={{ height: 30, width: 30, borderRadius: 15 }}
										/>
										<Text style={{ fontSize: 14, marginLeft: 8 }}>
										Liked by Shivaram & 123.234 Others
										</Text>
									</View> */}
							</View>
						</SafeAreaView>
					)}
					{/* <View style={{ position: "absolute", height: "100%", width: "100%" }}> */}
					{open && (
						<MenuModalBottomSheet
							setOpen={setOpen}
							refRBSheet={refRBSheet}
							modalItem={[
								{
									label: "report",
									icon: "plus",
									onPress: () => console.log("report pressed"),
								},
								{
									label: "report",
									icon: "plus",
									onPress: () => console.log("report pressed"),
								},
								{
									label: "report",
									icon: "plus",
									onPress: () => console.log("report pressed"),
								},
							]}
						/>
					)}
					{/* </View> */}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	moreText: {
		flexDirection: "row",
		width: "95%",
		alignSelf: "center",
		marginLeft: 20,
		alignItems: "center",
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
		height: "100%",
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

	// postTitle: {
	//   paddingLeft: "5%",
	//   marginRight: 10,
	//   fontSize: 14,
	//   color: "#3a3d3f",
	//   marginTop: 16,
	//   lineHeight: 20,
	//   marginBottom: -35, // post image margin
	// },
});

export default memo(SinglePost);
