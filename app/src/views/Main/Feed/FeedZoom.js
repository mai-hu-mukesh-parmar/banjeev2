import React from "react";
import { Animated, Dimensions } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

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

	return (
		<PinchGestureHandler
			onGestureEvent={onPinchEvent}
			onHandlerStateChange={onPinchStateChange}
		>
			<Animated.Image
				source={{ uri: imageUri }}
				style={{
					width: 320,
					height: 320,
					alignSelf: "center",
					transform: [{ scale: scale }],
				}}
				resizeMode="contain"
			/>
		</PinchGestureHandler>
	);
};

export default FeedZoom;
