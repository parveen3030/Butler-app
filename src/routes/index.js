import LoginSignupNavigator from "../screens/loginSignupMain/loginSignupNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeMainNavigator from "../screens/homeMain/homeMainNavigator";
import NavigationService from "../utils/navigation";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import Loader from "../containers/common/Loader";
import { useSelector } from "react-redux";
import R from "../assets";
import {
  notificationListner,
  requestUserPermission,
} from "../utils/notificationServices";

const Stack = createStackNavigator();

export default function CreateRootNavigator({
  navigation,
  signedIn,
  isOnboarding,
  isLoading = false,
}) {
  React.useEffect(() => {
    SplashScreen.hide();
    // requestUserPermission();
    // notificationListner();
  });

  const { isAppLoading } = useSelector((state) => state.app);

  return (
    <>
      <NavigationContainer ref={NavigationService.navigationRef}>
        <StatusBar
          backgroundColor={R.colors.Black}
          barStyle={"light-content"}
        />
        {/* <SafeAreaProvider> */}
        {/* <SafeAreaView
					style={{ flex: 1, backgroundColor: "black" }}
					edges={["top"]}
				> */}
        <Stack.Navigator>
          {isLoading ? (
            <Stack.Screen name="Splash" component={LoginSignupNavigator} />
          ) : !signedIn ? (
            <Stack.Screen
              name="SignIn"
              component={LoginSignupNavigator}
              options={{
                headerShown: false,
                title: "Sign in",
              }}
            />
          ) : (
            <Stack.Screen
              name="HomeMain"
              options={{
                headerShown: false,
                title: "Sign in",
              }}
              component={HomeMainNavigator}
            />
          )}
        </Stack.Navigator>
        {/* </SafeAreaView> */}
        {/* </SafeAreaProvider> */}
      </NavigationContainer>
      <Modal visible={isAppLoading} transparent>
        <Loader />
      </Modal>
    </>
  );
}
