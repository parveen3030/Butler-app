import * as React from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect, useDispatch } from "react-redux";
import { getJobInvites, getJobs } from "../../../redux/job/actions";
import {
  jobInvitesLoadingSelector,
  jobInvitesSelector,
  jobsLoadingSelector,
  jobsSelector,
} from "../../../redux/job/selectors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../../assets";
import Icon from "react-native-vector-icons/FontAwesome";
import { userDataSelector } from "../../../redux/auth/selectors";
import JobItem from "../../../containers/preview/jobItem";

const Jobs = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
    dispatch(getJobInvites());
  }, []);

  const renderJobInvitesSection = () => {
    if (props.userData?.userType === "client") return;

    return (
      <>
        {!props.jobInvitesLoading && props.jobInvites?.length > 0 && (
          <View
            style={{
              backgroundColor: R.colors.PrimaryColorDark,
              margin: 20,
              padding: 15,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  width: wp("30%"),
                  fontSize: hp("2.8%"),
                  color: R.colors.White,
                  fontFamily: R.fonts.ArialRoundedBold,
                  textAlign: "center",
                }}
              >
                You have {props.jobInvites.length} invites
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("JobInvites")}
              style={{
                backgroundColor: R.colors.PrimaryColorLight,
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: hp("2%"),
                  color: R.colors.White,
                  fontFamily: R.fonts.ArialRoundedBold,
                  textAlign: "center",
                }}
              >
                SEE INVITES
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: hp("3%"),
            color: R.colors.DarkBlack,
            fontFamily: R.fonts.ArialRoundedBold,
          }}
        >
          Jobs
        </Text>
      </View>
      {renderJobInvitesSection()}
      {props.jobsLoading ? (
        <ActivityIndicator size={hp("10%")} style={{ flex: 1 }} />
      ) : props?.jobs?.length > 0 ? (
        <FlatList
          style={{ padding: 10 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 10 }}
          data={props.jobs}
          extraData={props.jobs}
          renderItem={({ item, index }) => (
            <JobItem
              item={item}
              index={index}
              invite={false}
              jobInvitesLength={props.jobs.length}
              navigation={props.navigation}
            />
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: hp("8%"),
            flex: 1,
          }}
        >
          <Text
            style={[
              {
                color: R.colors.MediumDarkGrey,
                textAlign: "center",
                fontSize: hp("1.8%"),
                fontFamily: R.fonts.defaultRegular,
              },
            ]}
          >
            No Active Job found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

function mapStateToProps(state) {
  return {
    userData: userDataSelector(state),
    jobs: jobsSelector(state),
    jobInvites: jobInvitesSelector(state),
    jobsLoading: jobsLoadingSelector(state),
    jobInvitesLoading: jobInvitesLoadingSelector(state),
  };
}

export default connect(mapStateToProps)(Jobs);
