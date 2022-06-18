import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, useToast } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { Provider } from "react-redux";
import store from "./app/src/redux/store";
import NavigationView from "./app/src/routes/NavigationView";

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
