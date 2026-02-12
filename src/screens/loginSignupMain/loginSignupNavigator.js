import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./Signup/create";
import SignupType from "./Signup";
import Welcome from "./Welcome";
import Processing from "./Signup/processing";
import UserPhoneNumber from "./Signup/Steps/userPhoneNumber";
import UserSkills from "./Signup/Steps/userSkills";
import HearAboutUs from "./Signup/Steps/hearAboutUs";
import Loading from "./Signup/loading";
import Approval from "./Signup/approval";
import UserInformation from "./Signup/Steps/userInformation";
import UserBirthDate from "./Signup/Steps/userBirthDate";
import UserDocuments from "./Signup/Steps/userDocuments";
import Otp from "./Signup/Otp";
import ForgotPassword from "./Login/ForgotPassword";
import ProfileOtp from "../profileMain/freelancerProfile/ProfileOtp";
import NewPassword from "./Login/NewPassword";

const Stack = createStackNavigator();

function LoginSignupNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Welcome"
				options={{ headerShown: false }}
				component={Welcome}
			/>
			<Stack.Screen
				name="Login"
				options={{ headerShown: false }}
				component={Login}
			/>
			<Stack.Screen
				name="SignupType"
				options={{ headerShown: false }}
				component={SignupType}
			/>
			<Stack.Screen
				name="Signup"
				options={{ headerShown: false }}
				component={Signup}
			/>
			<Stack.Screen
				name="Processing"
				options={{ headerShown: false }}
				component={Processing}
			/>
			<Stack.Screen
				name="UserInformation"
				options={{ headerShown: false }}
				component={UserInformation}
			/>
			<Stack.Screen
				name="UserBirthDate"
				options={{ headerShown: false }}
				component={UserBirthDate}
			/>
			<Stack.Screen
				name="UserPhoneNumber"
				options={{ headerShown: false }}
				component={UserPhoneNumber}
			/>
			<Stack.Screen
				name="UserDocuments"
				options={{ headerShown: false }}
				component={UserDocuments}
			/>
			<Stack.Screen
				name="UserSkills"
				options={{ headerShown: false }}
				component={UserSkills}
			/>
			<Stack.Screen
				name="HearAboutUs"
				options={{ headerShown: false }}
				component={HearAboutUs}
			/>
			<Stack.Screen
				name="Loading"
				options={{ headerShown: false }}
				component={Loading}
			/>
			<Stack.Screen
				name="Approval"
				options={{ headerShown: false }}
				component={Approval}
			/>
			<Stack.Screen
				name="Otp"
				options={{ headerShown: false }}
				component={Otp}
			/>
			<Stack.Screen
				name="ForgotPassword"
				options={{ headerShown: false }}
				component={ForgotPassword}
			/>
			<Stack.Screen
				name="ProfileOtp"
				options={{ headerShown: false }}
				component={ProfileOtp}
			/>
			<Stack.Screen
				name="NewPassword"
				options={{ headerShown: false }}
				component={NewPassword}
			/>
		</Stack.Navigator>
	);
}
export default LoginSignupNavigator;
