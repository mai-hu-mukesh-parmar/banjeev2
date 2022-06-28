import { Text } from "native-base";
import React from "react";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import {
	listProfileUrl,
	profileUrl,
} from "../../../../utils/util-func/constantExport";
import { convertTime } from "../../../../utils/util-func/convertTime";
import Reaction from "../Reaction";

function AllComments({
	item,
	setCommentId,
	refRBSheet,
	setReply,
	setDelComment,
}) {
	const [showReaction, setShowReaction] = React.useState(false); //for reaction
	const [selectedReaction, setSelectedReaction] = React.useState();
	const [reaction, setReaction] = React.useState();
	const [imageError, setImageError] = React.useState();
	const { currentUser, systemUserId } = useSelector((state) => state.registry);
	const [open, setOpen] = React.useState(false);
	function deleteComment() {
		if (currentUser.id === item.createdByUser) {
			setCommentId(item.id);
			setDelComment(true);
		}
		if (currentUser.id === item.createdBy) {
			setCommentId(item.id);
			setDelComment(true);
		}
	}

	return (
		<TouchableWithoutFeedback onLongPress={deleteComment}>
			<View style={{ zIndex: 9999 }}>
				<View style={styles.container}>
					<Image
						onError={({ nativeEvent: { error } }) => {
							setImageError(error);
						}}
						source={
							imageError
								? require("../../../../../assets/EditDrawerIcon/neutral_placeholder.png")
								: {
										uri: listProfileUrl(item?.createdByUser?.id),
								  }
						}
						style={styles.img}
					/>

					<View style={styles.view}>
						<Text style={{ fontSize: 14 }}>
							{item?.createdByUser?.username}
						</Text>

						<Text style={{ marginTop: 3 }} onLongPress={deleteComment}>
							{item?.text}
						</Text>

						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={{ fontSize: 12 }}>
								{convertTime(item?.createdOn)}
							</Text>

							<Reaction
								likeComment={true}
								postId={item?.id}
								reaction={reaction}
								setReaction={setReaction}
								selectedReaction={selectedReaction}
								setSelectedReaction={setSelectedReaction}
								showReaction={showReaction}
								setShowReaction={setShowReaction}
								size={16}
								marginLeft={5}
								ourLike={item?.reactions?.filter(
									(ele) => ele.userId === systemUserId
								)}
							/>

							<Text
								onPress={() => {
									setOpen(refRBSheet.current.open());
									setCommentId(item.id);
								}}
								style={{
									color: color.greyText,
									marginLeft: 3,
									fontSize: 14,
									paddingHorizontal: 5,
								}}
							>
								{item?.totalReactions}
							</Text>

							<Text
								onPress={() =>
									setReply({
										replyToCommentId: item?.id,
										feedId: item.feedId,
										text: item.text,
									})
								}
								style={{
									fontSize: 12,
									color: color.greyText,
									marginLeft: 20,
								}}
							>
								Reply
							</Text>
						</View>

						{/*```````````````` COMMENT OF COMMENT ````````````````*/}

						{item?.replies &&
							item?.replies.map((ele, i) => (
								<View
									key={i}
									style={{
										flexDirection: "row",
										alignItems: "center",
										marginTop: 10,
									}}
								>
									<Image
										source={{
											uri: profileUrl(ele?.createdByUser?.avtarUrl),
										}}
										style={{
											height: 25,
											width: 25,
											borderRadius: 15,
											borderWidth: 1,
											borderColor: "white",
											marginRight: 10,
										}}
									/>
									<View>
										<Text style={{ fontSize: 12 }}>
											{ele?.createdByUser?.username}
										</Text>

										<Text style={{ marginTop: 3 }}>{ele?.text}</Text>

										<Text style={{ fontSize: 12 }}>
											{convertTime(ele?.createdOn)}
										</Text>
									</View>
								</View>
							))}
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingTop: 5,
		paddingBottom: 15,
	},
	img: {
		height: 40,
		width: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "white",
		marginRight: 10,
		marginLeft: 16,
	},
	view: {
		width: (Dimensions.get("window").width = "70%"),
		flexDirection: "column",
	},
});

export default AllComments;
