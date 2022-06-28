import React, { memo, useState } from "react";
import { View, Dimensions } from "react-native";

import ContentViewer from "./ContentViewer";
import Carousel from "react-native-snap-carousel";
import color from "../../../constants/env/color";
import { Viewport } from "@skele/components";

const ViewportAwareImage = Viewport.Aware(View);

function FeedContent({ item }) {
	const [data, setData] = useState(false);
	console.warn(Dimensions.get("screen").width, "Dimensions.getwidth");

	function _renderItem({ item: { mimeType, src } }) {
		if (mimeType && src) {
			return (
				<ViewportAwareImage
					onViewportEnter={() => {
						console.log("onViewportEnter");
						setData(true);
					}}
					onViewportLeave={() => {
						console.log("onViewportLeave");
						setData(false);
					}}
					style={{ flex: 1 }}
				>
					{data && <ContentViewer src={src} mimeType={mimeType} />}
				</ViewportAwareImage>
			);
		}
	}

	const c = React.useRef();

	return (
		<View style={{ marginBottom: 20, alignItems: "center" }}>
			<Carousel
				dotColor={color.primary}
				inactiveDotColor={"grey"}
				layout="default"
				// pinchGestureEnabled
				ref={c}
				data={item}
				renderItem={_renderItem}
				sliderWidth={320}
				itemWidth={320}
			/>

			{/* <SwiperFlatList
				showPagination
				data={item}
				windowSize={Dimensions.get("screen").width}
				renderItem={_renderItem}
			/>  */}
		</View>
	);
}

export default memo(FeedContent);
