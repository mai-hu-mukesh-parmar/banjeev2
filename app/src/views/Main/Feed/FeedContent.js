// import React, { memo } from "react";
// import { View, Dimensions } from "react-native";

// import ContentViewer from "./ContentViewer";
// import Carousel from "react-native-snap-carousel";
// import color from "../../../constants/env/color";

// function FeedContent({ item }) {
// 	console.warn(Dimensions.get("screen").width, "Dimensions.getwidth");

// 	function _renderItem({ item: { mimeType, src } }) {
// 		if (mimeType && src) {
// 			return <ContentViewer src={src} mimeType={mimeType} />;
// 		}
// 	}

// 	const c = React.useRef();

// 	return (
// 		<View style={{ marginBottom: 20, alignItems: "center" }}>
// 			<Carousel
// 				dotColor={color.primary}
// 				inactiveDotColor={"grey"}
// 				layout="default"
// 				// pinchGestureEnabled
// 				ref={c}
// 				data={item}
// 				renderItem={_renderItem}
// 				sliderWidth={320}
// 				itemWidth={320}
// 			/>

// 			{/* <SwiperFlatList
// 				showPagination
// 				data={item}
// 				windowSize={Dimensions.get("screen").width}
// 				renderItem={_renderItem}
// 			/>  */}
// 		</View>
// 	);
// }

// export default memo(FeedContent);

import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import GestureRecognizer, {
	swipeDirections,
} from "react-native-swipe-gestures";
import ContentViewer from "./ContentViewer";

function FeedContent({ item, iData }) {
	function _renderItem(mimeType, src) {
		if (mimeType && src) {
			return <ContentViewer src={src} mimeType={mimeType} />;
		}
	}

	const [state, setState] = React.useState({
		myText: "I'm ready to get swiped!",
		gestureName: "none",
		backgroundColor: "#fff",
	});

	function onSwipe(gestureName, gestureState) {
		const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
		switch (gestureName) {
			case SWIPE_LEFT:
				setState((prev) => {
					if (item?.length > 0) {
						if (prev?.[iData?.id]?.length > prev?.[iData?.id]?.current) {
							return {
								...prev,
								[iData?.id]: {
									...prev?.[iData?.id],
									item: item?.[prev?.[iData?.id]?.current + 1],
									current: prev?.[iData?.id]?.current + 1,
								},
							};
						} else {
							return prev;
						}
					} else {
						return {
							...prev,
							[iData?.id]: {
								...prev?.[iData?.id],
								item: item?.[0],
							},
						};
					}
				});
				break;
			case SWIPE_RIGHT:
				setState((prev) => {
					if (item?.length > 0) {
						if (prev?.[iData?.id]?.current > 0) {
							return {
								...prev,
								[iData?.id]: {
									...prev?.[iData?.id],
									item: item?.[prev?.[iData?.id]?.current - 1],
									current: prev?.[iData?.id]?.current - 1,
								},
							};
						} else {
							return prev;
						}
					} else {
						return {
							...prev,
							[iData?.id]: {
								...prev?.[iData?.id],
								item: item?.[0],
							},
						};
					}
				});
				break;
			default:
				break;
		}
	}

	React.useEffect(() => {
		setState({
			[iData?.id]: {
				item: item?.[0],
				length: item?.length - 1,
				current: 0,
			},
		});
	}, [iData?.id, item]);

	if (state && state?.[iData?.id]) {
		return (
			<>
				<GestureRecognizer
					onSwipe={(direction, state) => onSwipe(direction, state)}
					config={{
						velocityThreshold: 0.3,
						directionalOffsetThreshold: 80,
					}}
					style={{
						flex: 1,
					}}
				>
					{state?.[iData?.id]?.item?.mimeType &&
						state?.[iData?.id]?.item?.src &&
						_renderItem(
							state?.[iData?.id]?.item?.mimeType,
							state?.[iData?.id]?.item?.src
						)}
					<View
						style={{
							marginTop: 10,
							marginBottom: 10,
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						{item?.length > 1 &&
							item?.map((ele, index) => {
								return (
									<View
										key={index}
										style={{
											height: 12,
											width: 12,
											backgroundColor:
												state?.[iData?.id]?.current === index
													? "gray"
													: "transparent",
											borderRadius: 50,
											marginLeft: 5,
											borderWidth: 2,
											borderColor: "gray",
										}}
									></View>
								);
							})}
					</View>
				</GestureRecognizer>
			</>
		);
	} else return null;
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "white", width: "100%" },
	child: { justifyContent: "center" },
	text: { fontSize: 12, textAlign: "center" },
	gif: {
		height: 20,
		width: "100%",
		zIndex: 1,
		marginLeft: 5,
	},
	slide1: {
		height: 320,
	},
});

export default memo(FeedContent);
