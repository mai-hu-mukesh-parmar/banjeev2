import { Avatar, Text } from "native-base";
import React, { Fragment } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { listProfileUrl } from "../../../../utils/util-func/constantExport";

function LikedBy({ item, increementLike }) {
	const { systemUserId } = useSelector((state) => state.registry);

	let ourId = item?.reactions?.filter(
		(ele) => ele?.userId === systemUserId
	)?.[0]?.userId;

	// let ourId = ourData[0]?.userId;
	return (
		<Fragment>
			{item?.reactions?.length === 1 ? (
				<View style={[styles.container, { marginTop: 5 }]}>
					<Avatar
						size={"xs"}
						source={{ uri: listProfileUrl(item?.reactions?.[0]?.userId) }}
						style={{
							borderRadius: 50,
						}}
					>
						<Text>{item?.reactions?.[0]?.user?.username}</Text>
					</Avatar>
					<Text style={{ fontSize: 14, marginLeft: 8 }}>
						Liked by{" "}
						<Text fontWeight={"bold"}>
							{" "}
							{ourId === systemUserId
								? "you"
								: item?.reactions?.[0]?.user?.username}{" "}
						</Text>
					</Text>
				</View>
			) : (
				item?.totalReactions > 0 && (
					<View
						style={[styles.container, { marginBottom: -15, marginTop: -5 }]}
					>
						<Avatar.Group
							_avatar={{ size: "xs" }}
							h={"12"}
							max={3}
							style={styles.grp}
						>
							{item?.reactions?.map((img, i) => {
								return (
									<Avatar
										key={i}
										source={{ uri: listProfileUrl(img.userId) }}
										style={{
											borderWidth: 1,
										}}
									>
										<Text>{img?.user?.username?.charAt(0).toUpperCase()}</Text>
									</Avatar>
								);
							})}
						</Avatar.Group>

						<Text style={{ fontSize: 14, marginLeft: 8 }}>
							Liked by{" "}
							<Text fontWeight={"bold"}>
								{" "}
								{increementLike !== 0
									? "You"
									: item?.reactions?.[0]?.user?.username}
							</Text>{" "}
							&{" "}
							{increementLike !== 0
								? item?.reactions?.length
								: item?.reactions?.length - 1}{" "}
							other.
						</Text>
					</View>
				)
			)}
		</Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: "5%",
		flexDirection: "row",
		width: "95%",
		alignItems: "center",
	},
	grp: {
		position: "relative",
		borderRadius: 50,
		alignItems: "center",
	},
});

export default LikedBy;
