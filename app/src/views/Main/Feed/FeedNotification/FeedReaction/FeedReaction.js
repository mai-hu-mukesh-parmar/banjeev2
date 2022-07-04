import React from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { MarkAsReadNotification } from "../../../../../helper/services/BanjeeNotification";
import { profileUrl } from "../../../../../utils/util-func/constantExport";

import { useNavigation } from "@react-navigation/native";
import { emojies } from "../../../../../utils/util-func/emojies";
import color from "../../../../../constants/env/color";
import { Text } from "native-base";

function FeedReaction({ item }) {
	const {
		id,
		markAsRead,
		contents: {
			nodeId,
			reactionType,
			user: { avtarUrl, username, id: userId },
		},
	} = item;

	const { navigate } = useNavigation();

	function onClickNavigate() {
		navigate("SinglePost", { feedId: nodeId });
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
						<Image
							source={{ uri: profileUrl(avtarUrl) }}
							style={{ height: 40, width: 40, borderRadius: 20 }}
						/>
						{emojies(reactionType, false, 18)}
					</View>
				</TouchableWithoutFeedback>
				<Text style={{ marginLeft: 20 }}>
					<Text style={{ fontWeight: "bold" }} onPress={onClickNavigate}>
						{username}
					</Text>{" "}
					reacted on your post.
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

export default FeedReaction;
