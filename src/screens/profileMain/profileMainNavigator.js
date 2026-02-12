import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';

const Stack = createStackNavigator();

function ProfileMainNavigator({ navigation }) {
	return (
		<Stack.Navigator>
			<Stack.Screen name="ProfileMain" options={{ headerShown: false }} component={Profile} />
		</Stack.Navigator>
	);
}


export default ProfileMainNavigator;
