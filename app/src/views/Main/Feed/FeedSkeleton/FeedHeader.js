import { Text } from "native-base";
import React, { Fragment } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
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

	const navigateToSinglePost = () =>
		navigate("SinglePost", {
			newItem: item,
			myPost: screen === "ALL",
		});

	return (
		<Fragment>
			<TouchableWithoutFeedback onPress={navigateToSinglePost}>
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
		</Fragment>
	);
}
