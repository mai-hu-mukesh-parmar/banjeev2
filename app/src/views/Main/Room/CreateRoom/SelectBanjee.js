import React from "react";
import {
	View,
	VirtualizedList,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { myBanjeeService } from "../../../../helper/services/Service";
import SelectBanjeeContact from "./SelectBanjeeContact";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import { Text } from "native-base";
import color from "../../../../constants/env/color";
import { useSelector } from "react-redux";

function SelectBanjee() {
	const [data, setData] = React.useState([]);
	const [visible, setVisible] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);

	const [checkUser, setCheckUser] = React.useState([]);
	const [singleUser, setSingleUser] = React.useState();
	// console.warn("check user", checkUser);

	const { navigate } = useNavigation();
	const { params } = useRoute();

	const { systemUserId } = useSelector((state) => state.registry);

	// console.warn("------------------------->", editRoomContact);

	const listUser = React.useCallback(() => {
		myBanjeeService({
			blocked: false,
			circleId: null,
			connectedUserId: null,
			fromUserId: null,
			id: null,
			keyword: null,
			toUserId: null,
			userId: systemUserId,
		})
			.then((res) => {
				setRefresh(false);
				setVisible(false);

				const x = res.content.map((item) =>
					systemUserId === item.connectedUser.id
						? {
								...item.user,
								userId: item.id,
								userLastSeen: item.userLastSeen,
								connectedUserOnline: item.userOnline,
								chatroomId: item.chatroomId,
						  }
						: {
								...item.connectedUser,
								userId: item.id,
								userLastSeen: item.cUserLastSeen,
								connectedUserOnline: item.connectedUserOnline,
								chatroomId: item.chatroomId,
						  }
				);
				setData(x);
			})
			.catch((err) => console.warn(err));
	}, []);

	const submitButton = () => {
		if (params?.addUser) {
			navigate("RoomVideoCall", { singleUser });
		} else {
			navigate("CreateRoom", {
				checkUser,
				subCategoryItem: params?.subCategoryItem,
			});
		}
	};

	React.useEffect(() => {
		setVisible(true);
		listUser();
		return () => setSingleUser(null);
	}, [listUser]);

	function renderItem({ item }) {
		return (
			<SelectBanjeeContact
				contact={checkUser}
				setContact={setCheckUser}
				setSingleUser={setSingleUser}
				singleUser={singleUser}
				item={item}
				isRoom={params.addUser}
			/>
		);
	}

	function onRefresh() {
		return setRefresh(true), listUser();
	}
	return (
		<React.Fragment>
			{visible && <AppLoading visible={visible} />}

			<View style={styles.container}>
				<VirtualizedList
					getItemCount={(data) => data.length}
					getItem={(data, index) => data[index]}
					showsVerticalScrollIndicator={false}
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					refreshing={refresh}
					onRefresh={onRefresh}
				/>

				<TouchableWithoutFeedback onPress={() => submitButton()}>
					<View style={styles.txtView}>
						<Text onPress={() => submitButton()} style={styles.txt}>
							Add them into Room
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</React.Fragment>
	);
}
const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		position: "relative",
	},
	txtView: {
		position: "absolute",
		bottom: 0,
		height: 30,
		alignSelf: "center",
		alignItems: "center",
		backgroundColor: color.primary,
		borderRadius: 20,
		marginBottom: "5%",
		justifyContent: "center",
	},
	txt: {
		textAlign: "center",
		fontSize: 12,
		color: color.white,
		fontWeight: "400",
		paddingHorizontal: 10,
	},
});
export default SelectBanjee;
