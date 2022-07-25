import React, { memo, useEffect, useRef, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	SafeAreaView,
} from "react-native";
import FastImage from "react-native-fast-image";

import { Avatar, Text } from "native-base";
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
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../redux/store/action/toastAction";
import { listProfileUrl } from "../../../utils/util-func/constantExport";
import LikedBy from "./Like/LikedBy";

function SinglePost() {
	const { params } = useRoute();
	const [item, setItem] = useState();
	const [open, setOpen] = useState(false);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const refRBSheet = useRef(null);
	const { navigate, goBack } = useNavigation();
	const dispatch = useDispatch();

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
						dispatch(
							showToast({
								open: true,
								description: "Requested feed no longer available",
							})
						);

						goBack();
					} else {
						console.warn(err);
					}
				});
		}
		return () => {
			dispatch(showToast({ open: false }));
		};
	}, [params]);

	return (
		<React.Fragment>
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

							{/* <LikedBy item={params.newItem} /> */}
						</View>
					</SafeAreaView>
				)}

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
			{/* )} */}
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
