import { Video } from "expo-av";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { cloudinaryFeedUrl } from "../../../../utils/util-func/constantExport";

export default function VideoType({ src }) {
	const videoRef = useRef(null);

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
