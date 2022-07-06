import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";
import React, { Fragment } from "react";
import { TouchableWithoutFeedback, Image } from "react-native";
import { useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import {
	listProfileUrl,
	profileUrl,
} from "../../../../utils/util-func/constantExport";

export default function FeedProfile({ item }) {
	const {
		registry: { systemUserId },
		feed: { screen },
	} = useSelector((state) => state);

	const { navigate } = useNavigation();
	console.warn(item.author);

	const navigateToPage = () => {
		if (systemUserId === item.authorId) {
			navigate("Profile");
		} else {
			navigate("BanjeeProfile", { item: { id: item.authorId } });
		}
	};

	return (
		<Fragment>
			{screen === "ALL" && (
				<TouchableWithoutFeedback onPress={navigateToPage}>
					<Avatar
						bgColor={color.primary}
						style={{ height: 40, width: 40, borderRadius: 20 }}
						source={{ uri: listProfileUrl(item?.author?.id) }}
					>
						{item?.author?.username?.charAt(0).toUpperCase() || ""}
					</Avatar>
				</TouchableWithoutFeedback>
			)}
		</Fragment>
	);
}
