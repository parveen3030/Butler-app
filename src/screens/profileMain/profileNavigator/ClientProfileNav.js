import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileHome from "../clientProfile/ProfileHome";
import ProfileOtp from "../clientProfile/ProfileOtp";
import EditProfile from "../clientProfile/EditProfile";
import ChangePassword from "../clientProfile/ChangePassword";
import PaymentCardsList from "../clientProfile/PaymentCardsList";
import AddNewCard from "../clientProfile/AddNewCard";
import SupportChatList from "../../chatsMain/SupportChatList";

const Stack = createStackNavigator();

const ClientProfileNav = () => {
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
        name="AddNewCard"
        component={AddNewCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentCardsList"
        component={PaymentCardsList}
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

export default ClientProfileNav;
