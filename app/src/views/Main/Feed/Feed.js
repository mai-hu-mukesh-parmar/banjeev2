import React, { memo, useEffect } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import {
	MaterialCommunityIcons,
	MaterialIcons,
	Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ViewMoreText from "react-native-view-more-text";
import { useSelector } from "react-redux";
import { Text } from "native-base";
import color from "../../../constants/env/color";
import { convertTime } from "../../../utils/util-func/convertTime";
import AppMenu from "../../../constants/components/ui-component/AppMenu";
import Reaction from "./Reaction";
import FeedContent from "./FeedContent";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import { profileUrl } from "../../../utils/util-func/constantExport";

function Feed({ item, myFeed, allFeed, setDeletePostModal, setPostId }) {
	const { navigate } = useNavigation();
	const [newItem] = React.useState(item);
	const [showReaction, setShowReaction] = React.useState(false); //fr reaction
	const [selectedReaction, setSelectedReaction] = React.useState();
	const [reaction, setReaction] = React.useState();
	const {
		registry: { systemUserId },
		feed: { screen },
	} = useSelector((state) => state);

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
			navigate("NewSetting");
		} else {
			navigate("BanjeeProfile", { item: { id: item.authorId } });
		}
	}

	return (
		<View style={styles.mainView}>
			<View style={styles.grid}>
				{screen === "ALL" && (
					<TouchableWithoutFeedback onPress={() => seeProfile()}>
						<Image
							source={
								item?.author?.avtarUrl
									? { uri: profileUrl(item?.author?.avtarUrl) }
									: require("../../../../assets/EditDrawerIcon/neutral_placeholder.png")
							}
							// source={{ uri: profileUrl(userData?.avtarUrl) }}
							// source={item.avtarUrl}
							style={{ height: 40, width: 40, borderRadius: 20 }}
						/>
					</TouchableWithoutFeedback>
				)}
				<View style={styles.header}>
					<TouchableWithoutFeedback
						onPress={() =>
							navigate("SinglePost", {
								newItem: item,
								myPost: screen === "ALL",
							})
						}
					>
						<View
							style={{
								width: "85%",
								height: "100%",
								overflow: "hidden",
								justifyContent: "center",
							}}
						>
							{screen === "ALL" && (
								<Text numberOfLines={1} style={{ fontWeight: "bold" }}>
									{item?.author?.username}
								</Text>
							)}

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
										{convertTime(item.createdOn)}
									</Text>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
					<View
						style={{
							// width: "10%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "flex-end",
							marginRight: 14,
						}}
					>
						{systemUserId === item.authorId ? (
							<AppMenu
								menuColor={color.black}
								menuContent={[
									{
										icon: "delete",
										label: "Delete post",
										onPress: () => {
											setDeletePostModal(true);
											setPostId(item.id);
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
					numberOfLines={3}
					renderViewMore={renderViewMore}
					renderViewLess={renderViewLess}
					textStyle={{
						width: "95%",
						alignSelf: "center",
						paddingLeft: 10,
						marginTop: 10,
						marginBottom: 20,
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
						<FeedContent item={item?.mediaContent} iData={item} />
					)}
				</View>
			)}

			<View
				style={{
					flexDirection: "row",
					marginTop: -10,
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
						postId={item.id}
						reaction={reaction}
						setReaction={setReaction}
						selectedReaction={selectedReaction}
						setSelectedReaction={setSelectedReaction}
						setShowReaction={setShowReaction}
						showReaction={showReaction}
						size={18}
						ourLike={item?.reactions?.filter(
							(ele) => ele.userId === systemUserId
						)}
					/>

					<Text
						style={{ color: color.greyText, fontSize: 12, paddingLeft: 10 }}
						onPress={() =>
							navigate("ViewLike", { userReaction: item?.reactions })
						}
					>
						{item.totalReactions}
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
						onPress={() => navigate("Comment", { postId: item.id })}
						icon={
							<Ionicons
								name="chatbubble-outline"
								color={color.greyText}
								size={18}
							/>
						}
					/>

					<Text style={{ color: color.greyText, fontSize: 12 }}>
						{item.totalComments}
					</Text>
				</View>
				<View style={{ position: "absolute", right: 0 }}>
					<AppFabButton
						onPress={() => sharePost(item.text, item.mediaContent)}
						size={16}
						icon={
							<MaterialCommunityIcons
								name="share-variant"
								color={color.greyText}
								size={18}
							/>
						}
					/>
				</View>
			</View>

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

export default memo(Feed);
