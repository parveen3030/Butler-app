import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import MainBackground from "../../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import R from "../../../assets";
import Icons from "../../../containers/common/Icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { getImageByName } from "../../../utils/data";
import { inputContainers } from "../../../containers/input";

const JobsList = ({ navigation, route }) => {
  const { jobType } = route.params;
  const { jobs } = useSelector((state) => state.job);
  let SubmitButtonContainer = inputContainers["submitButton"];

  return (
    <MainBackground showButler onButlerPress={() => navigation.goBack()}>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>{jobType}</Text>
        <View style={{ height: screenHeightInPercent(3) }} />
        <FlatList
          data={
            jobType == "Current Jobs"
              ? jobs.filter(
                  (d) =>
                    d.status == "PENDING" ||
                    d.status == "ACCEPTED" ||
                    d.status == "IN_PROGRESS" ||
                    d.status == "SUBMITTED" ||
                    d.status == "APPROVED"
                )
              : jobType == "Previous Jobs"
              ? jobs.filter((d) => d.status == "CLOSED")
              : []
          }
          keyExtractor={(d) => d.key}
          renderItem={({ index, item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("JobDetail", {
                    jobType: jobType,
                    data: item,
                  })
                }
                activeOpacity={0.8}
                style={styles.cardBG}
              >
                <View style={styles.imgView}>
                  <Image
                    style={styles.jobImg}
                    resizeMode="contain"
                    source={getImageByName(item?.category?.name)}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text numberOfLines={1} style={styles.cardHead}>
                    {item.title}
                  </Text>
                  <View style={{ flex: 1 }} />
                  <View style={styles.cardRow}>
                    <View
                      style={[
                        R.appStyles.rowHCenter,
                        { width: screenWidthInPercent(23) },
                      ]}
                    >
                      <Icons
                        family={"FontAwesome5"}
                        name="wallet"
                        size={screenHeightInPercent(2.2)}
                        color={R.colors.DarkGrey}
                      />
                      <Text style={styles.cardTxt}>{item.price} EGP</Text>
                    </View>
                    <View style={R.appStyles.rowCenter}>
                      <Icons
                        family={"FontAwesome5"}
                        name="stopwatch"
                        size={screenHeightInPercent(2.3)}
                        color={R.colors.DarkGrey}
                      />
                      <Text style={styles.cardTxt}>
                        {moment(item.endDate).format("MMM DD, YYYY")}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainBackground>
  );
};

export default JobsList;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 16 : 22),
    marginBottom: screenHeightInPercent(3),
    alignItems: 'center'
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.4),
  },
  cardBG: {
    backgroundColor: R.colors.ExtraLightGrey2,
    width: screenWidthInPercent(95),
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: screenHeightInPercent(2),
    marginTop: screenHeightInPercent(1.5),
    marginBottom: screenHeightInPercent(1.5),
  },
  imgView: {
    width: screenHeightInPercent(10),
    height: screenHeightInPercent(10),
    margin: screenHeightInPercent(1),
    borderRadius: screenHeightInPercent(2),
    backgroundColor: R.colors.White,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  jobImg: {
    width: screenHeightInPercent(9),
    height: screenHeightInPercent(9),
  },
  cardContent: {
    marginVertical: screenHeightInPercent(2.6),
    marginLeft: screenWidthInPercent(3),
    flex: 1,
    marginRight: screenWidthInPercent(3),
  },
  cardHead: {
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(2.1),
    color: R.colors.Black,
    textAlign: "center",
  },
  cardRow: {
    flexDirection: "row",
    marginTop: screenHeightInPercent(0.7),
    marginLeft: screenWidthInPercent(10),
  },
  cardTxt: {
    fontSize: screenHeightInPercent(1.4),
    color: R.colors.DarkGrey,
    marginLeft: screenWidthInPercent(1.5),
  },

  btnBG: {
    width: "33%",
    height: screenHeightInPercent(5),
    borderRadius: 10,
    // alignSelf: "center",
  },
});
