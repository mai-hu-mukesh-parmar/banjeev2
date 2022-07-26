import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";
import AppFabButton from "../../../constants/components/ui-component/AppFabButton";
import color from "../../../constants/env/color";
import { listProfileUrl } from "../../../utils/util-func/constantExport";
import { useNavigation } from "@react-navigation/native";
import checkUserStatus from "./ChatComponent/checkUserStatus";
import { SocketContext } from "../../../Context/Socket";
import { Avatar, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/store/action/Profile/userPendingConnection";
import BanjeeContactProfile from "./BanjeeContactProfile";

function BanjeeContacts(props) {
	const { item } = props;
	const { navigate } = useNavigation();
	const { systemUserId, currentUser, avtarUrl, name } = useSelector(
		(state) => state.registry
	);
	const onlineStatus = useSelector((state) => state.onlineStatus);
	// console.log(onlineStatus);
	const socket = React.useContext(SocketContext);

	// const [onlineStatus, setOnlineStatus] = React.useState();

	// React.useEffect(() => {
	//   socket.on("ONLINE_STATUS", (data) => {
	//     if (item?.id === data?.fromId) {
	//       setOnlineStatus(data);
	//     }
	//   });
	// }, []);

	const getStatus = () => {
		if (item?.connectedUserOnline) {
			if (
				onlineStatus?.length > 0 &&
				onlineStatus?.filter((ele) => ele?.fromId === item?.id)?.length > 0
			) {
				if (
					onlineStatus?.filter((ele) => ele?.fromId === item?.id)?.[0]?.online
				) {
					return "Online";
				} else {
					return checkUserStatus(
						onlineStatus?.filter((ele) => ele?.fromId === item?.id)?.[0]
							?.lastSeen,
						true
					);
				}
			} else {
				return "Online";
			}
		} else {
			if (
				onlineStatus?.length > 0 &&
				onlineStatus?.filter((ele) => ele?.fromId === item?.id)?.length > 0
			) {
				if (
					onlineStatus?.filter((ele) => ele?.fromId === item?.id)?.[0]?.online
				) {
					return "Online";
				} else {
					return checkUserStatus(
						onlineStatus?.filter((ele) => ele?.fromId === item?.id)?.[0]
							?.lastSeen,
						true
					);
				}
			} else {
				return checkUserStatus(item?.userLastSeen, true);
			}
		}
	};

	// const getStatus = () => {
	//   if (item.connectedUserOnline) {
	//     if (onlineStatus) {
	//       if (onlineStatus?.online) {
	//         return "Online";
	//       } else {
	//         return checkUserStatus(onlineStatus?.lastSeen, true);
	//       }
	//     } else {
	//       return "Online";
	//     }
	//   } else {
	//     if (onlineStatus) {
	//       if (onlineStatus?.online) {
	//         return "Online";
	//       } else {
	//         return checkUserStatus(onlineStatus?.lastSeen, true);
	//       }
	//     } else {
	//       return checkUserStatus(item?.userLastSeen, true);
	//     }
	//   }
	// };

	const makeVideoCallFunc = () => {
		socket.emit("SIGNALLING_SERVER", {
			roomId: item.chatroomId,
			fromUserId: systemUserId,
			targetUser: { ...item, avtarImageUrl: item?.avtarUrl },
			toUserId: item.id,
			eventType: "JOIN",
			iceCandidate: null,
			offer: null,
			answer: null,
			mediaStream: null,
			responseMessage: "Room Joined",
			callDuration: "00",
			callType: "Video",
			groupName: null,
			toAvatarSrc: null,
			groupMemberCounts: 0,
			groupCreatorId: null,
			addToCall: false,
			initiator: {
				...currentUser,
				avtarImageUrl: avtarUrl,
				firstName: name,
			},
		});
		setTimeout(() => {
			navigate("MakeVideoCall");
		}, 200);
	};
	return (
		<View
			style={{
				width: "100%",
				flexDirection: "row",
				alignItems: "center",
				backgroundColor: "white",
			}}
		>
			<BanjeeContactProfile item={item} />

			<TouchableWithoutFeedback
				activeOpacity={1}
				onPress={() =>
					navigate("BanjeeUserChatScreen", {
						item: { ...item, listUser: props.listUser },
					})
				}
			>
				<View
					style={{
						height: 72,
						width: "82%",
					}}
				>
					<View style={styles.container}>
						<View style={styles.txtView}>
							<Text
								numberOfLines={1}
								onPress={() =>
									navigate("BanjeeUserChatScreen", {
										item: { ...item, listUser: props.listUser },
									})
								}
							>
								{item?.firstName || ""}
							</Text>

							{props?.showStatus === false ? null : (
								<Text
									numberOfLines={1}
									style={{ fontSize: 14, fontWeight: "300" }}
									onPress={() =>
										navigate("BanjeeUserChatScreen", {
											item: { ...item, listUser: props.listUser },
										})
									}
								>
									{getStatus()}
								</Text>
							)}
						</View>

						<View style={styles.icons}>
							<AppFabButton
								onPress={makeVideoCallFunc}
								size={20}
								icon={
									<FastImage
										style={{ height: 20, width: 20 }}
										source={require("../../../../assets/EditDrawerIcon/ic_video_call1.png")}
									/>
								}
							/>

							<AppFabButton
								// onPress={() =>
								//   navigate("MakeVideoCall", { ...item, callType: "Voice" })
								// }
								onPress={makeVideoCallFunc}
								size={20}
								icon={
									<FastImage
										style={{ height: 20, width: 20 }}
										source={require("../../../../assets/EditDrawerIcon/ic_call1.png")}
									/>
								}
							/>

							<AppFabButton
								onPress={() =>
									navigate("BanjeeUserChatScreen", {
										item: { ...item, listUser: props.listUser },
									})
								}
								size={20}
								icon={
									<FastImage
										style={{ height: 20, width: 20 }}
										source={require("../../../../assets/EditDrawerIcon/ic_voice.png")}
									/>
								}
							/>
						</View>
					</View>

					{/*````````````````````` ITEM SEPERATOR */}

					<View style={styles.border} />
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		zIndex: -2,
	},
	img: {
		// borderColor: color.primary,
		// borderWidth: 1,
		height: "100%",
		width: "100%",
		borderRadius: 20,
	},
	icons: {
		position: "absolute",
		right: 0,
		justifyContent: "space-between",
		flexDirection: "row",
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
		zIndex: 99,
	},
	border: {
		height: 1,
		position: "absolute",
		right: 0,
		bottom: 0,
		width: "100%",
		borderBottomColor: "lightgrey",
		borderBottomWidth: 1,
	},
	txtView: {
		flexDirection: "column",
		width: "49%",
	},
});

export default BanjeeContacts;
