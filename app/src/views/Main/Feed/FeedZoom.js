import React from "react";
import { Animated, Dimensions } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import AppLoading from "../../../constants/components/ui-component/AppLoading";

const FeedZoom = ({ imageUri }) => {
	const scale = new Animated.Value(1);

	const onPinchEvent = Animated.event(
		[
			{
				nativeEvent: { scale: scale },
			},
		],
		{
			useNativeDriver: true,
		}
	);

	const onPinchStateChange = (event) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			Animated.spring(scale, {
				toValue: 1,
				useNativeDriver: true,
			}).start();
		}
	};

	onLoadStart = () => <AppLoading visible={true} />;
	return (
		<PinchGestureHandler
			onGestureEvent={onPinchEvent}
			onHandlerStateChange={onPinchStateChange}
		>
			<Animated.Image
				source={{ uri: imageUri }}
				onLoadStart={onLoadStart}
				resizeMethod="scale"
				style={{
					// width: 320,
					width: "95%",

					//   aspectRatio: 1,
					height: "90%",
					alignSelf: "center",
					transform: [{ scale: scale }],
				}}
				resizeMode="cover"
			/>
		</PinchGestureHandler>
	);
};

export default FeedZoom;
