import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import MainBackground from "../../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import R from "../../../assets";

import {connect } from "react-redux";
import { getJobs, getJobInvites } from "../../../redux/job/actions";
import { userDataSelector } from "../../../redux/auth/selectors";
import { useFocusEffect } from "@react-navigation/native";

const JobsHome = ({ navigation, getJobs, getJobInvites, jobInvites }) => {
  const [notification, setNotification] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getJobs();
      getJobInvites();
    }, [])
  );
  

  useFocusEffect(
    useCallback(() => {
      if (Array.isArray(jobInvites)) {
        setNotification(jobInvites.length);
      }
    }, [jobInvites])
  );

  return (
    <MainBackground showButler>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>My Jobs</Text>
        <View style={styles.contentView}>
          <View style={{ height: screenHeightInPercent(3) }} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "New Jobs" })
            }
            style={[
              styles.card,
              { backgroundColor: R.colors.PrimaryColorDarkExtra },
            ]}
          >
            {notification > 0 && (
              <View style={styles.notificationView}>
                <Text style={styles.notificationTxt}>{notification}</Text>
              </View>
            )}

            <Text style={styles.cardTxt}>New Jobs</Text>
          </TouchableOpacity>
          <View style={{ height: screenHeightInPercent(5) }} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "Current Jobs" })
            }
            style={[
              styles.card,
              { backgroundColor: R.colors.PrimaryColorDark },
            ]}
          >
            <Text style={styles.cardTxt}>Current Jobs</Text>
          </TouchableOpacity>
          <View style={{ height: screenHeightInPercent(5) }} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "Previous Jobs" })
            }
            style={[styles.card, { backgroundColor: R.colors.LightGrey }]}
          >
            <Text style={styles.cardTxt}>Previous Jobs</Text>
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Image
            style={{
              width: screenWidthInPercent(100),
              resizeMode: "contain",
              height: screenHeightInPercent(12),
            }}
            source={R.images.birds}
          />
        </View>
      </View>
    </MainBackground>
  );
};

const mapStateToProps = (state) => ({
  user: userDataSelector(state),
  jobInvites: state.job.jobInvites,
});

const mapDispatchToProps = {
  getJobs,
  getJobInvites,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsHome);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 16 : 22),
  },
  contentView: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: screenHeightInPercent(3),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.4),
  },
  card: {
    height: screenHeightInPercent(11),
    width: screenWidthInPercent(75),
    alignSelf: "center",
    borderRadius: screenHeightInPercent(2),
    justifyContent: "center",
    alignItems: "center",
  },
  cardTxt: {
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(3.2),
    color: R.colors.White,
  },
  notificationTxt: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: R.fonts.Inter_regular,
    color: R.colors.White,
    fontSize: screenHeightInPercent(2.5),
  },
  notificationView: {
    backgroundColor: R.colors.LightRed,
    opacity: 1,
    width: screenHeightInPercent(4),
    height: screenHeightInPercent(4),
    borderRadius: screenHeightInPercent(2),
    justifyContent: "center",
    position: "absolute",
    right: -screenWidthInPercent(2),
    top: -screenHeightInPercent(2),

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
});
