import React from "react";
import {
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	TextInput,
	Keyboard,
} from "react-native";
export default function OtpInput({
	numberOfInputs,
	onChangeInput,
	onDone,
	...rest
}) {
	const [otp, setOpt] = React.useState({});
	const inputs = new Array(numberOfInputs).fill(1).map((ele, index) => {
		return {
			refs: React.useRef(),
		};
	});

	const handleDoneOtp = React.useCallback(() => {
		let doneOtp = Object.values(otp).join("");
		if (doneOtp.length === numberOfInputs) {
			Keyboard.dismiss();
			onDone(doneOtp);
		}
	}, [otp]);

	React.useEffect(() => {
		handleDoneOtp();
		inputs[0].refs.current.focus();
		if (!rest.otp) {
			setOpt({});
		}
		() => {
			setOpt({});
		};
	}, [rest]);

	const styles = StyleSheet.create({
		container: {
			marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
			flex: 1,
			zIndex: 1,
			height: 50,
			flexDirection: "row",
			justifyContent: "center",
			...rest.inputContainerStyles,
		},
		input: {
			height: 40,
			zIndex: 1,
			margin: 12,
			borderWidth: 1,
			padding: 10,
			width: 40,
			borderRadius: 5,
			backgroundColor: "white",
			...rest.inputStyles,
		},
	});

	return (
		<SafeAreaView style={styles.container}>
			{inputs.map((ele, index) => (
				<TextInput
					key={index}
					keyboardType="numeric"
					ref={inputs[index].refs}
					style={styles.input}
					onKeyPress={({ nativeEvent: { key: keyValue } }) => {
						if (keyValue === "Backspace" && inputs[index - 1] && otp[index]) {
							inputs[index - 1].refs.current.focus();
						}
					}}
					value={Object.values(otp)[index] ? Object.values(otp)[index] : ""}
					maxLength={1}
					onChange={({ nativeEvent: { text } }) => {
						setOpt((prev) => ({ ...prev, [index]: text }));
						if (inputs[index + 1] && !otp[index]) {
							inputs[index + 1].refs.current.focus();
						}
						onChangeInput(text);
					}}
				/>
			))}
		</SafeAreaView>
	);
}
