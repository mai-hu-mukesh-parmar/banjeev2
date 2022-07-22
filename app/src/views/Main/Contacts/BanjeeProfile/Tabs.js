import { Text } from "native-base";
import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import AppFabButton from "../../../../constants/components/ui-component/AppFabButton";
import AppMenu from "../../../../constants/components/ui-component/AppMenu";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";
import color from "../../../../constants/env/color";

function Tabs(props) {
	const userType = showReqestedFriend
		? frndReqData
		: mutualFriend
		? data
		: unMutual;

	return (
		<ImageBackground
			source={require("../../../../../assets/EditDrawerIcon/rectangle.png")}
			style={styles.blackBox}
		>
			{/* ---------------------------- APPMENU */}

			<View
				style={{
					position: "absolute",
					right: 0,
					marginTop: 20,
				}}
			>
				<AppMenu
					menuColor={color.white}
					menuContent={
						mutualFriend
							? [
									{
										icon: "account-minus",
										label: "Unfriend",
										onPress: () => setUnfriendModal(true),
									},
									{
										icon: "block-helper",
										label: "Block User",
										onPress: () => setBlockModal(true),
									},
									{
										icon: "flag",
										label: "Report This User",
										onPress: () => setReportModal(true),
									},
							  ]
							: [
									{
										icon: "block-helper",
										label: "Block User",
										onPress: () => setBlockModal(true),
									},
									{
										icon: "flag",
										label: "Report This User",
										onPress: () => setReportModal(true),
									},
							  ]
					}
				/>
			</View>

			<Text style={styles.name} numberOfLines={1}>
				{ourProfile?.name}
			</Text>

			<View style={styles.iconImg}>
				{userType.map((ele, i) => (
					<View
						key={i}
						style={{
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<AppFabButton
							onPress={() => ele.onPress()}
							size={22}
							icon={
								<View
									style={[
										styles.icon,
										{
											borderColor: ele?.borderColor ? "grey" : color.white,
										},
									]}
								>
									{i === 0 ? (
										<MaterialCommunityIcons
											name={icons}
											color={color.white}
											size={24}
										/>
									) : (
										<FastImage
											source={ele.img}
											style={{
												height: 24,
												width: 24,
												tintColor: ele?.tintColor,
											}}
										/>
									)}
								</View>
							}
						/>
						<Text style={styles.label}>{ele.label}</Text>
					</View>
				))}
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default Tabs;
