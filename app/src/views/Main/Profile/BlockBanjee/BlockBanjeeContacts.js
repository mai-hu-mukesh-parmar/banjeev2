import { Avatar, Text } from "native-base";
import React from "react";
import { TouchableHighlight, View, StyleSheet, Image } from "react-native";
import color from "../../../../constants/env/color";
import { listProfileUrl } from "../../../../utils/util-func/constantExport";

function BlockBanjeeContacts({ item, onPress }) {
	return (
		<TouchableHighlight
			onPress={() => console.log(item.user.firstName)}
			style={{ height: 72, width: "100%" }}
			underlayColor={"lightgrey"}
		>
			<React.Fragment>
				<View style={styles.container}>
					<View style={styles.imgView}>
						<Avatar
							bgColor={color.primary}
							style={styles.img}
							source={{ uri: listProfileUrl(item?.user?.id) }}
						>
							{item.user.id === item.connectedUser.id
								? item.user.firstName.charAt(0).toUpperCase()
								: item.connectedUser.firstName.charAt(0).toUpperCase()}
						</Avatar>

						{/* <Image
							style={styles.img}
							source={{ uri: listProfileUrl(item.user.id) }}
						/> */}

						{/* ````````````````````````` ACTIVE STATUS OF USER */}

						{/* {item.connectedUserOnline && <View style={styles.status} />} */}
					</View>

					<View
						style={{
							flexDirection: "column",
							marginLeft: 15,
							width: "49%",
						}}
					>
						<Text numberOfLines={1}>
							{item.user.id === item.connectedUser.id
								? item.user.firstName
								: item.connectedUser.firstName}
						</Text>

						<Text numberOfLines={1} style={{ fontSize: 14, fontWeight: "300" }}>
							{new Date(item.blockedDate).toDateString()}
						</Text>
					</View>

					<TouchableHighlight
						style={styles.txtView}
						onPress={() => onPress(item.id)}
						underlayColor={"grey"}
					>
						<Text style={styles.txt}>Unblock</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.border} />
			</React.Fragment>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
	},
	img: {
		height: "100%",
		width: "100%",
		borderRadius: 20,
	},
	txtView: {
		borderColor: "lightgrey",
		borderWidth: 1,
		position: "absolute",
		right: 15,
		width: "20%",
		height: 30,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4,
	},
	status: {
		height: 8,
		width: 8,
		borderRadius: 4,
		backgroundColor: color.activeGreen,
		position: "absolute",
		bottom: 0,
		left: "10%",
		zIndex: 1,
	},
	imgView: {
		position: "relative",
		elevation: 10,
		height: 40,
		width: 40,
		borderRadius: 20,
		marginLeft: 16,
		shadowColor: color.black,
		shadowOffset: { width: 2, height: 6 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	txt: {
		fontSize: 14,
	},
	border: {
		height: 1,
		position: "absolute",
		right: 0,
		bottom: 0,
		width: "82%",
		borderBottomColor: "lightgrey",
		borderBottomWidth: 1,
	},
});

export default BlockBanjeeContacts;
