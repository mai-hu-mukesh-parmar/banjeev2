import React from "react";
import { View, StyleSheet } from "react-native";
import NewComment from "./NewComment";
import FriendReq from "./AcceptRequest";
import CommentReaction from "./CommentReaction";
import FeedReaction from "./FeedReaction";
import FeedRemove from "./FeedRemove";
import Replied from "./Replied";

function FeedReactionNotification({ item }) {
	const { eventName } = item;
	const checkAllNotification = () => {
		switch (eventName) {
			case "NEW_COMMENT":
				return <NewComment item={item} />;

			case "FEED_REACTION":
				return <FeedReaction item={item} />;

			case "COMMENT_REACTION":
				return <CommentReaction item={item} />;

			case "REPLIED":
				return <Replied item={item} />;

			case "ACCEPT_REQUEST":
				return <FriendReq item={item} />;

			case "FEED_REMOVED":
				return <FeedRemove item={item} />;

			default:
				break;
		}
	};

	return <View style={styles.container}>{checkAllNotification()}</View>;
}

const styles = StyleSheet.create({
	container: {
		height: 56,
		width: "100%",
		justifyContent: "center",
	},
});

export default FeedReactionNotification;
