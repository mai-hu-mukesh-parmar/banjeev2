import React from "react";
import { useFormikContext } from "formik";
// import AppRadioButtons from "../../../Components/AppComponents/AppRadioButtons";
import { Text, Radio } from "native-base";

export default function Gender() {
	const { values, setFieldValue } = useFormikContext();

	return (
		<React.Fragment>
			<Text
				style={{
					marginBottom: 10,
					fontWeight: "500",
					fontSize: 14,
				}}
			>
				Gender
			</Text>

			<Radio.Group
				name="myRadioGroup"
				value={values.gender}
				onChange={(nextValue) => {
					setFieldValue(nextValue);
				}}
			>
				<Radio value="Male" my={1}>
					Male
				</Radio>
				<Radio value="Female" my={1}>
					Female
				</Radio>
				<Radio value="Rather not to say" my={1}>
					Rather not to say
				</Radio>
			</Radio.Group>

			{/* <AppRadioButtons
				PROP={[
					{ key: "Male", text: "Male" },
					{ key: "Female", text: "Female" },
					{ text: "I`d rather not to say", key: "Others" },
				]}
				value={values.gender}
				onChange={(e) => {
					setFieldValue("gender", e.key);
				}}
			/> */}
		</React.Fragment>
	);
}
