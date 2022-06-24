import React, { useContext } from "react";
import {
	View,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import AppButton from "../../../../constants/components/ui-component/AppButton";
import { Text } from "native-base";
import SelectImage from "../RoomComponents/SelectImage";
import RoomTitle from "../RoomComponents/RoomTitle";
import {
	checkGender,
	listProfileUrl,
	profileUrl,
} from "../../../../utils/util-func/constantExport";

function CreateRoom(props) {
	const {
		currentUser: { id },
		...rest
	} = useSelector((state) => state.registry);

	const { categoryName, categoryId, subCategoryId, ...room } = useSelector(
		(state) => state.room
	);
	console.warn(categoryId, categoryName, subCategoryId, "-------------");
	const { setOptions, navigate } = useNavigation();
	const { params } = useRoute();
	const [imageError, setImageError] = React.useState();
	const [editRoom] = React.useState(room?.categoryId ?? false);

	const [imageModal, setImageModal] = React.useState(false); //Select Image
	const [roomUri, setRoomUri] = React.useState(
		room?.imageContent?.src ?? false
	); //Select Image

	const [roomTitle, setRoomTitle] = React.useState(room?.groupName);
	const [txt, setTxt] = React.useState(room?.groupName ?? "");

	const [userCount, setUserCount] = React.useState([]);

	const [communityType, setCommunityType] = React.useState(
		room?.communityType ?? ""
	);

	const [activeBtn, setActiveBtn] = React.useState(true);

	// const [categaoryItemName, setCategoryItemName] = React.useState(
	// 	room?.categoryName
	// );

	// const [categoryId, setCategoryId] = React.useState(room?.categoryId);

	// const [subCategoryId, setSubCategoryId] = React.useState(room?.subCategoryId);

	const [audioUri, setAudioUri] = React.useState(room?.content?.src ?? null);

	// console.warn("audio=====", audioUri, "==============");
	React.useEffect(() => {
		return setOptions({
			headerTitle: () => (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View style={{ elevation: 1, borderRadius: 20, marginRight: 10 }}>
						<Image
							onError={({ nativeEvent: { error } }) => setImageError(error)}
							source={
								imageError ? checkGender(rest.gender) : listProfileUrl(id)
							}
							style={styles.profile}
						/>
					</View>
					<Text>{editRoom ? "Update Room" : "Create Room"}</Text>
				</View>
			),
		});
	}, [editRoom]);

	React.useEffect(() => {
		if (params?.audio) {
			setAudioUri(params?.audio);
		}
		// if (params?.categoryData?.subCategoryItem) {
		// 	setCategoryItemName(params?.categoryData?.subCategoryItem);
		// }

		// if (params?.categoryData?.subCategoryId) {
		// 	setSubCategoryId(params?.categoryData?.subCategoryId);
		// }
		// if (params?.categoryData?.categoryId) {
		// 	setCategoryId(params?.categoryData?.categoryId);
		// }

		if (params?.checkUser) {
			setUserCount(params?.checkUser);
		}
		setActiveBtn(
			txt.length > 0 &&
				// categaoryItemName &&
				Object.keys(roomUri).length > 0 &&
				communityType
				? false
				: true
		);
	}, [
		txt,
		categoryName,
		roomUri,
		communityType,
		params,
		subCategoryId,
		categoryId,
		audioUri,
	]);

	const xData = [
		{
			title: categoryName ? categoryName : "Category",
			subTitle: categoryName ? "Change Category" : "Select Category",
			img: require("../../../../../assets/EditDrawerIcon/ic_category.png"),
			onPress: () => navigate("Category"),
		},
		{
			title: txt ? txt : "Casual Chanting",
			subTitle: txt ? "Change Title" : "Select Title",
			img: require("../../../../../assets/EditDrawerIcon/ic_add_plus.png"),
			onPress: () => setRoomTitle(true),
		},
		{
			title: "Add Voice Intro about the topic",
			subTitle: audioUri ? "Change Voice Intro" : "Select Intro",
			img: require("../../../../../assets/EditDrawerIcon/ic_mic.png"),
			onPress: () => navigate("RecordVoice"),
		},
	];

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				{roomTitle && (
					<RoomTitle
						roomTitle={roomTitle}
						setRoomTitle={setRoomTitle}
						txt={txt}
						setTxt={setTxt}
					/>
				)}

				{xData.map((ele, i) => (
					<TouchableWithoutFeedback key={i} onPress={() => ele.onPress()}>
						<View style={styles.mapView}>
							<LinearGradient
								start={{ x: 0, y: 0 }}
								end={{ x: 0.2, y: 1 }}
								colors={["rgba(237, 69, 100, 1 )", "rgba(169, 50, 148, 1 )"]}
								style={styles.gradient}
							>
								<Image source={ele.img} style={{ height: 24, width: 24 }} />
							</LinearGradient>

							<Text style={styles.title}>{ele.title}</Text>

							<View style={styles.subTitleView}>
								<Text
									style={[
										styles.subTitle,

										{
											color:
												i === 0 && categoryName
													? color.gradient
													: "grey" && i === 1 && txt
													? color.gradient
													: i === 2 && audioUri
													? color.gradient
													: "grey",
										},
									]}
								>
									{ele.subTitle}
								</Text>

								<MaterialCommunityIcons
									name="greater-than"
									color={
										i === 0 && categoryName
											? color.gradient
											: "grey" && i === 1 && txt
											? color.gradient
											: i === 2 && audioUri
											? color.gradient
											: "grey"
									}
									size={8}
								/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				))}

				<Text style={styles.txt1}>
					Add an Image, which can be a face of your Room
				</Text>

				<SelectImage
					imageModal={imageModal}
					setImageModal={setImageModal}
					roomUri={roomUri}
					setRoomUri={setRoomUri}
					editRoomUri={room?.imageContent?.src}
				/>

				<Image
					source={require("../../../../../assets/EditDrawerIcon/shadow.png")}
					style={{ height: 10, width: 90, marginTop: 4 }}
				/>

				<Text style={{ marginTop: 24, fontSize: 14 }}>
					Is your Room Public or Private?
				</Text>

				<View style={styles.roomView}>
					<TouchableWithoutFeedback
						onPress={() => {
							setCommunityType("close");
						}}
					>
						<View
							style={[
								styles.room,
								{
									backgroundColor:
										communityType === "close" ? color.white : "#d9dde2",
								},
							]}
						>
							<View
								style={[
									styles.radio,
									{
										backgroundColor:
											communityType === "close" ? color.black : "#bebebe",
									},
								]}
							/>

							<Image
								source={require("../../../../../assets/EditDrawerIcon/close_group.png")}
								style={{ height: 72, width: 72 }}
							/>

							<Text style={{ fontSize: 14, marginTop: 8 }}>Closed Room</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableWithoutFeedback
						onPress={() => {
							setCommunityType("public");
						}}
					>
						<View
							style={[
								styles.room,
								{
									backgroundColor:
										communityType === "public" ? color.white : "#d9dde2",
								},
							]}
						>
							<View
								style={[
									styles.radio,
									{
										backgroundColor:
											communityType === "public" ? color.black : "#bebebe",
									},
								]}
							/>
							<Image
								source={require("../../../../../assets/EditDrawerIcon/public_group.png")}
								style={{ height: 72, width: 72 }}
							/>
							<Text style={{ fontSize: 14, marginTop: 8 }}>Public Room</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<Text style={styles.txt2}>
					Please select either of one to proceed further
				</Text>

				{userCount.length >= 1 && (
					<Text style={styles.txt2}>{userCount.length} user selected.</Text>
				)}

				<AppButton
					disabled={activeBtn}
					style={{ marginTop: 24, marginBottom: 34, width: 230 }}
					title={
						editRoom
							? userCount.length > 0
								? "Update Room"
								: "Update Banjee Contacts"
							: userCount.length > 0
							? "Create Room"
							: "Select Banjee Contacts"
					}
					onPress={() =>
						userCount.length > 0
							? navigate("FilterCreateRoom", {
									update: room ? true : false,
									data: {
										room,
										categoryName,
										categoryId,
										subCategoryId,
										txt,
										roomUri,
										communityType,
										params,
										audioUri,
										userCount,
									},
							  })
							: navigate("SelectBanjee", {
									subCategoryItem: categoryName,
									previousData: room,
							  })
					}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { height: "100%", width: "100%", alignItems: "center" },
	profile: {
		height: 40,
		width: 40,
		borderRadius: 20,
		borderColor: color.primary,
		borderWidth: 1,
	},
	mapView: {
		width: "100%",
		flexDirection: "row",
		paddingLeft: 30,
		height: 60,
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: color.seperate,
	},
	gradient: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 14,
		marginLeft: 15,
		width: "50%",
	},
	subTitleView: {
		flexDirection: "row",
		position: "absolute",
		right: 10,
		alignItems: "center",
	},
	subTitle: {
		// color: color.gradient,
		fontSize: 12,
		marginRight: 10,
	},
	txt1: {
		marginTop: 24,
		width: "50%",
		textAlign: "center",
		fontSize: 14,
	},
	gradient2: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		right: -10,
	},
	roomView: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 24,
	},
	room: {
		height: 130,
		width: 130,
		borderWidth: 1,
		borderColor: "#979797",
		borderRadius: 6,
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	radio: {
		height: 18,
		width: 18,
		position: "absolute",
		top: 5,
		left: 5,
		borderRadius: 50,
		borderColor: "#868686",
		borderWidth: 1,
	},
	txt2: { marginTop: 24, width: "60%", textAlign: "center" },
});

export default CreateRoom;
