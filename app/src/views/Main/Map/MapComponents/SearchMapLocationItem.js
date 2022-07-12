import React from "react";
import {
	View,
	StyleSheet,
	VirtualizedList,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import axios from "axios";
import { setProfileLocation } from "../../../../utils/Cache/TempStorage";
import { Text } from "native-base";

function SearchMapLocationItem({
	suggestionsList,
	locHandler,
	setSuggestionsList,
}) {
	return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
	container: {},
});

export default SearchMapLocationItem;
