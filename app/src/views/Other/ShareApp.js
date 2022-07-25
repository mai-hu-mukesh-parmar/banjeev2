import { Share } from "react-native";
import * as RNShare from "react-native-share";

// import Share from "react-native-share";

import * as FileSystem from "expo-file-system";

export const onShare = () => {
	try {
		const result = Share.share({
			message:
				"Hey check out banjee app at https://play.google.com/store/apps/details?id=com.banjee.customer",
		});
		if (result.action === Share.sharedAction) {
			if (result.activityType) {
				// shared with activity type of result.activityType
			} else {
				// shared
			}
		} else if (result.action === Share.dismissedAction) {
			// dismissed
		}
	} catch (error) {
		alert(error.message);
	}
};

export const sharePost = async (url, mimeType, text, FeedId, postId) => {
	let newUrl = `https://res.cloudinary.com/banjee/video/upload/${postId}.jpg`;

	switch (mimeType) {
		case "video":
			console.warn("video", mimeType);

			FileSystem.downloadAsync(newUrl, FileSystem.cacheDirectory + "image.png")
				.then(async ({ uri }) => {
					await RNShare.default.open({
						url: uri,
						message: text + `${"\n"}https://www.banjee.org/feed/${FeedId}`,
					});

					// console.log("Finished downloading to ", uri);
				})
				.catch((error) => {
					console.error(error);
				});
			break;
			9;

		case "image":
			console.warn("image", mimeType);

			FileSystem.downloadAsync(url, FileSystem.cacheDirectory + "image.png")
				.then(async ({ uri }) => {
					console.warn(uri);
					{
						uri &&
							(await RNShare.default.open({
								url: uri,
								message: text + `${"\n"}https://www.banjee.org/feed/${FeedId}`,
							}));
					}
				})
				.catch((error) => {
					console.error(error);
				});
			break;

		case "audio":
			console.warn("audio", mimeType);
			RNShare.default.open({
				message: text + `${"\n"}https://www.banjee.org/feed/${FeedId}`,
			});
			break;
	}
};

export const shareRoom = (roomId) => {
	const text =
		"Checkout more exciting content,connect with people around the world with similar interest and talk to them in numerous voice changing filters in Bnajee App.";
	RNShare.default.open({
		message: text + `${"\n"}https://www.banjee.org/room/${roomId}`,
	});
};
