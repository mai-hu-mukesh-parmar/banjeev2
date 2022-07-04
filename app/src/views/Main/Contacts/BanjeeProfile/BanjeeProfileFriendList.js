import React from "react";
import { View, StyleSheet, VirtualizedList } from "react-native";
import { useRoute } from "@react-navigation/native";
import BanjeeProfileFriendListItem from "./BanjeeProfileFriendListItem";
import { useDispatch, useSelector } from "react-redux";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import { findUserContact } from "../../../../helper/services/FindUserContact";
import { pendingConnection } from "../../../../redux/store/action/Profile/userPendingConnection";

function BanjeeProfileFriendList({
	pendingConnectionsHandler,
	// pendingFriendReq,
}) {
	// const {
	// 	params: { item: user },
	// } = useRoute();
	const { profileId: user } = useSelector((state) => state.viewProfile);

	const [data, setData] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const { systemUserId, pendingConnections } = useSelector(
		(state) => state.registry
	);

	// const { setPendingFrienReq } = React.useContext(MainContext);
	const dispatch = useDispatch();
	const FindUserContact = React.useCallback(
		() =>
			findUserContact({
				id: user,
				page: 0,
				pageSize: 0,
			})
				.then((res) => {
					setLoading(false);
					// console.warn(res, "ressssss");
					// pendingConnectionsHandler(res.map((ele) => ele.systemUserId));

					// let x = res.filter((ele) =>
					// 	pendingConnections.some((el) => el.includes(ele.systemUserId))
					// );

					// pendingConnectionsHandler(x.map((ele) => ele.systemUserId));

					// dispatch(
					// 	pendingConnection({
					// 		pendingFriendReq: x.map((ele) => ele.systemUserId),
					// 	})
					// );
					// setPendingFrienReq(x.map((ele) => ele.systemUserId));

					const d = res.map((ele) => {
						console.warn(systemUserId);
						console.warn(ele.systemUserId, ele.mutualEE);
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
				.catch((err) => console.warn(err)),
		[user]
	);

	React.useEffect(() => FindUserContact(), [FindUserContact]);

	function renderItem({ item }) {
		return <BanjeeProfileFriendListItem item={item} user={user} />;
	}

	return (
		<React.Fragment>
			{loading && <AppLoading visible={loading} />}
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
