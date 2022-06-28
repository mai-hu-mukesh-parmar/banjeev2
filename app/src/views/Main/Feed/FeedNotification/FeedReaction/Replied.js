import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import color from "../../../../../constants/env/color";
import { MarkAsReadNotification } from "../../../../../helper/services/BanjeeNotification";
import { profileUrl } from "../../../../../utils/util-func/constantExport";

function Replied({ item }) {
	const { navigate } = useNavigation();
	const {
		contents: {
			payload: {
				feedId,
				createdByUser: { avtarUrl, username, id: userId },
			},
		},
	} = item;

	function onClickNavigate() {
		navigate("SinglePost", { feedId: feedId });
		MarkAsReadNotification(item.id);
	}
	return (
		<TouchableWithoutFeedback onPress={onClickNavigate}>
			<View
				style={[
					styles.container,
					{ backgroundColor: item.markAsRead ? color.white : "#dadaef" },
				]}
			>
				<TouchableWithoutFeedback
					onPress={() => navigate("BanjeeProfile", { item: { id: userId } })}
				>
					<Image
						source={{ uri: profileUrl(avtarUrl) }}
						style={{ height: 40, width: 40, borderRadius: 20 }}
					/>
				</TouchableWithoutFeedback>

				<Text style={{ marginLeft: 20 }}>
					<Text style={{ fontWeight: "bold" }} onPress={onClickNavigate}>
						{username}{" "}
					</Text>
					replied your comment.
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
});

export default Replied;
