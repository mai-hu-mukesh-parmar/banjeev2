import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import React, { useEffect, useRef } from "react";
import { cloudinaryFeedUrl } from "../../../../utils/util-func/constantExport";

export default function VideoType({ src }) {
	const videoRef = useRef(null);

	useEffect(() => {
		videoRef.current?.playAsync();

		return async () => {
			await videoRef.current?.unloadAsync();
			await videoRef.current?.stopAsync();
		};
	}, []);

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
