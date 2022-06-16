import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import userProfileReducer from "./app/src/redux/store/reducer/userProfileReducer";
import userRegisteryReducer from "./app/src/redux/store/reducer/userRegisteryReducer";
import NavigationView from "./app/src/routes/NavigationView";
import userDataReducer from "./app/src/redux/store/reducer/userDataReducer";

const rootReducer = combineReducers({
	profile: userProfileReducer,
	registry: userRegisteryReducer,
	user: userDataReducer,
});

const store = createStore(rootReducer);

const App = () => {
	console.log(Dimensions.get("screen").width);

	return (
		<Provider store={store}>
			<NavigationContainer>
				<NativeBaseProvider>
					<NavigationView />
				</NativeBaseProvider>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
