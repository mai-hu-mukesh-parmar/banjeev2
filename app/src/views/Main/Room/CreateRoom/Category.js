import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import color from "../../../../constants/env/color";
import {
	categoryService,
	subCategoryService,
} from "../../../../helper/services/CategoryService";
import { setRoomData } from "../../../../redux/store/action/roomAction";
import {
	checkGender,
	listProfileUrl,
} from "../../../../utils/util-func/constantExport";
import CreateCategory from "./CreateCategory";

function Category(props) {
	const {
		currentUser: { id },
		...rest
	} = useSelector((state) => state.registry);

	const [category, setCategory] = React.useState([]);

	const [subCategory, setSubCategory] = React.useState([]);

	const [createCategory, setCreateCategory] = React.useState(false);

	const [loading, setLoading] = React.useState(true);

	const [subLoading, setSubLoading] = React.useState(false);

	const [categoryId, setCategoryId] = React.useState();

	const { setOptions, navigate } = useNavigation();

	const [imageError, setImageError] = React.useState();
	const dispatch = useDispatch();

	React.useEffect(() => {
		categoryService({
			categoryId: null,
			categoryName: null,
			description: null,
			name: null,
		})
			.then((res) => {
				setLoading(false);
				setCategory(res.content);
			})
			.catch((err) => console.warn(err));
	}, []);

	const subCategoryFunc = (id) => {
		console.warn(id);
		if (category.length > 0) {
			setSubLoading(true);
			subCategoryService({
				categoryId: id,
				categoryName: null,
				description: null,
				name: null,
			})
				.then((res) => {
					setCategoryId(id);
					setSubLoading(false);
					setSubCategory(res.content);
				})
				.catch((err) => console.warn(err));
		}
	};

	React.useEffect(() => {
		return setOptions({
			headerTitle: () => (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View style={{ elevation: 1, borderRadius: 20, marginRight: 10 }}>
						<Image
							onError={({ nativeEvent: { error } }) => setImageError(error)}
							source={
								imageError
									? checkGender(rest.gender)
									: // userData.avatarUrl
									  { uri: listProfileUrl(id) }
								// : require("../../assets/EditDrawerIcon/neutral_placeholder.png")
							}
							style={styles.profile}
						/>
					</View>
					<Text>Category</Text>
				</View>
			),
		});
	}, []);

	return (
		<React.Fragment>
			{loading && <AppLoading visible={loading} />}

			{!loading && (
				<View
					style={{
						height: "100%",
						width: "100%",
						position: "relative",
					}}
				>
					{subLoading && (
						<AppLoading
							visible={subLoading}
							height={"55%"}
							width={"100%"}
							marginTop={98}
						/>
					)}

					{/*```````````````````````` CREATE CATEGORY MODAL */}

					{createCategory && (
						<CreateCategory
							createCategory={createCategory}
							setCreateCategory={setCreateCategory}
							category={category}
						/>
					)}

					<View style={styles.container}>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							{category &&
								category.map((ele, i) => (
									<TouchableOpacity
										key={i}
										onPress={() => subCategoryFunc(ele?.id)}
									>
										<View
											style={{
												height: 40,
												padding: 10,
												borderRadius: 20,
												borderWidth: 1,
												marginRight: 8,
												borderColor: color.primary,
											}}
										>
											<Text onPress={() => subCategoryFunc(ele?.id)}>
												{ele.name}
											</Text>
										</View>
									</TouchableOpacity>
								))}
						</ScrollView>
					</View>

					<View>
						<Text
							style={{
								alignSelf: "center",
								width: "60%",
								textAlign: "center",
								marginVertical: 24,
							}}
						>
							Please Select a topic under your favourite categories
						</Text>

						{subCategory.length > 0 && (
							<ScrollView style={{ height: "55%" }}>
								<View
									style={{
										flexDirection: "row",
										display: "flex",
										flexWrap: "wrap",
										width: "90%",
										justifyContent: "space-evenly",
										alignSelf: "center",
									}}
								>
									{subCategory.map((item, i) => {
										console.warn("itemmsssss", item);
										return (
											<TouchableOpacity
												key={i}
												onPress={() => {
													// console.log(item.id);

													dispatch(
														setRoomData({
															categoryName: item.categoryName,
															categoryId: categoryId,
															subCategoryId: item.id,
															subCategoryName: item.name,
														})
													);
													return navigate("CreateRoom");
												}}
												style={styles.name}
											>
												<Text>{item.name}</Text>
											</TouchableOpacity>
										);
									})}
								</View>
							</ScrollView>
						)}
					</View>

					<View
						style={{
							width: "100%",
							position: "absolute",
							bottom: "5%",
						}}
					>
						<Text
							style={{
								width: 230,
								textAlign: "center",
								marginBottom: "5%",
								alignSelf: "center",
							}}
						>
							Not sure about or not able to get What you need?
						</Text>

						<AppButton
							onPress={() => setCreateCategory(true)}
							title={"Create your own Category"}
							style={{ width: 230, height: 40, alignSelf: "center" }}
						/>
					</View>
				</View>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		alignItems: "center",
		height: 40,
		elevation: 5,
		flexWrap: "nowrap",
		marginTop: 5,
	},
	profile: {
		height: 40,
		width: 40,
		borderRadius: 20,
		borderColor: color.primary,
		borderWidth: 1,
	},
	name: {
		justifyContent: "center",
		paddingHorizontal: 13,
		height: 30,
		borderRadius: 30,
		marginLeft: 10,
		marginTop: 16,
		borderWidth: 1,
		borderColor: color.black,
	},
});

export default Category;
