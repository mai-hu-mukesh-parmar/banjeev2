import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, Text, Dimensions, AppRegistry } from "react-native";
import Sign_In from "./app/src/views/Authurization/Sign_In";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthNavigationView from "./app/src/routes/AuthNavigation/AuthNavigationView";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import userProfileReducer from "./app/src/redux/store/reducer/userProfileReducer";
import userRegisteryReducer from "./app/src/redux/store/reducer/userRegisteryReducer";

const rootReducer = combineReducers({
	profile: userProfileReducer,
	regestry: userRegisteryReducer,
});

const store = createStore(rootReducer);

const App = () => {
	console.log(Dimensions.get("screen").width);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<NativeBaseProvider>
					{/* <Sign_In /> */}
					<AuthNavigationView />
				</NativeBaseProvider>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
