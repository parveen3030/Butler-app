import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "./ChatList";
import ChatHome from "./ChatHome";
import JobChatList from "./JobChatList";
import SupportChatList from "./SupportChatList";
import InvoiceDetails from "./InvoiceDetails";
import JobChatHome from "./JobChatHome";

const Stack = createStackNavigator();

function ChatsMainNavigator({ navigation }) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ChatHome"
				options={{ headerShown: false }}
				component={ChatHome}
			/>
			<Stack.Screen
				name="JobChatList"
				options={{ headerShown: false }}
				component={JobChatList}
			/>
			<Stack.Screen
				name="SupportChatList"
				options={{ headerShown: false }}
				component={SupportChatList}
			/>
			<Stack.Screen
				name="InvoiceDetails"
				options={{ headerShown: false }}
				component={InvoiceDetails}
			/>
			<Stack.Screen
				name="JobChatHome"
				options={{ headerShown: false }}
				component={JobChatHome}
			/>
		</Stack.Navigator>
	);
}

export default ChatsMainNavigator;
