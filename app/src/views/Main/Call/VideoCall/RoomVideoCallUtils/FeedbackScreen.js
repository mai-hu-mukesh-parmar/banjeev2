import React from "react";
import { VirtualizedList, SafeAreaView, View } from "react-native";
import FastImage from "react-native-fast-image";
import { Text } from "native-base";
import { profileUrl } from "../../../../../utils/util-func/constantExport";
import { setDateFormat } from "../../../../Other/checkUserStatus";

function FeedbackScreen(props) {
	const { feedbackData, systemUserId } = props;
	console.log(feedbackData);

	const renderComponent = ({ item }) => {
		const {
			userId,
			createdOn,
			userName,
			avtarImageUrl,
			content: { src, mimeType },
		} = item;
		console.log(userId === systemUserId);
		if (userId === systemUserId) {
			return (
				<View
					style={{
						height: 80,
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						justifyContent: "center",
						borderBottomWidth: 1,
						borderBottomColor: "#D0D0D0",
						paddingHorizontal: 10,
					}}
				>
					{mimeType === "image/gif" ? (
						<FastImage
							source={{
								uri: "http://media1.giphy.com/media/" + src + "/giphy.gif",
							}}
							style={{ height: 40, width: 40 }}
						/>
					) : (
						<FastImage
							source={{
								uri: "https://gateway.banjee.org//services/media-service/iwantcdn/resources/61e7d352374f282c5b4caba9?actionCode=ACTION_DOWNLOAD_RESOURCE",
							}}
							style={{ height: 40, width: 40 }}
						/>
					)}
					<Text style={{ fontSize: 12, marginTop: 7 }}>
						{setDateFormat(createdOn)}
					</Text>
				</View>
			);
		} else {
			return (
				<View
					style={{
						height: 80,
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "center",
						borderBottomWidth: 1,
						borderBottomColor: "#D0D0D0",
						paddingHorizontal: 10,
					}}
				>
					<Text style={{ fontSize: 12, marginBottom: 7 }}>
						{`${userName}   ${setDateFormat(createdOn)}`}
					</Text>
					<View style={{ display: "flex", flexDirection: "row" }}>
						<FastImage
							source={{
								uri: profileUrl(avtarImageUrl),
							}}
							style={{
								height: 40,
								width: 40,
								borderRadius: 50,
							}}
						/>
						{mimeType === "image/gif" ? (
							<FastImage
								source={{
									uri: "http://media1.giphy.com/media/" + src + "/giphy.gif",
								}}
								style={{ height: 40, width: 40, marginLeft: 10 }}
							/>
						) : (
							<FastImage
								source={{
									uri: "https://gateway.banjee.org//services/media-service/iwantcdn/resources/61e7d352374f282c5b4caba9?actionCode=ACTION_DOWNLOAD_RESOURCE",
								}}
								style={{ height: 40, width: 40, marginLeft: 10 }}
							/>
						)}
					</View>
				</View>
			);
		}
	};

	return (
		<SafeAreaView style={{ width: "100%", paddingBottom: 150 }}>
			<VirtualizedList
				data={feedbackData}
				renderItem={renderComponent}
				keyExtractor={(item) => item.id}
				style={{ width: "100%" }}
				getItemCount={(feedbackData) => feedbackData.length}
				getItem={(data, index) => data[index]}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

export default FeedbackScreen;
