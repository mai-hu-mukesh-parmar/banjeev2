import { useNavigation } from "@react-navigation/native";
import { Avatar, Text } from "native-base";
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";
import color from "../../../../../constants/env/color";
import { MarkAsReadNotification } from "../../../../../helper/services/BanjeeNotification";
import { getProfile } from "../../../../../redux/store/action/Profile/userPendingConnection";
import {
	listProfileUrl,
	profileUrl,
} from "../../../../../utils/util-func/constantExport";
import FastImage from "react-native-fast-image";

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
	const dispatch = useDispatch();
	return (
		<TouchableWithoutFeedback onPress={onClickNavigate}>
			<View
				style={[
					styles.container,
					{ backgroundColor: item.markAsRead ? color.white : "#dadaef" },
				]}
			>
				<TouchableWithoutFeedback
					onPress={() => {
						dispatch(getProfile({ profileId: userId }));
						navigate("BanjeeProfile");
					}}
				>
					{/* <FastImage
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
