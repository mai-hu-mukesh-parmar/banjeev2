import { Text } from "native-base";
import React, { Fragment } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AppMenu from "../../../../constants/components/ui-component/AppMenu";
import { convertTime } from "../../../../utils/util-func/convertTime";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import color from "../../../../constants/env/color";

export default function FeedHeader({ item, setDeletePostModal, setPostId }) {
	const { navigate } = useNavigation();
	const {
		registry: { systemUserId },
		feed: { screen },
	} = useSelector((state) => state);

	const navigateToSinglePost = () => {
		navigate("SinglePost", {
			newItem: item,
			myPost: screen === "ALL",
		});
	};

	return (
		<Fragment>
			<TouchableWithoutFeedback onPress={navigateToSinglePost}>
				<View style={styles.header}>
					{screen === "ALL" && (
						<Text numberOfLines={1} style={{ fontWeight: "bold" }}>
							{item?.author?.username}
						</Text>
					)}

					<View style={{ flexDirection: "row" }}>
						{item?.locationId ? (
							<View style={styles.location}>
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
						<View style={styles.btnView}>
							<MaterialIcons
								name="access-time"
								size={15}
								color={color.greyText}
							/>
							<Text numberOfLines={1} style={styles.time}>
								{convertTime(item?.createdOn)}
							</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>

			<View style={styles.menu}>
				{systemUserId === item?.authorId ? (
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
		</Fragment>
	);
}

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "100%",
		overflow: "hidden",
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: "lightgrey",
	},
	location: {
		maxWidth: "50%",
		// Width: "70%",
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
	},
	btnView: {
		flexDirection: "row",
		width: "30%",
		alignItems: "center",
	},
	time: {
		color: color.greyText,
		fontSize: 14,
		marginLeft: 2,
	},
	menu: {
		right: 14,
		alignSelf: "center",
		position: "absolute",
	},
});
