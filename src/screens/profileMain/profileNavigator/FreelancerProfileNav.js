import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHome from "../freelancerProfile/ProfileHome";
import ProfileOtp from "../freelancerProfile/ProfileOtp";
import FinalMessage from "../freelancerProfile/FinalMessage";
import EditProfile from "../freelancerProfile/EditProfile";
import ChangePassword from "../freelancerProfile/ChangePassword";
import Categories from "../freelancerProfile/Categories";
import About from "../freelancerProfile/About";
import SupportChatList from "../../chatsMain/SupportChatList";

const Stack = createStackNavigator();

const FreelancerProfileNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileOtp"
        component={ProfileOtp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FinalMessage"
        component={FinalMessage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SupportChatList"
        component={SupportChatList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FreelancerProfileNav;
