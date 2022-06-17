import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getFeed } from "../../../helper/services/PostFeed";
import { useDispatch } from "react-redux";
import { saveFeed } from "../../../redux/store/action/feedAction";
import { showToast } from "../../../redux/store/reducer/toastAction";

export default function Feed() {
	const dispatch = useDispatch();

	const [loadingData, setLoadingData] = useState(false);
	const [refresh, setRefresh] = useState(false);

	// const allFeed = useCallback(() => {
	// 	setLoadingData(true);
	// 	getFeed({
	// 		author: null,
	// 		authorId: null,
	// 		createdOn: null,
	// 		deleted: null,
	// 		geoLocation: null,
	// 		id: null,
	// 		locationId: null,
	// 		mediaContent: null,
	// 		mediaRootDirectoryId: null,
	// 		otherUserId: null,
	// 		page: page,
	// 		pageId: null,
	// 		pageName: null,
	// 		pageSize: 15,
	// 		percentage: 0,
	// 		reactions: null,
	// 		reactionsCount: null,
	// 		recentComments: null,
	// 		text: null,
	// 		totalComments: null,
	// 		totalReactions: null,
	// 		visibility: null,
	// 	})
	// 		.then((res) => {
	// 			setRefresh(false);
	// 			console.log("Feeds page", page);
	// 			setLoadingData(false);
	// 			if (res?.length > 0) {
	// 				dispatch(saveFeed(res));
	// 			} else {
	// 				ToastMessage("you have reached at the end of the post ");
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [page]);

	useEffect(() => {
		dispatch(showToast({ open: true, description: "Hey! welcome" }));
	}, []);

	return (
		<View>
			<Text>Feed</Text>
		</View>
	);
}
