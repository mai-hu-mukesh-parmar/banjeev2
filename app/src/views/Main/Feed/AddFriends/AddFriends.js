import { Image, Skeleton, Text } from "native-base";
import React, { Fragment } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native";
import color from "../../../../constants/env/color";
import { useNavigation } from "@react-navigation/native";
import { shallowEqual, useSelector } from "react-redux";
import { getAllUser } from "../../../../helper/services/WelcomeService";
import AddFriendItem from "./AddFriendItem";
import LiveRoom from "../LiveRooms/LiveRoom";
import AddFriendLoader from "./AddFriendLoader";

function AddFriends(props) {
	const [data, setData] = React.useState([]);
	const { navigate } = useNavigation();
	const { registry } = useSelector((state) => state, shallowEqual);

	React.useEffect(() => {
		if (registry?.currentLocation) {
			const { currentLocation } = registry;
			getAllUser({
				cards: true,
				distance: "50",
				point: { lat: currentLocation?.lat, lon: currentLocation?.lon },
				page: 0,
				pageSize: 20,
			})
				.then((res) => {
					setData(res.content);
				})
				.catch((err) => console.log("add friend ", err));
		}
	}, [registry]);

	const renderItem = ({ item, index }) => {
		return <AddFriendItem item={item} index={index} />;
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text
						style={{ marginLeft: "2%", fontSize: 16 }}
						fontWeight={"semibold"}
					>
						Add Friends
					</Text>
					<TouchableWithoutFeedback onPress={() => navigate("Map")}>
						<View style={styles.viewMap}>
							<Text
								style={{
									color: color.primary,
									fontWeight: "300",
								}}
							>
								View in Maps
							</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						flex: 1,
					}}
				>
					{data.length === 0 && <AddFriendLoader />}
					<FlatList
						showsHorizontalScrollIndicator={false}
						horizontal={true}
						data={data}
						keyExtractor={(data) => data.id}
						renderItem={renderItem}
					/>
				</View>
			</View>
			<LiveRoom />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 227,
		width: "100%",
		borderColor: "lightgrey",
		borderWidth: 1,
		borderTopWidth: 0,
		marginBottom: 19,
		backgroundColor: color.white,
	},
	header: {
		height: 51,
		width: "100%",
		alignItems: "center",
		justifyContent: "space-between",
		borderColor: "lightgrey",
		borderWidth: 1,
		alignSelf: "center",
		flexDirection: "row",
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
	viewMap: {
		height: 34,
		borderWidth: 1,
		width: 118,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderColor: color.primary,
		borderRadius: 17,
		marginRight: "2%",
	},
});

export default AddFriends;
