import { Text } from "native-base";
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import color from "../../../../constants/env/color";
import { profileUrl } from "../../../../utils/util-func/constantExport";

import PlayVoice from "./PlayVoice";

function UpdateVoice() {
	const { voiceIntroSrc, avtarUrl } = useSelector((state) => state.registry);
	// React.useEffect(
	//   () =>
	//     getAllUser({
	//       distance: "100",
	//       point: { lat: latitude, lon: longitude },
	//       page: 0,
	//       pageSize: 20,
	//     })
	//       .then((res) => console.log("voice urls->",res.content.map((ele) => ele.voiceIntroSrc)))
	//       .catch((err) => console.log("voice error", err)),
	//   []
	// );

	return (
		<React.Fragment>
			{voiceIntroSrc ? (
				<View style={styles.container}>
					<Image
						style={styles.img}
						source={
							avtarUrl
								? {
										uri: profileUrl(avtarUrl),
								  }
								: require("../../../../../assets/EditDrawerIcon/neutral_placeholder.png")
						}
					/>

					<PlayVoice />
				</View>
			) : (
				<Text>nnnnnnnnooooooo intro</Text>
			)}
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.drawerDarkGrey,
		flex: 1,
	},
	img: {
		height: 150,
		width: 150,
		alignSelf: "center",
		marginTop: 20,
		borderRadius: 75,
		borderColor: color.white,
		borderWidth: 5,
	},
});

export default UpdateVoice;
