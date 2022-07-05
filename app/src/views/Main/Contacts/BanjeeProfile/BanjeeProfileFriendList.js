import React from "react";
import { View, StyleSheet, VirtualizedList } from "react-native";
import { useRoute } from "@react-navigation/native";
import BanjeeProfileFriendListItem from "./BanjeeProfileFriendListItem";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import { findUserContact } from "../../../../helper/services/FindUserContact";
import { pendingConnection } from "../../../../redux/store/action/Profile/userPendingConnection";

function BanjeeProfileFriendList({ pendingConnectionsHandler }) {
	const { profileId: user } = useSelector((state) => state.viewProfile);
	const [data, setData] = React.useState([]);
	const { systemUserId } = useSelector((state) => state.registry);
	const dispatch = useDispatch();
	const findUserContactFunc = React.useCallback(() => {
		findUserContact({
			id: user,
			page: 0,
			pageSize: 0,
		})
			.then((res) => {
				let x = res.filter((ele) => ele.systemUserId === systemUserId);
				dispatch(
					pendingConnection({
						mutualFriend: x.length > 0 ? true : false,
						loading: false,
					})
				);

				// pendingConnectionsHandler(x.map((ele) => ele.systemUserId));
				// setPendingFrienReq(x.map((ele) => ele.systemUserId));

				let q = [];
				res.map((ele) =>
					ele.pendingConnections.map((id) => {
						id === systemUserId
							? ((q = [...q, ele.systemUserId]),
							  dispatch(pendingConnection({ pendingId: q })))
							: null;
					})
				);

				const d = res.map((ele) => {
					if (ele.systemUserId === systemUserId) {
						return { ...ele, type: "YOU" };
					} else if (ele.mutual) {
						return { ...ele, type: "MUTUAL" };
					} else {
						return { ...ele, type: "UNKNOWN" };
					}
				});

				setData(d);
			})
			.catch((err) => console.warn(err));
		return () => {
			return null;
		};
	}, [user]);

	React.useEffect(() => {
		findUserContactFunc();
	}, [findUserContactFunc]);

	function renderItem({ item }) {
		return <BanjeeProfileFriendListItem item={item} />;
	}

	return (
		<React.Fragment>
			<View style={styles.container}>
				<VirtualizedList
					getItemCount={(data) => data.length}
					getItem={(data, index) => data[index]}
					showsVerticalScrollIndicator={false}
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
				/>
			</View>
		</React.Fragment>
	);
}
const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "90%",
		alignSelf: "center",
		marginTop: 5,
	},
});

export default BanjeeProfileFriendList;
