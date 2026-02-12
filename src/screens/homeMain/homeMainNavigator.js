import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabMainNavigator from "./tabMainNavigator";
import ChangePassword from "../profileMain/Profile/changePassword";
import { Header } from "../../containers/common/header";
import About from "../profileMain/Profile/about";
import EditProfile from "../profileMain/Profile/edit";
import EditSkills from "../profileMain/Profile/skills";
import SkillsRequest from "../profileMain/Profile/skillsRequest";
import ChatSingle from "../chatsMain/ChatSingle";
import JobInvites from "../jobsMain/JobInvites";
import JobDetail from "../jobsMain/JobDetail";

const Stack = createStackNavigator();

function HomeMainNavigator({ navigation }) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeStack"
				options={{ headerShown: false }}
				component={TabMainNavigator}
			/>
			<Stack.Screen
				name="ChangePassword"
				options={{
					headerShown: true,
					title: "",
					header: (props) => (
						<Header
							{...props}
							transparent={true}
							title={"Password"}
							dotsEnabled={true}
							back={true}
						/>
					),
				}}
				component={ChangePassword}
			/>
			<Stack.Screen
				name="About"
				options={{
					headerShown: true,
					title: "",
					header: (props) => (
						<Header {...props} title={"About"} dotsEnabled={true} back={true} />
					),
				}}
				component={About}
			/>
			<Stack.Screen
				name="EditProfile"
				options={{
					headerShown: true,
					title: "",
					header: (props) => (
						<Header
							{...props}
							title={"Profile"}
							dotsEnabled={true}
							back={true}
						/>
					),
				}}
				component={EditProfile}
			/>
			<Stack.Screen
				name="EditSkills"
				options={{
					headerShown: true,
					title: "",
					header: (props) => (
						<Header
							{...props}
							title={"Skills"}
							dotsEnabled={true}
							back={true}
						/>
					),
				}}
				component={EditSkills}
			/>
			<Stack.Screen
				name="SkillsRequest"
				options={{ headerShown: false }}
				component={SkillsRequest}
			/>
			<Stack.Screen
				name="ChatSingle"
				options={{
					headerShown: false,
					// title: "",
					// header: (props) => (
					// 	<Header {...props} title={"Chat"} dotsEnabled={false} back={true} />
					// ),
				}}
				component={ChatSingle}
			/>
			<Stack.Screen
				name="JobInvites"
				options={{
					headerShown: true,
					title: "",
					header: (props) => (
						<Header
							{...props}
							title={"Invites"}
							dotsEnabled={true}
							back={true}
						/>
					),
				}}
				component={JobInvites}
			/>
			<Stack.Screen
				name="JobDetail"
				options={{
					headerShown: true,
					title: "",
					header: (props) => (
						<Header
							{...props}
							title={"Detail"}
							dotsEnabled={true}
							back={true}
						/>
					),
				}}
				component={JobDetail}
			/>
		</Stack.Navigator>
	);
}

export default HomeMainNavigator;
