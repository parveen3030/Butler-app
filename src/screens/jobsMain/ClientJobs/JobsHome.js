import React, { useEffect, useCallback } from "react";
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

import { connect } from "react-redux";
import { getJobs } from "../../../redux/job/actions";
import { userDataSelector } from "../../../redux/auth/selectors";
import { useFocusEffect } from "@react-navigation/native";

const JobsHome = ({ navigation, getJobs}) => {

  useFocusEffect(
    useCallback(() => {
      getJobs();
    }, [])
  );

  return (
    <MainBackground showButler>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>My Jobs</Text>
        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "Current Jobs" })
            }
            style={[
              styles.card,
              { backgroundColor: R.colors.PrimaryColorDark,
                marginBottom: screenHeightInPercent(5)
               },
            ]}
          >
            <Text style={styles.cardTxt}>Current Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "Previous Jobs" })
            }
            style={[styles.card, { backgroundColor: R.colors.LightGrey }]}
          >
            <Text style={styles.cardTxt}>Previous Jobs</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ height: screenHeightInPercent(12) }} /> */}
        <View style={{ justifyContent: "flex-end" }}>
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
});

const mapDispatchToProps = {
  getJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsHome);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 16 : 22),
  },
  contentView: {
    flex: 1,
    paddingTop: screenHeightInPercent(7),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.4),
  },
  card: {
    height: screenHeightInPercent(15),
    width: screenWidthInPercent(90),
    alignSelf: "center",
    borderRadius: screenHeightInPercent(2),
    justifyContent: "center",
    alignItems: "center",
  },
  cardTxt: {
    fontFamily: R.fonts.BalooBhai_extrabold,
    fontSize: screenHeightInPercent(3.9),
    color: R.colors.White,
  },
});
