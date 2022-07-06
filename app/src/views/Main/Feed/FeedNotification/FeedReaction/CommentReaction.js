import React from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import { MarkAsReadNotification } from "../../../../../helper/services/BanjeeNotification";
import {
	listProfileUrl,
	profileUrl,
} from "../../../../../utils/util-func/constantExport";

import { useNavigation } from "@react-navigation/native";
import color from "../../../../../constants/env/color";
import { emojies } from "../../../../../utils/util-func/emojies";
import { Avatar, Text } from "native-base";

function CommentReaction({ item }) {
	const { navigate } = useNavigation();

	const {
		id,
		markAsRead,
		contents: {
			nodeId,
			reactionType,
			user: { avtarUrl, username, id: userId },
		},
	} = item;

	function onClickNavigate() {
		navigate("SinglePost", { feedId: id });
		MarkAsReadNotification(id);
	}
	return (
		<TouchableWithoutFeedback onPress={onClickNavigate}>
			<View
				style={[
					styles.container,
					{ backgroundColor: markAsRead ? color.white : "#dadaef" },
				]}
			>
				<TouchableWithoutFeedback
					onPress={() => navigate("BanjeeProfile", { item: { id: userId } })}
				>
					<View style={styles.subContainer}>
						{/* <Image
							source={{ uri: profileUrl(avtarUrl) }}
							style={{ height: 40, width: 40, borderRadius: 20 }}
						/> */}
						<Avatar
							bgColor={color.primary}
							style={{ height: 40, width: 40, borderRadius: 20 }}
							source={{ uri: listProfileUrl(userId) }}
						>
							{username?.charAt(0).toUpperCase() || ""}
						</Avatar>
						{emojies(reactionType, false, 18)}
					</View>
				</TouchableWithoutFeedback>
				<Text style={{ marginLeft: 20 }}>
					<Text style={{ fontWeight: "bold" }} onPress={onClickNavigate}>
						{username}
					</Text>{" "}
					reacted on your comment.
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 10,
		width: "100%",
		height: "100%",
		borderBottomWidth: 0.5,
	},
	subContainer: {
		height: 40,
		width: 40,
		position: "relative",
	},
});

export default CommentReaction;
