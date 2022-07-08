import { Text } from "native-base";
import React from "react";
import { View, StyleSheet, VirtualizedList } from "react-native";
import { useSelector } from "react-redux";
import AppLoading from "../../../../constants/components/ui-component/AppLoading";
import {
	myBanjeeService,
	unBlockUser,
} from "../../../../helper/services/Service";
import Block_Banjee_Contacts from "./BlockBanjeeContacts";

function BlockBanjee() {
	const [data, setData] = React.useState([]);
	const [visible, setVisible] = React.useState(false);
	const [refresh, setRefresh] = React.useState(false);
	const [error, setError] = React.useState(false);

	const { systemUserId } = useSelector((state) => state.registry);

	const listBlockUsers = React.useCallback(() => {
		setVisible(true);
		myBanjeeService({
			blocked: true,
			circleId: null,
			connectedUserId: null,
			fromUserId: null,
			id: null,
			keyword: null,
			toUserId: null,
			userId: systemUserId,
		})
			.then((res) => {
				if (res) {
					setRefresh(false);
					setVisible(false);
					setData(res.content);
				} else {
					setRefresh(false);
					setVisible(false);
					setError(true);
				}
			})
			.catch((err) => console.warn(err));
	}, []);

	React.useEffect(() => {
		listBlockUsers();
	}, [listBlockUsers]);

	const btnClick = (user) => {
		unBlockUser(user)
			.then((res) => {
				listBlockUsers();
			})
			.catch((err) => console.warn(err));
	};

	function renderItem({ item }) {
		return <Block_Banjee_Contacts item={item} onPress={btnClick} />;
	}
	return (
		<React.Fragment>
			{visible && <AppLoading visible={visible} />}

			<View style={styles.container}>
				{error ? (
					<View
						style={{
							height: "100%",
							justifyContent: "center",
							alignSelf: "center",
						}}
					>
						<Text>You have no blocked banjee contacts.</Text>
					</View>
				) : (
					<VirtualizedList
						getItemCount={(data) => data.length}
						getItem={(data, index) => data[index]}
						showsVerticalScrollIndicator={false}
						data={data}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						refreshing={refresh}
						onRefresh={() => {
							setRefresh(true);
							listBlockUsers();
						}}
						// ItemSeparatorComponent={() => <View style={styles.seperate} />}
					/>
				)}
			</View>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	seperate: {
		height: 1,
		width: "82%",
		backgroundColor: "lightgrey",
		position: "absolute",
		right: 0,
		bottom: 0,
	},
});

export default BlockBanjee;
