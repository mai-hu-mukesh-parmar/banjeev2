import React, { memo, useEffect, useRef, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	SafeAreaView,
} from "react-native";
import FastImage from "react-native-fast-image";

import { Text } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as Sharing from "expo-sharing";
import RNFetchBlob from "rn-fetch-blob";
import { searchFeed } from "../../../helper/services/SearchFeedbyId";

import AppLoading from "../../../constants/components/ui-component/AppLoading";
import color from "../../../constants/env/color";
import FeedContent from "./FeedSkeleton/FeedContent";
import FeedProfile from "./FeedSkeleton/FeedProfile";
import FeedHeader from "./FeedSkeleton/FeedHeader";
import FeedFooter from "./FeedSkeleton/FeedFooter";
import { useSelector } from "react-redux";

function SinglePost() {
	const { params } = useRoute();
	const [item, setItem] = useState();
	const [open, setOpen] = useState(false);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const refRBSheet = useRef(null);
	const { navigate } = useNavigation();

	const onShare = async (url) => {
		var date = new Date();

		const { config, fs } = RNFetchBlob;
		let PictureDir = fs.dirs.DownloadDir;
		let options = {
			fileCache: true,
			addAndroidDownloads: {
				useDownloadManager: true,
				notification: true,
				path:
					PictureDir +
					"/image_" +
					Math.floor(date.getTime() + date.getSeconds() / 2) +
					".png",
				description: "Image",
			},
		};
		config(options)
			.fetch("GET", url)
			.then(async (res) => {
				console.warn(res.data);
				console.warn(`file://${res.data}`);

				await Sharing.shareAsync(`file:/${res.data}`, {
					mimeType: "image.jpg",
				});

				console.warn("Image Downloaded Successfully.");
			});
	};

	useEffect(() => {
		if (params.newItem) {
			setLoading(false);
			setItem(params.newItem);
		} else if (params.feedId) {
			searchFeed(params.feedId)
				.then((res) => {
					setLoading(false);
					setItem(res);
				})
				.catch((err) => {
					if (err.statusCode) {
						setError(true);
					} else {
						console.warn(err);
					}
				});
		}
	}, [params]);

	return (
		<React.Fragment>
			{error ? (
				<View
					style={{
						alignItems: "center",
						height: "100%",
						width: "100%",
						justifyContent: "center",
					}}
				>
					<Text style={{ fontSize: 20 }}>
						Requested feed no longer available
					</Text>
				</View>
			) : (
				<React.Fragment>
					{loading ? (
						<AppLoading visible={loading} height={"100%"} />
					) : (
						<SafeAreaView>
							<View style={styles.mainView}>
								<View style={styles.grid}>
									<FeedProfile item={item} />
									<View style={styles.header}>
										<FeedHeader
											item={item}
											setDeletePostModal={() => {}}
											setPostId={() => {}}
										/>
									</View>
								</View>
								<FeedContent item={item} />
								<FeedFooter item={item} />

								<TouchableWithoutFeedback
									onPress={() => navigate("Comment", { postId: item?.id })}
								>
									<View
										style={{
											backgroundColor: color.lightGrey,
											justifyContent: "center",
											width: "95%",
											alignSelf: "center",
											height: 40,
											position: "absolute",
											bottom: 20,
											borderRadius: 10,
										}}
									>
										<Text
											style={{
												paddingLeft: 10,
												fontSize: 18,
												color: color.greyText,
											}}
											onPress={() => navigate("Comment", { postId: item?.id })}
										>
											Type your comment here...
										</Text>
									</View>
								</TouchableWithoutFeedback>
								{/* LIKE VIEW */}
								{/* 
									<View
										style={{
										paddingLeft: "5%",

										flexDirection: "row",
										width: "95%",
										alignItems: "center",
										marginTop: 8,
										}}
									>
										<FastImage
										source={item.profile}
										style={{ height: 30, width: 30, borderRadius: 15 }}
										/>
										<Text style={{ fontSize: 14, marginLeft: 8 }}>
										Liked by Shivaram & 123.234 Others
										</Text>
									</View> */}
							</View>
						</SafeAreaView>
					)}
					{/* <View style={{ position: "absolute", height: "100%", width: "100%" }}> */}
					{open && (
						<MenuModalBottomSheet
							setOpen={setOpen}
							refRBSheet={refRBSheet}
							modalItem={[
								{
									label: "report",
									icon: "plus",
									onPress: () => console.log("report pressed"),
								},
								{
									label: "report",
									icon: "plus",
									onPress: () => console.log("report pressed"),
								},
								{
									label: "report",
									icon: "plus",
									onPress: () => console.log("report pressed"),
								},
							]}
						/>
					)}
					{/* </View> */}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	moreText: {
		flexDirection: "row",
		width: "95%",
		alignSelf: "center",
		marginLeft: 20,
		alignItems: "center",
	},

	grid: {
		paddingLeft: "5%",
		width: "100%",
		flexDirection: "row",
		height: 56,
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		height: "100%",
		width: "87%",
		borderBottomColor: color.greyText,
		justifyContent: "space-between",
		marginLeft: 20,
	},

	mainView: {
		height: "100%",
		width: "100%",
		alignSelf: "flex-end",
		marginBottom: 17,
		backgroundColor: "white",
		paddingBottom: 15,
	},
	grid: {
		paddingLeft: "5%",
		width: "100%",
		flexDirection: "row",
		height: 56,
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		height: "100%",
		width: "87%",
		borderBottomColor: color.greyText,
		justifyContent: "space-between",
		marginLeft: 20,
	},

	// postTitle: {
	//   paddingLeft: "5%",
	//   marginRight: 10,
	//   fontSize: 14,
	//   color: "#3a3d3f",
	//   marginTop: 16,
	//   lineHeight: 20,
	//   marginBottom: -35, // post image margin
	// },
});

export default memo(SinglePost);
