import React, { memo, useState } from "react";
import { View, Dimensions } from "react-native";
import ContentViewer from "./ContentViewer";
import Carousel from "react-native-snap-carousel";
import color from "../../../constants/env/color";
import { Viewport } from "@skele/components";
import { useDispatch, useSelector } from "react-redux";
import { actionOnPost as actionOnPostAction } from "../../../redux/store/action/feedAction";
const ViewportAwareImage = Viewport.Aware(View);
function FeedContent({ item: ele }) {
	const c = React.useRef();

	return (
		<Carousel
			dotColor={color.primary}
			inactiveDotColor={"grey"}
			layout="default"
			ref={c}
			data={ele}
			renderItem={({ item }) => <RenderItem item={item} />}
			sliderWidth={Dimensions.get("screen").width}
			itemWidth={Dimensions.get("screen").width}
		/>
	);
}
export default memo(FeedContent);

const RenderItem = ({ item }) => {
	const { actionOnPost } = useSelector((state) => state.feed);
	const dispatch = useDispatch();

	return (
		<ViewportAwareImage
			onViewportEnter={() => {
				dispatch(
					actionOnPostAction({
						actionOnPost: { ...actionOnPost, [item.caption]: item },
					})
				);
			}}
			onViewportLeave={() => {
				let x = actionOnPost;
				delete x?.[item.caption];
				dispatch(actionOnPost({ actionOnPost: x }));
			}}
		>
			<ContentViewer {...item} />
		</ViewportAwareImage>
	);
};
