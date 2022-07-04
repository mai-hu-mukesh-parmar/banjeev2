import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, VirtualizedList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
	listComment,
	postComment,
} from "../../../../helper/services/CommentService";
import { deleteComment } from "../../../../helper/services/DeleteComment";

import { Text } from "native-base";
import AppInput from "../../../../constants/components/ui-component/AppInput";
import ReactionSheet from "./ReactionSheet";
import AllComments from "./AllComments";
import color from "../../../../constants/env/color";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../redux/store/action/toastAction";
function Comment(props) {
	const { params } = useRoute();
	const [text, setText] = React.useState("");
	const [height, setHeight] = React.useState(0);
	const [data, setData] = React.useState([]);
	const [postId] = React.useState(params?.postId);
	const refRBSheet = React.useRef(null);
	const [open, setOpen] = React.useState(false);
	const [commentId, setCommentId] = React.useState();
	const [reply, setReply] = React.useState(false);
	const [delComment, setDelComment] = React.useState(false);
	const dispatch = useDispatch();

	useEffect(() => getComments(), [getComments]);

	const submitComment = React.useCallback(() => {
		if (text.length > 0) {
			postComment({
				feedId: postId,
				text: text,
			})
				.then((res) => {
					setText("");
					getComments();
				})
				.catch((err) => console.log(err));
		} else {
			dispatch(showToast({ open: true, description: "Type comment" }));
		}
	}, [text, postId]);

	const getComments = React.useCallback(() => {
		listComment(postId)
			.then((res) => {
				// console.log(res);
				setData(res);
			})
			.catch((err) => console.log(err));
	}, [postId]);

	function replyToComment() {
		if (text.length > 0) {
			postComment({
				feedId: reply.feedId,
				replyToCommentId: reply.replyToCommentId,
				text: text,
			})
				.then((res) => {
					setReply(false);
					setText("");
					getComments();
				})
				.catch((err) => console.warn(err));
		}
	}

	function deleteCommentFx() {
		deleteComment(commentId).then((res) => {
			setDelComment(false);
			getComments();
		});
	}
	return (
		<React.Fragment>
			<LinearGradient
				style={styles.container}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={["#ffffff", "#eeeeff"]}
			>
				<View style={{ paddingBottom: 70 }}>
					{data?.length > 0 ? (
						<VirtualizedList
							initialScrollIndex={data.length - 1}
							showsVerticalScrollIndicator={false}
							getItemCount={(data) => data.length}
							getItem={(data, index) => data[index]}
							data={data}
							ItemSeparatorComponent={() => (
								<View
									style={{
										width: "100%",
										height: 1,
										backgroundColor: "#FFFFFF",
									}}
								/>
							)}
							keyExtractor={(data) => data.id}
							renderItem={({ item }) => {
								return (
									<AllComments
										refRBSheet={refRBSheet}
										item={item}
										commentOfComment={setText}
										setOpen={setOpen}
										setCommentId={setCommentId}
										setReply={setReply}
										setDelComment={setDelComment}
									/>
								);
							}}
						/>
					) : (
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text>Be the first one to comment...! </Text>
						</View>
					)}
				</View>

				{/*  ```````````````` ADD COMMENT */}

				<View
					style={{
						width: (Dimensions.get("window").width = "95%"),
						alignSelf: "center",
						position: "absolute",
						bottom: 20,
					}}
				>
					{reply.feedId && (
						<View
							style={{
								backgroundColor: "#84959f",
								position: "relative",
								marginBottom: -20,
								height: 40,
								borderTopLeftRadius: 8,
								borderTopRightRadius: 8,
							}}
						>
							<Entypo
								style={{ position: "absolute", top: -8, right: -8, zIndex: 99 }}
								name={"circle-with-cross"}
								size={20}
								onPress={() => setReply(false)}
								color={color.black}
							/>
							<Text style={{ paddingLeft: 8 }} numberOfLines={2}>
								{reply.text}
							</Text>
						</View>
					)}

					<View
						style={{
							position: "relative",

							justifyContent: "center",
						}}
					>
						<AppInput
							value={text}
							multiline={true}
							style={{
								// borderRadius: 20,
								height: height,
								maxHeight: 100,
								minHeight: 40,
							}}
							placeholder={reply.feedId ? "Reply a comment" : "Tap to Comment "}
							onChangeText={(e) => setText(e)}
							onContentSizeChange={(e) =>
								setHeight(e.nativeEvent.contentSize.height)
							}
						/>
						<Ionicons
							name="ios-send-sharp"
							size={20}
							style={{ position: "absolute", right: 10 }}
							color={"grey"}
							onPress={() =>
								reply.feedId ? replyToComment() : submitComment()
							}
						/>
					</View>
				</View>
			</LinearGradient>

			<ReactionSheet refRBSheet={refRBSheet} id={commentId} />

			{delComment && (
				<ConfirmModal
					// title={`Are you sure, you want to unfriend ${user?.firstName} ?`}
					setModalVisible={setDelComment}
					btnLabel={"Delete"}
					message={"Delete Comment"}
					onPress={deleteCommentFx}
				/>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, position: "relative" },
});

export default Comment;
