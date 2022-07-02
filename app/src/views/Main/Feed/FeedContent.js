import React, { memo, useContext, useEffect } from "react";
import { View, Dimensions } from "react-native";
import ContentViewer from "./ContentViewer";
import Carousel from "react-native-snap-carousel";
import color from "../../../constants/env/color";
import { Viewport } from "@skele/components";

import FeedContext from "./FeedContext/FeedContext";
const ViewportAwareImage = Viewport.Aware(View);
function FeedContent({ item: ele }) {
	const c = React.useRef();
	const { playAbleFeed, setPlayAbleFeed } = useContext(FeedContext);

	useEffect(() => {
		console.log("playAbleFeed", playAbleFeed);
	}, [playAbleFeed]);

	const renderItem = ({ item }) => (
		<ViewportAwareImage
			onViewportEnter={() => {
				setPlayAbleFeed((pre) => [...new Set([...pre, item.caption])]);
			}}
			onViewportLeave={() => {
				setPlayAbleFeed((pre) => pre.filter((ele) => ele !== item.caption));
			}}
		>
			<ContentViewer {...item} />
		</ViewportAwareImage>
	);

	return (
		<Carousel
			dotColor={color.primary}
			inactiveDotColor={"grey"}
			layout="default"
			ref={c}
			data={ele}
			renderItem={renderItem}
			sliderWidth={Dimensions.get("screen").width}
			itemWidth={Dimensions.get("screen").width}
		/>
	);
}
export default memo(FeedContent);
