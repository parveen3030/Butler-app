import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Jobs from "./Jobs";
import JobsHome from "./ClientJobs/JobsHome";
import JobsList from "./ClientJobs/JobsList";
import JobDetail from "./ClientJobs/JobDetail";
import { useSelector } from "react-redux";

import FJobsHome from "./FreelancerJobs/JobsHome";
import FJobsList from "./FreelancerJobs/JobsList";
import FJobDetail from "./FreelancerJobs/JobDetail";

const Stack = createStackNavigator();

function JobsMainNavigator({ navigation }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator>
      {user.userType == "client" ? (
        <>
          {/* <Stack.Screen
            name="Jobs"
            options={{ headerShown: false }}
            component={Jobs}
          /> */}
          <Stack.Screen
            name="JobsHome"
            options={{ headerShown: false }}
            component={JobsHome}
          />
          <Stack.Screen
            name="JobsList"
            options={{ headerShown: false }}
            component={JobsList}
          />
          <Stack.Screen
            name="JobDetail"
            options={{ headerShown: false }}
            component={JobDetail}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="JobsHome"
            options={{ headerShown: false }}
            component={FJobsHome}
          />
          <Stack.Screen
            name="JobsList"
            options={{ headerShown: false }}
            component={FJobsList}
          />
          <Stack.Screen
            name="JobDetail"
            options={{ headerShown: false }}
            component={FJobDetail}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default JobsMainNavigator;
