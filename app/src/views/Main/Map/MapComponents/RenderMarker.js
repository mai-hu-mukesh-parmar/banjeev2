import { useNavigation } from "@react-navigation/native";
import { Text } from "native-base";
import React, { Fragment, useEffect, useRef } from "react";
import { Image, View } from "react-native";
import { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { profileUrl } from "../../../../utils/util-func/constantExport";

export default function RenderMarker() {
	const { navigate } = useNavigation();
	const markerRef = useRef(null);

	const {
		registry: { systemUserId: mySysId },
		map,
	} = useSelector((state) => state);

	const { banjeeUsers } = map;

	return (
		<Fragment>
			{banjeeUsers &&
				banjeeUsers.length > 0 &&
				banjeeUsers.map((user, i) => {
					const {
						id,
						age,
						online,
						avtarUrl,
						existsInContact,
						name,
						gender,
						systemUserId,
						email,
						userObject: { mobile },
						currentLocation: { lon: longitude, lat: latitude },
					} = user;
					return (
						<Fragment key={i}>
							<View
								style={{
									display: "flex",
									position: "relative",
									justifyContent: "center",
									alignItems: "center",
									zIndex: 99999,
								}}
							>
								{!existsInContact ? (
									<Marker
										onPress={() =>
											navigate("ProfileCards", {
												userLocation: {
													userLatitude: latitude,
													userLongitude: longitude,
												},
											})
										}
										key={id}
										coordinate={{
											longitude,
											latitude,
											latitudeDelta: 1,
											longitudeDelta: 1,
										}}
									>
										<Image
											style={{
												width: 50,
												height: 80,
												top: 0,
												left: 0,
												zIndex: 99999,
											}}
											source={require("../../../../../assets/EditDrawerIcon/ic_map_blue.png")}
										/>
										<Image
											style={{
												width: 40,
												height: 40,
												position: "absolute",
												top: 4,
												left: 5,
												borderRadius: 50,
												zIndex: 1,
											}}
											source={{
												uri: profileUrl(avtarUrl),
											}}
										/>
									</Marker>
								) : mySysId === systemUserId ? null : (
									<Marker
										onPress={() =>
											navigate("BanjeeProfile", {
												item: {
													age: age,
													avtarUrl: avtarUrl,
													birthDate: "",
													chatroomId: "",
													connectedUserOnline: online,
													domain: null,
													email: email,
													firstName: name,
													gender: gender,
													id: systemUserId,
													lastName: null,
													locale: null,
													mcc: null,
													mobile: mobile,
													name: null,
													realm: null,
													ssid: null,
													systemUserId: systemUserId,
													timeZoneId: null,
													userId: id,
													// userId: "6257f7879e27bd1e9593dda5", jigabhai ka userId hey
													userLastSeen: null,
													username: null,
												},
											})
										}
										key={id}
										coordinate={{
											longitude,
											latitude,
											latitudeDelta: 1,
											longitudeDelta: 1,
										}}
									>
										<Image
											style={{
												width: 50,
												height: 80,
												top: 0,
												left: 0,
												zIndex: 99999,
											}}
											source={require("../../../../../assets/EditDrawerIcon/ic_map_yellow.png")}
										/>
										<Image
											style={{
												width: 40,
												height: 40,
												position: "absolute",
												top: 4,
												left: 5,
												borderRadius: 50,
												zIndex: 1,
											}}
											source={{
												uri: profileUrl(avtarUrl),
											}}
										/>
									</Marker>
								)}
							</View>
						</Fragment>
					);
				})}
		</Fragment>
	);
}
