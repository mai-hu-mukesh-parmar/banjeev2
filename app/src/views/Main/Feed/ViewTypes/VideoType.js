import { Video } from "expo-av";
import React, { useRef } from "react";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import { cloudinaryFeedUrl } from "../../../../utils/util-func/constantExport";

export default function VideoType({ src }) {
	const videoRef = useRef(null);

	const onError = (err) => {
		console.log(err);
	};
	const onLoadStart = () => <AppLoading visible={true} />;
	return (
		<Video
			ref={videoRef}
			source={{ uri: cloudinaryFeedUrl(src, "video") }}
			resizeMode="contain"
			usePoster={true}
			onLoadStart={onLoadStart}
			useNativeControls={true}
			style={{
				width: "100%",
				aspectRatio: 1,
			}}
			onError={onError}
		/>
	);
}
