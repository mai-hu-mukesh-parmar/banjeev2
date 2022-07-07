import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, useToast } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { Provider } from "react-redux";
import store from "./app/src/redux/store";
import NavigationView from "./app/src/routes/NavigationView";
import AuthSocket from "./app/src/Socket/Socket";
import { SocketContext, socket } from "./app/src/Context/Socket";
import SocketEvents from "./app/src/Socket/SocketEvents";

const App = () => {
	console.log(Dimensions.get("screen").width);

	return (
		<Provider store={store}>
			<SocketContext.Provider value={socket}>
				<AuthSocket>
					<NavigationContainer>
						<SocketEvents>
							<NativeBaseProvider>
								<NavigationView />
							</NativeBaseProvider>
						</SocketEvents>
					</NavigationContainer>
				</AuthSocket>
			</SocketContext.Provider>
		</Provider>
	);
};

export default App;
