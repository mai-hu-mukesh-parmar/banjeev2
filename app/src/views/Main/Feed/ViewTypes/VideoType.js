import { Video } from "expo-av";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { cloudinaryFeedUrl } from "../../../../utils/util-func/constantExport";
import FeedContext from "../FeedContext/FeedContext";

export default function VideoType({ src, caption }) {
	const { playAbleFeed } = useContext(FeedContext);
	const videoRef = useRef(null);

	const managePlayBack = useCallback(() => {
		if (playAbleFeed.includes(caption)) {
			videoRef.current?.playAsync();
		} else {
			videoRef.current?.stopAsync();
		}
	}, [playAbleFeed, caption]);

	useEffect(() => {
		managePlayBack();

		return () => {
			videoRef.current?.unloadAsync();
			videoRef.current?.stopAsync();
		};
	}, [managePlayBack]);

	return (
		<Video
			ref={videoRef}
			source={{ uri: cloudinaryFeedUrl(src, "video") }}
			resizeMode="contain"
			useNativeControls={true}
			style={{
				width: "100%",
				aspectRatio: 1,
			}}
			onError={(err) => {
				console.log(err);
			}}
		/>
	);
}
