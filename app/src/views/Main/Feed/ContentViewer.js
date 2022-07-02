import React from "react";
import FeedZoom from "./FeedZoom";
import { cloudinaryFeedUrl } from "../../../utils/util-func/constantExport";
import VideoType from "./ViewTypes/VideoType";
import AudioTypes from "./ViewTypes/AudioTypes";
import { View } from "react-native";

function ContentViewer({ mimeType, src }) {
	const renderComp = () => {
		switch (mimeType) {
			case "video/mp4":
				return <VideoType src={src} />;
			case "audio/mp3":
				return <AudioTypes src={src} />;
			case "image/jpg":
				return <FeedZoom imageUri={cloudinaryFeedUrl(src, "image")} />;
			default:
				break;
		}
	};

	return (
		<View
			style={{
				alignItems: "center",
				display: "flex",
				height: 350,
			}}
		>
			{renderComp()}
		</View>
	);
}

export default ContentViewer;
