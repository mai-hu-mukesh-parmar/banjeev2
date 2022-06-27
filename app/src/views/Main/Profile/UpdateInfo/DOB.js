import { View, Text } from "react-native";
import React from "react";
import AppDatePicker from "../../../../constants/components/ui-component/AppDatePicker";

export default function DOB({ onChange, value }) {
	return (
		<React.Fragment>
			<Text
				style={{
					marginTop: 20,
					marginBottom: -10,
					fontWeight: "500",
					fontSize: 14,
				}}
			>
				Date Of Birth
			</Text>

			<AppDatePicker
				value={value ? new Date(value) : new Date()}
				onChange={(e) => {
					onChange(e.toISOString().slice(0, 10));
				}}
			/>
		</React.Fragment>
	);
}
