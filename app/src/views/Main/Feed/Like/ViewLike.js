import { useRoute } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import { View, StyleSheet, VirtualizedList, Image } from "react-native";
import color from "../../../../constants/env/color";
import { profileUrl } from "../../../../utils/util-func/constantExport";
import { emojies } from "../../../../utils/util-func/emojies";

function ViewLike() {
	const {
		params: { userReaction },
	} = useRoute();

	const [data] = React.useState(userReaction ? userReaction : []);

	function renderItem({ item }) {
		const { avtarUrl, username } = item.user;
		const { reactionType } = item;

		return (
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<Image
						source={
							avtarUrl
								? { uri: profileUrl(avtarUrl) }
								: require("../../../../../assets/EditDrawerIcon/neutral_placeholder.png")
						}
						style={styles.img}
					/>
					{emojies(reactionType, false, 18)}
				</View>
				<View style={styles.name}>
					<Text style={{ width: "80%" }} numberOfLines={3}>
						{username}
					</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={{ height: "100%", width: "100%" }}>
			{data.length === 0 && (
				<View
					style={{
						height: "100%",
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text> No Likes to this Post...</Text>
				</View>
			)}
			<VirtualizedList
				howsVerticalScrollIndicator={false}
				getItemCount={(data) => data.length}
				getItem={(data, index) => data[index]}
				data={data}
				keyExtractor={(data) => data.id}
				renderItem={renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: 70,
		backgroundColor: color.white,
		alignItems: "center",
		flexDirection: "row",
	},
	subContainer: {
		height: 40,
		width: 40,
		marginLeft: 10,
		marginRight: 20,
		position: "relative",
	},
	img: { height: 40, width: 40, borderRadius: 20 },
	name: {
		width: "100%",
		borderBottomWidth: 0.5,
		borderColor: color.grey,
		height: 70,
		justifyContent: "center",
	},
});

export default ViewLike;
