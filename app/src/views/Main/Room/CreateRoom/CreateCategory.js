import { Text } from "native-base";
import React from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import AppInput from "../../../../constants/components/ui-component/AppInput";
import OverlayDrawer from "../../../../constants/components/ui-component/OverlayDrawer";
import { createCategoryService } from "../../../../helper/services/CategoryService";

function CreateCategory({
	createCategory,
	setCreateCategory,
	category: subCategory,
}) {
	const [txt, setText] = React.useState("");
	const [category, setCategory] = React.useState();

	const submitCategory = React.useCallback(() => {
		if (category?.id && txt.length > 0) {
			createCategoryService({
				categoryId: category.id,
				categoryName: category.name,
				description: txt,
				name: txt,
			})
				.then(() => setCreateCategory(false))
				.catch((err) => console.warn(err));
		} else {
			createCategoryService({
				categoryId: subCategory[0].id,
				categoryName: subCategory[0].name,
				description: txt,
				name: txt,
			})
				.then(() => setCreateCategory(false))
				.catch((err) => console.warn(err));
		}
	}, []);

	const handleClick = () => {
		submitCategory();
	};

	return (
		<React.Fragment>
			<OverlayDrawer
				transparent
				visible={createCategory}
				onClose={() => {
					setCreateCategory(false);
				}}
				closeOnTouchOutside
				animationType="fadeIn"
				containerStyle={{
					backgroundColor: "rgba(0, 0, 0, 0.4)",
					padding: 0,
					height: "100%",
					width: "100%",
				}}
				childrenWrapperStyle={{
					width: 328,
					alignSelf: "center",
					borderRadius: 4,
				}}
				animationDuration={100}
			>
				{(hideModal) => (
					<View style={styles.container}>
						<Text style={{ fontSize: 14, marginBottom: -10 }}>
							Category name should not exceed 50 Characters
						</Text>

						<AppInput
							maxLength={50}
							placeholder={"Romance"}
							onChangeText={(e) => setText(e)}
							//   onChangeText={(e) => console.log(e)}
						/>

						<Text style={{ fontSize: 14, marginTop: 20, marginBottom: 10 }}>
							Please select the main categoty from the list
						</Text>

						{subCategory && subCategory.length > 0 && (
							<DropDownPicker
								items={subCategory.map((ele) => {
									return { label: ele.name, value: ele.id, ...ele };
								})}
								defaultIndex={0}
								containerStyle={{
									height: 40,
								}}
								onChangeItem={(item) => {
									//   console.log("item", item);
									setCategory(item);
								}}
							/>
						)}

						<View style={{ marginTop: 22, zIndex: -1 }}>
							<AppButton
								disabled={txt.length === 0}
								title={"Proceed"}
								onPress={() => handleClick()}
							/>
						</View>
					</View>
				)}
			</OverlayDrawer>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 43,
		marginBottom: 36,
		width: "90%",
	},
});

export default CreateCategory;
