import { Avatar, Text } from "native-base";
import React, { Fragment, useState } from "react";
import { View, StyleSheet } from "react-native";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import Reaction from "../Reaction";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import color from "../../../../constants/env/color";
import { useSelector } from "react-redux";
import { sharePost } from "../../../Other/ShareApp";
import {
	cloudinaryFeedUrl,
	listProfileUrl,
} from "../../../../utils/util-func/constantExport";
import LikedBy from "../Like/LikedBy";

export default function FeedFooter({ item, singlePost }) {
	const { navigate } = useNavigation();
	const {
		registry: { systemUserId },
	} = useSelector((state) => state);

	const [increementLike, setIncreementLike] = React.useState(0);
	return (
		<Fragment>
			<View style={styles.container}>
				<View style={styles.reactionView}>
					<Reaction
						postId={item?.id}
						size={18}
						ourLike={item?.reactions?.filter(
							(ele) => ele.userId === systemUserId
						)}
						setIncreementLike={setIncreementLike}
					/>

					<Text
						style={styles.reactionCount}
						onPress={() =>
							navigate("ViewLike", {
								userReaction: item?.reactions,
								increementLike: increementLike,
							})
						}
					>
						{increementLike !== 0
							? item?.totalReactions + 1
							: item?.totalReactions}
						{/* {likeCount} */}
					</Text>
				</View>

				<View style={styles.commentView}>
					<AppFabButton
						size={16}
						onPress={() => navigate("Comment", { postId: item?.id })}
						icon={
							<Ionicons
								name="chatbubble-outline"
								color={color.greyText}
								size={18}
							/>
						}
					/>

					<Text style={{ color: color.greyText, fontSize: 12 }}>
						{item?.totalComments}
					</Text>
				</View>

				<View style={{ position: "absolute", right: 0 }}>
					<AppFabButton
						onPress={() => {
							sharePost(
								item?.mediaContent.length > 0 &&
									cloudinaryFeedUrl(
										item?.mediaContent[0]?.src,
										item?.mediaContent[0]?.mimeType?.split("/")[0]
									),
								item?.mediaContent[0]?.mimeType?.split("/")[0],
								item?.text,
								item?.id,
								item?.mediaContent[0]?.src
							);
						}}
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

			{!singlePost && <LikedBy item={item} increementLike={increementLike} />}
		</Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginTop: -10,
		width: "95%",
		paddingLeft: 10,
		alignSelf: "center",
	},
	reactionView: {
		alignItems: "center",
		flexDirection: "row",
	},
	reactionCount: { color: color.greyText, fontSize: 12, paddingLeft: 10 },
	commentView: {
		alignItems: "center",
		flexDirection: "row",
		marginLeft: 20,
	},
});
