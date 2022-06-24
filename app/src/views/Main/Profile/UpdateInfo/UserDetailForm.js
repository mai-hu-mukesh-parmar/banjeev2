import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import Feather from "react-native-vector-icons/Feather";
import color from "../../../../constants/env/color";
import AppInput from "../../../../constants/components/ui-component/AppInput";
import { Text } from "native-base";

export default function UserDetailForm({ passwordFeild }) {
	const [passEye, setPassEye] = React.useState("eye-off");
	const [secureText, setSecureText] = React.useState(true);
	const { values, setFieldValue } = useFormikContext();

	const nameArr = [
		{
			title: "FirstName",
			placeholder: "FirstName",
			name: "firstName",
			onPress: () => console.log("firstName"),
			secureTextEntry: false,
			keyboardType: "default",
		},
		{
			title: "LastName",
			placeholder: "LastName",
			name: "lastName",
			onPress: () => console.log("LastName"),
			secureTextEntry: false,
			keyboardType: "default",
		},
	];

	const formArr = [
		{
			title: "UserName",
			placeholder: "UserName",
			name: "username",
			onPress: () => console.log("UserName"),
			secureTextEntry: false,
			keyboardType: "default",
		},
		{
			title: "Email ID",
			placeholder: "Email ID",
			name: "email",
			onPress: () => console.log("Email ID"),
			secureTextEntry: false,
			keyboardType: "email-address",
		},
		passwordFeild
			? {
					title: "Password",
					placeholder: "Passsword",
					name: "password",
					onPress: () => {
						if (secureText && passEye === "eye") {
							setPassEye("eye-off");
							setSecureText(!secureText);
						} else {
							setPassEye("eye");
							setSecureText(!secureText);
						}
					},
					secureTextEntry: secureText,
					keyboardType: "default",
			  }
			: {
					title: "Contact Number",
					placeholder: "Contact Number",
					name: "mobile",
					onPress: () => console.log("Contact Number"),
					secureTextEntry: false,
					keyboardType: "phone-pad",
			  },
	];
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				marginBottom: 20,
			}}
		>
			<View style={{ flexDirection: "row", width: "100%" }}>
				{nameArr.map((ele, index) => (
					<View key={index} style={{ marginLeft: index === 1 ? 10 : 0 }}>
						<Text style={styles.Text}>{ele.title}</Text>

						<View style={[styles.inputView]}>
							<AppInput
								value={values[ele.name]}
								keyboardType={ele.keyboardType}
								onChangeText={(text) => setFieldValue(ele.name, text)}
								editable={ele.name !== "mobile"}
								placeholder={ele.placeholder}
								width={120}
								secureTextEntry={ele.secureTextEntry}
							/>

							{ele.name === "email" && (
								<TouchableOpacity
									onPress={() => ele.onPress()}
									style={styles.imgView}
								>
									<Feather name="edit" size={20} color={color.black} />
								</TouchableOpacity>
							)}
						</View>
					</View>
				))}
			</View>

			{/* ```````````````` rest feilds */}

			{formArr.map((ele, index) => (
				<View key={index}>
					<Text style={styles.Text}>{ele.title}</Text>

					<View style={styles.inputView}>
						<AppInput
							value={values[ele.name]}
							keyboardType={ele.keyboardType}
							onChangeText={(text) => setFieldValue(ele.name, text)}
							editable={ele.name !== "mobile"}
							placeholder={ele.placeholder}
							width="85%"
							secureTextEntry={ele.secureTextEntry}
						/>

						{ele.name === "email" && (
							<TouchableOpacity
								onPress={() => ele.onPress()}
								style={styles.imgView}
							>
								<Feather name="edit" size={20} color={color.black} />
							</TouchableOpacity>
						)}

						{ele.name === "password" && (
							<TouchableOpacity
								onPress={() => ele.onPress()}
								style={styles.imgView}
							>
								<Feather name={passEye} size={20} color={color.black} />
							</TouchableOpacity>
						)}
					</View>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	Text: { fontSize: 14, marginTop: 20, fontWeight: "500" },
	inputView: {
		marginTop: -10,
		flexDirection: "row",
		alignItems: "center",
		display: "flex",
		marginTop: 15,
		width: "100%",
	},
	imgView: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
		marginLeft: 15,
	},
});
