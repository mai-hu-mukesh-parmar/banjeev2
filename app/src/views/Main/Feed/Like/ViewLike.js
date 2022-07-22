import { useRoute } from "@react-navigation/native";
import { Avatar, Text } from "native-base";
import React, { Fragment } from "react";
import { View, StyleSheet, VirtualizedList, Image } from "react-native";
import { useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import {
	listProfileUrl,
	profileUrl,
} from "../../../../utils/util-func/constantExport";
import { emojies } from "../../../../utils/util-func/emojies";

function ViewLike() {
	const {
		params: { userReaction, increementLike },
	} = useRoute();

	const [data] = React.useState(userReaction ? userReaction : []);
	const {
		systemUserId,
		currentUser: { userName: name },
	} = useSelector((state) => state.registry);
	function renderItem({ item, index }) {
		const { username, id } = item.user;
		const { reactionType } = item;

		// {
		// 	index === 0 && (
		// 		<Fragment>
		// 			{increementLike ? (
		// 				<View style={styles.container}>
		// 					<View style={styles.subContainer}>
		// 						<Avatar
		// 							bgColor={color.primary}
		// 							style={styles.img}
		// 							source={{ uri: listProfileUrl(systemUserId) }}
		// 						>
		// 							{name?.charAt(0).toUpperCase() || ""}
		// 						</Avatar>
		// 						{emojies(increementLike, false, 18)}
		// 					</View>
		// 					<View style={styles.name}>
		// 						<Text style={{ width: "80%" }} numberOfLines={3}>
		// 							{name}
		// 						</Text>
		// 					</View>
		// 				</View>
		// 			) : null}
		// 		</Fragment>
		// 	);
		// }
		return (
			<Fragment>
				<View style={styles.container}>
					<View style={styles.subContainer}>
						<Avatar
							bgColor={color.primary}
							style={styles.img}
							source={{ uri: listProfileUrl(id) }}
						>
							{item?.username?.charAt(0).toUpperCase() || ""}
						</Avatar>
						{emojies(reactionType, false, 18)}
					</View>
					<View style={styles.name}>
						<Text style={{ width: "80%" }} numberOfLines={3}>
							{username}
						</Text>
					</View>
				</View>
			</Fragment>
		);
	}

	return (
		<View style={{ height: "100%", width: "100%" }}>
			{data.length === 0 && !increementLike && (
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
			<Fragment>
				{increementLike ? (
					<View style={styles.container}>
						<View style={styles.subContainer}>
							<Avatar
								bgColor={color.primary}
								style={styles.img}
								source={{ uri: listProfileUrl(systemUserId) }}
							>
								{name?.charAt(0).toUpperCase() || ""}
							</Avatar>
							{emojies(increementLike, false, 18)}
						</View>
						<View style={styles.name}>
							<Text style={{ width: "80%" }} numberOfLines={3}>
								{name}
							</Text>
						</View>
					</View>
				) : null}
			</Fragment>

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
