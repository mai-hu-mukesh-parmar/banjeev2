import { Text } from "native-base";
import React from "react";
import { View } from "react-native";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import Reaction from "../Reaction";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import color from "../../../../constants/env/color";
import { useSelector } from "react-redux";
import { sharePost } from "../../../Other/ShareApp";
import { cloudinaryFeedUrl } from "../../../../utils/util-func/constantExport";
export default function FeedFooter({ item }) {
	const { navigate } = useNavigation();
	const {
		registry: { systemUserId },
	} = useSelector((state) => state);

	return (
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
					onPress={() => {
						console.log(
							"item.text, item.mediaContent",

							JSON.stringify(item)
						);
						sharePost(
							item?.mediaContent.length > 0 &&
								cloudinaryFeedUrl(
									item?.mediaContent[0]?.src,
									item?.mediaContent[0]?.mimeType?.split("/")[0]
								),
							item?.mediaContent[0]?.mimeType?.split("/")[0],
							item?.text,
							item.id,
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
	);
}
