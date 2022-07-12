import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MarkAsReadNotification } from "../../../../../helper/services/BanjeeNotification";
import { listProfileUrl } from "../../../../../utils/util-func/constantExport";
import color from "../../../../../constants/env/color";
import { Avatar, Text } from "native-base";
import { getProfile } from "../../../../../redux/store/action/Profile/userPendingConnection";
import { useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
function AcceptRequest({ item }) {
	const {
		contents: {
			toUser: { firstName, id: userId },
		},
	} = item;
	const { navigate } = useNavigation();
	const dispatch = useDispatch();
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				navigate("BanjeeProfile", { item: { id: userId } });
				MarkAsReadNotification(item.id);
			}}
		>
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
					<Avatar
						bgColor={color.primary}
						style={{ height: 40, width: 40, borderRadius: 20 }}
						source={{ uri: listProfileUrl(userId) }}
					>
						{firstName?.charAt(0).toUpperCase() || ""}
					</Avatar>
				</TouchableWithoutFeedback>

				<Text
					style={{ marginLeft: 20 }}
					onPress={() => {
						dispatch(getProfile({ profileId: userId }));
						navigate("BanjeeProfile");
					}}
				>
					<Text
						style={{ fontWeight: "bold" }}
						onPress={() => {
							dispatch(getProfile({ profileId: userId }));
							navigate("BanjeeProfile");
						}}
					>
						{firstName}
					</Text>{" "}
					has accepted your friend request.
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

export default AcceptRequest;
