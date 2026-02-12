import React, { Fragment } from "react";
import Home from "./home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IconF from "react-native-vector-icons/FontAwesome";
import IconS from "react-native-vector-icons/Ionicons";
import R from "../../assets";
import GradientContainer from "../../containers/preview/gradientContainer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text, View, Platform } from "react-native";
import ProfileMainNavigator from "../profileMain/profileMainNavigator";
import JobsMainNavigator from "../jobsMain/jobsMainNavigator";
import ChatsMainNavigator from "../chatsMain/chatsMainNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import FreelancerProfileNav from "../profileMain/profileNavigator/FreelancerProfileNav";
import ClientProfileNav from "../profileMain/profileNavigator/ClientProfileNav";
// import HomeIcon from "../../assets/images/homeIcon.svg";
// import ChatIcon from "../../assets/images/chatIcon.svg";
// import JobIcon from "../../assets/images/jobIcon.svg";
// import UserIcon from "../../assets/images/userIcon.svg";
import UserIconSelected from "../../assets/images/userIconSelected.svg";
import { useSelector } from "react-redux";
import { Svg, Path } from "react-native-svg";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function TabMainNavigator({ navigation }) {
  const user = useSelector((state) => state.auth);
  // console.log("user", user.user.userType);
  const ChatIcon = ({ fill, outline }) => {
    return (
      <Svg width={28} fill={fill} viewBox="0 0 28 29" height={29}>
        <Path
          d="M21.0041 25.2844C20.7936 24.8333 20.6264 24.3769 20.5077 23.9099C24.1388 21.7447 26.5613 17.8229 26.5613 13.3438C26.5613 6.52448 20.9447 1 14.0116 1C7.07853 1.00531 1.46191 6.52979 1.46191 13.3492C1.46191 20.1685 7.07853 25.693 14.0116 25.693C14.9558 25.693 15.8784 25.5869 16.7687 25.3958C18.4035 27.3965 20.9393 28.4685 23.5075 28.2881C22.4608 27.5345 21.5922 26.5209 21.0041 25.2844ZM9.39315 14.7926C8.74031 14.7926 8.21696 14.2726 8.21696 13.6357C8.21696 12.9989 8.7457 12.4788 9.39315 12.4788C10.0406 12.4788 10.5694 12.9989 10.5694 13.6357C10.5694 14.2726 10.046 14.7926 9.39315 14.7926ZM14.0116 14.7926C13.3588 14.7926 12.8354 14.2726 12.8354 13.6357C12.8354 12.9989 13.3642 12.4788 14.0116 12.4788C14.6645 12.4788 15.1878 12.9989 15.1878 13.6357C15.1878 14.2726 14.6645 14.7926 14.0116 14.7926ZM18.5168 14.7926C17.8639 14.7926 17.3406 14.2726 17.3406 13.6357C17.3406 12.9989 17.8693 12.4788 18.5168 12.4788C19.1642 12.4788 19.693 12.9989 19.693 13.6357C19.693 14.2726 19.1696 14.7926 18.5168 14.7926Z"
          stroke={outline} //""
          stroke-miterlimit="10"
        />
      </Svg>
    );
  };
  const HomeIcon = ({ fill, outline }) => {
    return (
      <Svg width={28} fill={fill} viewBox="0 0 32 30" height={29}>
        <Path
          d="M30.5004 14.3321H29.1727C28.6173 14.3321 28.1567 14.7863 28.1567 15.334V27.9981C28.1567 28.5458 27.696 29 27.1406 29H4.85452C4.29906 29 3.83844 28.5458 3.83844 27.9981V15.334C3.83844 14.7863 3.37781 14.3321 2.82236 14.3321H1.50822C0.952767 14.3321 0.830837 14.0248 1.25082 13.6641L8.13308 7.57252V3.73855C8.13308 3.32443 8.47177 2.99046 8.89175 2.99046H10.2872C10.7071 2.99046 11.0458 3.32443 11.0458 3.73855V4.99427L15.2456 1.28053C15.6656 0.906489 16.343 0.906489 16.7494 1.28053L30.7443 13.6641C31.1643 14.0248 31.0559 14.3321 30.5004 14.3321Z"
          stroke={outline} //""
          stroke-miterlimit="10"
        />
      </Svg>
    );
  };
  const JobIcon = ({ fill, outline }) => {
    return (
      <Svg width={28} fill={fill} viewBox="0 0 22 29" height={29}>
        <Path
          d="M14.1667 3.625V4.125H14.6667H19.25C20.4975 4.125 21.5 5.12429 21.5 6.34375V26.2812C21.5 27.5007 20.4975 28.5 19.25 28.5H2.75C1.50251 28.5 0.5 27.5007 0.5 26.2812V6.34375C0.5 5.12429 1.50251 4.125 2.75 4.125H7.33333H7.83333V3.625C7.83333 1.9071 9.24834 0.5 11 0.5C12.7517 0.5 14.1667 1.9071 14.1667 3.625ZM3.625 22.6562C3.625 23.6911 4.46728 24.5156 5.5 24.5156C6.53272 24.5156 7.375 23.6911 7.375 22.6562C7.375 21.6214 6.53272 20.7969 5.5 20.7969C4.46728 20.7969 3.625 21.6214 3.625 22.6562ZM3.625 17.2188C3.625 18.2536 4.46728 19.0781 5.5 19.0781C6.53272 19.0781 7.375 18.2536 7.375 17.2188C7.375 16.1839 6.53272 15.3594 5.5 15.3594C4.46728 15.3594 3.625 16.1839 3.625 17.2188ZM3.625 11.7812C3.625 12.8161 4.46728 13.6406 5.5 13.6406C6.53272 13.6406 7.375 12.8161 7.375 11.7812C7.375 10.7464 6.53272 9.92188 5.5 9.92188C4.46728 9.92188 3.625 10.7464 3.625 11.7812ZM12.875 3.625C12.875 2.59017 12.0327 1.76562 11 1.76562C9.96728 1.76562 9.125 2.59017 9.125 3.625C9.125 4.65983 9.96728 5.48438 11 5.48438C12.0327 5.48438 12.875 4.65983 12.875 3.625ZM17.875 24.0625C18.3978 24.0625 18.8333 23.6401 18.8333 23.1094V22.2031C18.8333 21.6724 18.3978 21.25 17.875 21.25H9.625C9.10218 21.25 8.66667 21.6724 8.66667 22.2031V23.1094C8.66667 23.6401 9.10218 24.0625 9.625 24.0625H17.875ZM17.875 18.625C18.3978 18.625 18.8333 18.2026 18.8333 17.6719V16.7656C18.8333 16.2349 18.3978 15.8125 17.875 15.8125H9.625C9.10218 15.8125 8.66667 16.2349 8.66667 16.7656V17.6719C8.66667 18.2026 9.10218 18.625 9.625 18.625H17.875ZM17.875 13.1875C18.3978 13.1875 18.8333 12.7651 18.8333 12.2344V11.3281C18.8333 10.7974 18.3978 10.375 17.875 10.375H9.625C9.10218 10.375 8.66667 10.7974 8.66667 11.3281V12.2344C8.66667 12.7651 9.10218 13.1875 9.625 13.1875H17.875Z"
          stroke={outline} //""
          stroke-miterlimit="10"
        />
      </Svg>
    );
  };
  const UserIcon = ({ fill, outline }) => {
    return (
      <Svg width={33} viewBox="0 0 33 33" height={33}>
        <Path
          d="M16.5 0C7.38508 0 0 7.38508 0 16.5C0 25.6149 7.38508 33 16.5 33C25.6149 33 33 25.6149 33 16.5C33 7.38508 25.6149 0 16.5 0ZM16.5 6.3871C19.7335 6.3871 22.3548 9.00847 22.3548 12.2419C22.3548 15.4754 19.7335 18.0968 16.5 18.0968C13.2665 18.0968 10.6452 15.4754 10.6452 12.2419C10.6452 9.00847 13.2665 6.3871 16.5 6.3871ZM16.5 29.2742C12.5946 29.2742 9.09496 27.5044 6.75302 24.7367C8.00383 22.3815 10.4522 20.7581 13.3065 20.7581C13.4661 20.7581 13.6258 20.7847 13.7788 20.8313C14.6438 21.1107 15.5486 21.2903 16.5 21.2903C17.4514 21.2903 18.3629 21.1107 19.2212 20.8313C19.3742 20.7847 19.5339 20.7581 19.6936 20.7581C22.5478 20.7581 24.9962 22.3815 26.247 24.7367C23.905 27.5044 20.4054 29.2742 16.5 29.2742Z"
          fill={fill}
        />
      </Svg>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { height: hp("10.5%") },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        options={({ navigation, route }) => {
          return {
            headerShown: false,
            tabBarActiveTintColor: R.colors.PrimaryColorDark,
            tabBarIcon: ({ color, size, focused }) => (
              <HomeIcon
                fill={focused ? color : "transparent"}
                outline={focused ? "transparent" : "#7A7C82"}
                width={hp("4%")}
              />
            ),
            tabBarIconStyle: {
              marginBottom: Platform.OS == "ios" ? 0 : -hp("1%"),
            },
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              marginBottom: Platform.OS == "ios" ? 0 : hp("2%"),
              fontSize: hp("1.4%"),
              fontFamily: navigation.isFocused()
                ? R.fonts.Inter_bold
                : R.fonts.Inter_regular,
            },
            tabBarOnPress: () => {},
          };
        }}
        name="Home"
        component={HomeStackNavigator}
      />

      <Tab.Screen
        options={({ navigation, route }) => ({
          headerShown: false,
          tabBarActiveTintColor: R.colors.PrimaryColorDark,
          tabBarIcon: ({ color, size, focused }) => (
            <ChatIcon
              fill={focused ? color : "transparent"}
              outline={focused ? "transparent" : "#7A7C82"}
              width={hp("4%")}
            />
          ),
          tabBarIconStyle: {
            marginBottom: Platform.OS == "ios" ? 0 : -hp("1%"),
          },
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            marginBottom: Platform.OS == "ios" ? 0 : hp("2%"),
            fontSize: hp("1.4%"),
            fontFamily: navigation.isFocused()
              ? R.fonts.Inter_bold
              : R.fonts.Inter_regular,
          },
          tabBarOnPress: () => {},
        })}
        name="Chats"
        component={ChatsMainNavigator}
      />
      <Tab.Screen
        options={({ navigation, route }) => ({
          title: "Jobs",
          headerShown: false,
          tabBarActiveTintColor: R.colors.PrimaryColorDark,
          tabBarIcon: ({ color, size, focused }) => (
            <JobIcon
              fill={focused ? color : "transparent"}
              outline={focused ? "transparent" : "#7A7C82"}
              width={hp("4%")}
            />
          ),
          tabBarIconStyle: {
            marginBottom: Platform.OS == "ios" ? 0 : -hp("1%"),
          },
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            marginBottom: Platform.OS == "ios" ? 0 : hp("2%"),
            fontSize: hp("1.4%"),
            fontFamily: navigation.isFocused()
              ? R.fonts.Inter_bold
              : R.fonts.Inter_regular,
          },
          tabBarOnPress: () => {},
        })}
        name="JobsMain"
        component={JobsMainNavigator}
      />
      <Tab.Screen
        options={({ navigation, route }) => ({
          title: "Account",
          headerShown: false,
          tabBarActiveTintColor: R.colors.PrimaryColorDark,
          tabBarIcon: ({ color, size, focused }) => (
            <UserIcon
              fill={focused ? color : "rgba(66, 68, 78, 1)"}
              width={hp("4%")}
            />
          ),
          tabBarIconStyle: {
            marginBottom: Platform.OS == "ios" ? 0 : -hp("1%"),
          },
          tabBarLabelStyle: {
            marginBottom: Platform.OS == "ios" ? 0 : hp("2%"),
            fontSize: hp("1.4%"),
            fontFamily: navigation.isFocused()
              ? R.fonts.Inter_bold
              : R.fonts.Inter_regular,
          },
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Categories") {
              return { display: "none" };
            } else if (routeName === "FinalMessage") {
              return { display: "none" };
            } else if (routeName === "About") {
              return { display: "none" };
            } else if (routeName === "EditProfile") {
              return { display: "none" };
            } else if (routeName === "ProfileOtp") {
              return { display: "none" };
            } else if (routeName === "ChangePassword") {
              return { display: "none" };
            }
            return { height: hp("10.5%") };
          })(route),
          tabBarShowLabel: true,
        })}
        name="Profile"
        component={
          // ProfileMainNavigator
          user?.user?.userType == "freelancer"
            ? FreelancerProfileNav
            : ClientProfileNav
        }
      />
    </Tab.Navigator>
  );
}

export default TabMainNavigator;
