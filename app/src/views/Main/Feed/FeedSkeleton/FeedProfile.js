import { useNavigation } from "@react-navigation/native";
import React, { Fragment } from "react";
import { TouchableWithoutFeedback, Image } from "react-native";
import { useSelector } from "react-redux";
import { profileUrl } from "../../../../utils/util-func/constantExport";

export default function FeedProfile({ item }) {
	const {
		registry: { systemUserId },
		feed: { screen },
	} = useSelector((state) => state);

	const { navigate } = useNavigation();

	const navigateToPage = () => {
		if (systemUserId === item.authorId) {
			navigate("Profile");
		} else {
			navigate("BanjeeProfile", { item: { id: item.authorId } });
		}
	};

	const renderProfile = () => {
		return item?.author?.avtarUrl
			? { uri: profileUrl(item?.author?.avtarUrl) }
			: require("../../../../../assets/EditDrawerIcon/neutral_placeholder.png");
	};

	return (
		<Fragment>
			{screen === "ALL" && (
				<TouchableWithoutFeedback onPress={navigateToPage}>
					<Image
						source={renderProfile()}
						// source={{ uri: profileUrl(userData?.avtarUrl) }}
						// source={item.avtarUrl}
						style={{ height: 40, width: 40, borderRadius: 20 }}
					/>
				</TouchableWithoutFeedback>
			)}
		</Fragment>
	);
}
