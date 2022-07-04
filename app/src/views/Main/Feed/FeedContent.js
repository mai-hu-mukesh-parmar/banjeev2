import React, { memo, useContext, useEffect } from "react";
import { View, Dimensions } from "react-native";
import ContentViewer from "./ContentViewer";
import Carousel from "react-native-snap-carousel";
import color from "../../../constants/env/color";

function FeedContent({ item: ele }) {
	const c = React.useRef();
	const renderItem = ({ item }) => <ContentViewer {...item} />;

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
