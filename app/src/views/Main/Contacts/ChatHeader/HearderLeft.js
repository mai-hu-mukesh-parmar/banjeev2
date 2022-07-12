import { Platform, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import React from "react";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import {
	checkGender,
	listProfileUrl,
} from "../../../../utils/util-func/constantExport";
import { Avatar, Text } from "native-base";
import checkUserStatus from "../ChatComponent/checkUserStatus";

import { SocketContext } from "../../../../Context/Socket";
import color from "../../../../constants/env/color";

export default function HearderLeft({ chatUser }) {
	const { goBack } = useNavigation();
	const [imageError, setImageError] = React.useState();
	const socket = React.useContext(SocketContext);
	// const socket = useSelector((state) => state?.socket);

	const [onlineStatus, setOnlineStatus] = React.useState();
	React.useEffect(() => {
		socket.on("ONLINE_STATUS", (data) => {
			if (chatUser?.id === data?.fromId) {
				setOnlineStatus(data);
			}
		});
	}, []);

	const getStatus = () => {
		if (chatUser?.connectedUserOnline) {
			if (onlineStatus) {
				if (onlineStatus?.online) {
					return "Online";
				} else {
					return checkUserStatus(onlineStatus?.lastSeen, true);
				}
			} else {
				return "Online";
			}
		} else {
			if (onlineStatus) {
				if (onlineStatus?.online) {
					return "Online";
				} else {
					return checkUserStatus(onlineStatus?.lastSeen, true);
				}
			} else {
				return checkUserStatus(chatUser?.userLastSeen, true);
			}
		}
	};
	// console.warn(chatUser);
	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			{Platform.select({
				android: (
					<AppFabButton
						onPress={() => goBack()}
						size={24}
						icon={<MaterialCommunityIcons size={24} name="arrow-left" />}
					/>
				),
			})}

			{/* <FastImage
        onError={({ nativeEvent: { error } }) => {
          setImageError(error);
        }}
        source={
          imageError
            ? checkGender(chatUser.gender)
            : { uri: listProfileUrl(chatUser?.id) }
        }
        style={styles.profileImg}
      /> */}
			<Avatar
				bgColor={color.primary}
				style={styles.profileImg}
				source={{ uri: listProfileUrl(chatUser?.id) }}
			>
				{chatUser?.firstName?.charAt(0).toUpperCase() || ""}
			</Avatar>

			<View
				style={{
					flexDirection: "column",
					alignItems: "flex-start",
					marginLeft: 20,
				}}
			>
				<Text style={{ alignSelf: "flex-start" }}>{chatUser?.firstName}</Text>

				<Text numberOfLines={1} style={{ fontSize: 14, fontWeight: "300" }}>
					{getStatus()}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	profileImg: {
		height: 40,
		width: 40,
		borderRadius: 20,
		marginLeft: Platform.OS === "ios" ? 20 : 0,
	},
});
