import {
	View,
	Platform,
	Button,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "native-base";
import color from "../../env/color";

export default function AppDatePicker({ onChange, value }) {
	const [open, setOpen] = React.useState(false);
	const onClose = () => {
		setOpen(false);
	};

	const currentDate = new Date();
	const limitYear = currentDate.getFullYear();
	const limitMonth = currentDate.getMonth();
	const limitDate = currentDate.getDate();
	const limit = new Date(parseInt(limitYear) - 13, limitMonth, limitDate);

	return (
		<React.Fragment>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => setOpen(true)}
					style={{
						height: 40,
						paddingLeft: 23,
						borderColor: color.black,
						borderWidth: 0.5,
						width: "100%",
						borderRadius: 3,
						fontSize: 16,
						marginTop: 20,
						display: "flex",
						justifyContent: "center",
						width: "85%",
						backgroundColor: "white",
					}}
				>
					<Text>
						{typeof value === "string" ? value : value.toDateString()}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setOpen(true)}>
					<MaterialCommunityIcons
						name="calendar-edit"
						size={20}
						style={{ paddingLeft: 15, paddingTop: 20 }}
						color="black"
					/>
				</TouchableOpacity>
			</View>
			{open && (
				<View>
					{Platform.OS === "ios" && (
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Button
								title="Cancle"
								onPress={() => {
									onClose();
								}}
							/>
							<Button
								title="Done"
								onPress={() => {
									onClose();
								}}
							/>
						</View>
					)}
					<DateTimePicker
						testID="dateTimePicker"
						mode={"date"}
						value={new Date(value)}
						display={Platform.OS === "ios" ? "spinner" : "default"}
						maximumDate={limit}
						onChange={(e) => {
							if (e.type === "set") {
								let date = e.nativeEvent.timestamp;
								if (Platform.OS === "ios") {
									onChange(new Date(date));
								} else {
									onChange(date);
									onClose();
								}
							}
						}}
						style={{ zIndex: 1 }}
					/>
				</View>
			)}
		</React.Fragment>
	);
}
