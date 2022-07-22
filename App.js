import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React, { Fragment } from "react";
import { Dimensions, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import store from "./app/src/redux/store";
import NavigationView from "./app/src/routes/NavigationView";
import AuthSocket from "./app/src/Socket/Socket";
import { SocketContext, socket } from "./app/src/Context/Socket";
import SocketEvents from "./app/src/Socket/SocketEvents";
import { LogBox } from "react-native";
import Firebase from "./app/src/notification";
import GetNotification from "./app/src/Socket/GetNotification";
LogBox.ignoreLogs([
	"ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'",
]);

const App = () => {
	// console.log(Dimensions.get("screen").width);

	return (
		<Provider store={store}>
			<AuthSocket>
				{/* <Firebase />
				<GetNotification> */}
				<NavigationContainer>
					{/* <SocketEvents> */}
					<NativeBaseProvider>
						<NavigationView />
					</NativeBaseProvider>
					{/* </SocketEvents> */}
				</NavigationContainer>
				{/* </GetNotification> */}
			</AuthSocket>
		</Provider>
	);
};

export default App;
