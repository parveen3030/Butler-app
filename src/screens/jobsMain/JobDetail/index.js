import React, { Component, useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../../assets";

import {
  getJobInvites,
  getJobs,
} from "../../../redux/job/actions";
import { acceptJobInvite, getJobDetail } from "../../../network/jobApi";
import { inputContainers } from "../../../containers/input";

const JobDetail = (props) => {
  const [job, setJob] = useState(null);
  const dispatch = useDispatch();
  const { jobID } = props.route.params;
  let SubmitButtonContainer = inputContainers["submitButton"];

  useEffect(() => {
    getJobDetail(jobID)
      .then((data) => {
        if (data) {
          setJob(data);
        }
      })
      .catch((err) => {});
  }, []);

  const accept = () => {
    acceptJobInvite(job?.job?._id)
      .then((data) => {
        if (data?.status == "ACCEPTED") {
          props.navigation.goBack();
          dispatch(getJobInvites());
          dispatch(getJobs());
        }
      })
      .catch((err) => {});
  };

  const decline = () => {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: R.colors.White,
      }}
    >
      <KeyboardAvoidingView style={{ flex: 1, padding: 20 }}>
        <View
          style={[
            {
              flex: 1,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              {
                color: R.colors.DarkBlack,
                fontSize: hp("2.2%"),
                fontFamily: R.fonts.defaultMedium,
              },
            ]}
          >
            {job?.job?.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              {
                color: R.colors.Grey,
                fontSize: hp("1.6%"),
                fontFamily: R.fonts.defaultMedium,
              },
            ]}
          >
            {job?.job?.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              numberOfLines={1}
              style={[
                {
                  marginTop: 10,
                  color: R.colors.DarkGrey,
                  fontSize: hp("1.5%"),
                  fontFamily: R.fonts.defaultMedium,
                },
              ]}
            >
              Category:{" "}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                {
                  marginTop: 10,
                  color: R.colors.PrimaryColorDark,
                  fontSize: hp("1.6%"),
                  fontFamily: R.fonts.ArialRoundedBold,
                },
              ]}
            >
              {job?.job?.category?.name.charAt(0).toUpperCase() +
                job?.job?.category?.name.substr(1)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <SubmitButtonContainer
            containerStyle={{
              width: "45%",
              height: hp("6%"),
              borderRadius: 10,
              alignSelf: "center",
              padding: 2,
            }}
            contentContainerStyle={[
              R.appStyles.rowCenter,
              { flex: 1, backgroundColor: R.colors.White, borderRadius: 8 },
            ]}
            activeOpacity={1}
            titleTextStyle={{
              fontSize: hp("2.4%"),
              color: R.colors.PrimaryColorDark,
              fontFamily: R.fonts.defaultSemiBold,
            }}
            title={"DECLINE"}
            onPress={() => decline()}
          />
          <SubmitButtonContainer
            containerStyle={{
              width: "45%",
              height: hp("6%"),
              borderRadius: 10,
              alignSelf: "center",
            }}
            contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
            gradientColors={[
              R.colors.PrimaryColorDark,
              R.colors.PrimaryColorDark,
            ]}
            titleTextStyle={{
              fontSize: hp("2.4%"),
              color: R.colors.White,
              fontFamily: R.fonts.defaultSemiBold,
            }}
            title={"ACCEPT"}
            onPress={() => accept()}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(JobDetail);
