import React, { useEffect } from "react";
import { View, StyleSheet, VirtualizedList, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";
import { listProfileUrl } from "../../../../utils/util-func/constantExport";
import color from "../../../../constants/env/color";
import { emojies } from "../../../../utils/util-func/emojies";
import { commentLike } from "../../../../helper/services/CommentLikes";

function ReactionSheet({ refRBSheet, id }) {
	const [data, setData] = React.useState([]);

	useEffect(() => {
		commentLike(id)
			.then((res) => {
				// console.warn("------->", res);
				setData(res);
			})
			.catch((err) => console.log(err));
	}, [id]);

	return (
		<RBSheet
			customStyles={{ container: { borderRadius: 10 } }}
			height={400}
			ref={refRBSheet}
			dragFromTopOnly={true}
			closeOnDragDown={true}
			closeOnPressMask={true}
			draggableIcon
		>
			<ScrollView>
				{data.length > 0 &&
					data.map((ele, i) => (
						<View style={styles.container} key={i}>
							<View style={styles.subContainer}>
								<FastImage
									source={
										ele?.user?.id
											? { uri: listProfileUrl(ele?.user?.id) }
											: require("../../../../../assets/EditDrawerIcon/neutral_placeholder.png")
									}
									style={styles.img}
								/>
								{emojies(ele?.reactionType, false, 18)}
							</View>

							<View style={styles.name}>
								<Text style={{ width: "80%" }} numberOfLines={3}>
									{ele?.user?.username}
								</Text>
							</View>
						</View>
					))}
			</ScrollView>
		</RBSheet>
	);
}

const styles = StyleSheet.create({
	// bottomsheet: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
	container: {
		zIndex: 1,
		alignItems: "center",
		flexDirection: "row",
	},
	subContainer: {
		height: 40,
		width: 40,
		marginLeft: 10,
		marginRight: 20,
		position: "relative",
		alignItems: "center",
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

export default ReactionSheet;
