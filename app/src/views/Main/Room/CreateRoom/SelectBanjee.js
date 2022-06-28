import React, { useState } from "react";
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
import color from "../../../../constants/env/color";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "native-base";
import { setRoomData } from "../../../../redux/store/action/roomAction";

function SelectBanjee() {
	const dispatch = useDispatch();

	const [visible, setVisible] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);
	const [checkUser, setCheckUser] = React.useState([]);
	const [singleUser, setSingleUser] = React.useState();

	const { navigate } = useNavigation();
	const { params } = useRoute();

	const { registry, room } = useSelector((state) => state);
	const { systemUserId } = registry;
	const { connectedUser, selectedUser } = room;
	const [selectedUserArray, setSelectedUserArray] = useState(selectedUser);

	const [editRoomContact] = React.useState(
		params?.previousData?.connectedUsers
	);

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
				console.log("x", x);
				dispatch(setRoomData({ connectedUser: x }));
			})
			.catch((err) => console.warn(err));
	}, [systemUserId]);

	const submitButton = () => {
		dispatch(setRoomData({ selectedUser: selectedUserArray }));
		if (params?.addUser) {
			navigate("RoomVideoCall", { singleUser });
		} else {
			navigate("CreateRoom");
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
				editBanjeeContact={editRoomContact}
				contact={checkUser}
				setContact={setCheckUser}
				setSingleUser={setSingleUser}
				singleUser={singleUser}
				item={item}
				isRoom={params.addUser}
				setSelectedUserArray={setSelectedUserArray}
				selectedUserArray={selectedUserArray}
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
					getItemCount={(data) => data?.length}
					getItem={(data, index) => data[index]}
					showsVerticalScrollIndicator={false}
					data={connectedUser}
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
