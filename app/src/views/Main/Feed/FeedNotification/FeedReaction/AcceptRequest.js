import React from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MarkAsReadNotification } from "../../../../../helper/services/BanjeeNotification";
import { listProfileUrl } from "../../../../../utils/util-func/constantExport";
import color from "../../../../../constants/env/color";
import { Avatar, Text } from "native-base";

function AcceptRequest({ item }) {
	const {
		contents: {
			toUser: { avtarUrl, firstName, id: userId },
		},
	} = item;
	const { navigate } = useNavigation();
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
					onPress={() => navigate("BanjeeProfile", { item: { id: userId } })}
				>
					{/* <Image
						// onError={({ nativeEvent: { error } }) => setImageError(error)}
						source={
							// imageError
							//   ? checkGender(item?.gender)
							// :
							{ uri: listProfileUrl(userId) }
						}
						style={{ height: 40, width: 40, borderRadius: 20 }}
					/> */}
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
					onPress={() => navigate("BanjeeProfile", { item: { id: userId } })}
				>
					<Text
						style={{ fontWeight: "bold" }}
						onPress={() => navigate("BanjeeProfile", { item: { id: userId } })}
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
