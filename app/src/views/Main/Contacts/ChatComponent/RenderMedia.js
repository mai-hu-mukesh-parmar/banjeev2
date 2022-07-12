import { View, StyleSheet, Platform, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import React from "react";
import {
	listProfileUrl,
	profileUrl,
} from "../../../../utils/util-func/constantExport";
import checkUserStatus from "./checkUserStatus";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import ImageComp from "./ImageComp";
import VideoComp from "./VideoComp";
import AudioComp from "./AudioComp";
import { Avatar, Text } from "native-base";
import { useRoute } from "@react-navigation/native";
import {
	deleteChat,
	updateChat,
} from "../../../../helper/services/ChatService";
import { SocketContext } from "../../../../Context/Socket";
import ReactionDrawer from "./ReactionDrawer";

import color from "../../../../constants/env/color";

export default function RenderMedia({
	chatContent,
	mediaPlayer,
	setMediaPlayer,
	messId,
	setLoading,
}) {
	const {
		params: {
			item: { id: avtarUrl, firstName },
		},
	} = useRoute();

	const [reactionDrawer, setReactionDrawer] = React.useState({ open: false });

	const socket = React.useContext(SocketContext);
	const {
		isSender,
		content,
		createdOn,
		id,
		messageSeen,
		selfDestructive,
		destructiveAgeInSeconds,
	} = chatContent;

	const { mimeType } = content;
	const mimeHandler = mimeType?.split("/");
	const type = mimeHandler?.[0];

	const renderContent = () => {
		const { mimeType, src } = content;
		const mimeHandler = mimeType?.split("/");
		const type = mimeHandler?.[0];
		switch (type) {
			case "text":
				return <Text>This is for text</Text>;
			case "image":
				return (
					<ImageComp src={src} isSender={isSender} mimeHandler={mimeHandler} />
				);

			case "video":
				return <VideoComp src={src} isSender={isSender} />;
			case "audio":
				return (
					<AudioComp
						messId={messId}
						src={src}
						isSender={isSender}
						mediaPlayer={mediaPlayer}
						setMediaPlayer={setMediaPlayer}
						selfDestructive={{
							selfDestructive: selfDestructive,
							destructiveAgeInSeconds: destructiveAgeInSeconds,
						}}
					/>
				);
			case "document":
				return <Text>This is for document</Text>;
			case "location":
				return <Text>This is for location</Text>;
			default:
				return null;
		}
	};

	const deleteChatFun = (id) => {
		setLoading(true);
		deleteChat(id)
			.then((res) => {
				// console.log(id);
			})
			.catch((err) => {
				console.warn(err);
			});
	};

	const createTwoButtonAlert = () =>
		Alert.alert("", "Delete message ?", [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
			},
			{ text: "Delete", onPress: () => deleteChatFun(id) },
		]);

	const handleClickReaction = (data) => {
		setReactionDrawer({ open: false });
		updateChat({
			...chatContent,
			reactionId: data,
			reactionChar: 0,
		})
			.then((res) => console.warn("chat update response  ------>", res))
			.catch((err) => console.log(err));
	};

	return (
		<React.Fragment>
			{isSender && (
				<Avatar
					bgColor={color.primary}
					style={styles.profileImg}
					source={{ uri: listProfileUrl(avtarUrl) }}
				>
					{firstName?.charAt(0).toUpperCase() || ""}
				</Avatar>
			)}
			<View>
				{isSender && (
					<Text
						style={{
							marginLeft: 5,
							marginTop: 10,
							fontSize: Platform.OS === "ios" ? 11 : 12,
							fontWeight: Platform.OS === "ios" ? "normal" : "bold",
						}}
					>
						{firstName} {checkUserStatus(createdOn, false)}
					</Text>
				)}

				<View
					style={{
						display: "flex",
						width: "100%",
						flexDirection: isSender ? "row-reverse" : "row",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
					<View style={{}}>
						<AppFabButton
							onPress={createTwoButtonAlert}
							size={20}
							style={{ marginTop: !isSender ? -20 : 0 }}
							icon={
								<FastImage
									style={{ height: 20, width: 20 }}
									source={require("../../../../../assets/EditDrawerIcon/chat_delete.png")}
								/>
							}
						/>
						{!isSender &&
							(messageSeen ? (
								<FastImage
									style={{
										height: 20,
										width: 20,
										// 	size={20}
										marginTop: -5,
										marginLeft: 12,
									}}
									source={require("../../../../../assets/EditDrawerIcon/ic_delivered_and_viewed.png")}
								/>
							) : (
								<FastImage
									style={{
										height: 20,
										width: 20,
										// 	size={20}
										marginTop: -5,
										marginLeft: 10,
									}}
									source={require("../../../../../assets/EditDrawerIcon/ic_delivered.png")}
								/>
							))}
					</View>
					{isSender && (
						<AppFabButton
							onPress={() => {
								console.log("reaction");
								setReactionDrawer({ open: true, id: id });
							}}
							size={20}
							icon={
								<FastImage
									style={{ height: 20, width: 20 }}
									source={require("../../../../../assets/EditDrawerIcon/reaction.png")}
								/>
							}
						/>
					)}
					{chatContent?.reactionId && (
						<FastImage
							source={{
								uri: `https://media2.giphy.com/media/${chatContent?.reactionId}/giphy-preview.gif?cid=67e264e816a07f883c96444d0e4e78abd0472e0feb1a55cc&rid=giphy-preview.gif&ct=s`,
							}}
							style={{
								height: 50,
								width: 50,
								zIndex: 5,
								position: "absolute",
								top: type === "audio" ? 20 : 0,
								right: type === "audio" ? 60 : 5,
							}}
						/>
					)}
					{content && renderContent()}
				</View>
				{!isSender && (
					<Text
						style={{
							marginLeft: 5,
							textAlign: "right",
							marginTop: -10,
							fontSize: Platform.OS === "ios" ? 11 : 12,
							fontWeight: Platform.OS === "ios" ? "normal" : "bold",
						}}
					>
						{checkUserStatus(createdOn, false)}
					</Text>
				)}
			</View>
			{reactionDrawer.open && (
				<ReactionDrawer
					drawer={reactionDrawer}
					handleCloseDrawer={() => setReactionDrawer({ open: false })}
					handleClickReaction={handleClickReaction}
				/>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	profileImg: {
		height: 40,
		width: 40,
		borderRadius: 20,
		marginBottom: -20,
		marginLeft: 30,
	},
});
