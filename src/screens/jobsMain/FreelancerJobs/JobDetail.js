import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainBackground from "../../../containers/common/MainBackground";
// import MainBackground from "../../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import R from "../../../assets";
import Icons from "../../../containers/common/Icons";
import moment from "moment";
import { inputContainers } from "../../../containers/input";
import { acceptJobInvite } from "../../../network/jobApi";
import { useDispatch } from "react-redux";
import { setAppLoading } from "../../../redux/app/actions";
import { getImageByName } from "../../../utils/data";

const JobDetail = ({ navigation, route }) => {
  const { jobType } = route.params;
  const { data } = route.params;
  const dispatch = useDispatch();
  const progress =
    data.status == "PENDING"
      ? 1
      : data.status == "ACCEPTED"
      ? 2
      : data.status == "IN_PROGRESS"
      ? 3
      : data.status == "SUBMITTED"
      ? 4
      : data.status == "APPROVED"
      ? 5
      : data.status == "CLOSED"
      ? 6
      : 0;

  let SubmitButtonContainer = inputContainers["submitButton"];
  return (
    <MainBackground showButler onButlerPress={() => navigation.goBack()}>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>{jobType}</Text>
        <View style={styles.whiteView}>

          <View style={styles.contentHeader}>
            <View style={styles.imgView}>
              <Image
                style={styles.jobImg}
                resizeMode="contain"
                source={getImageByName(data?.category?.name)}
              />
            </View>

            

            <View style={styles.headerContent}>
              <Text style={styles.headerHeadTxt} numberOfLines={1}>
                {data.title}
              </Text>
              <Text style={styles.headerDateTxt} numberOfLines={1}>
                Accepted on :{" "}
                <Text style={{ color: R.colors.Black }}>
                  {data.updatedAt? moment(data.updatedAt).format("DD/MM/YYYY") : ""}
                </Text>
              </Text>
              <Text style={styles.headerDateTxt} numberOfLines={1}>
                Deadline :{" "}
                <Text style={{ color: R.colors.Black }}>
                  {moment(data.endDate).format("DD/MM/YYYY")}
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.statusView}>
            <Text style={styles.progressTxt}>{data.status}</Text>

            <View style={styles.priceRow}>
              <Icons
                family={"FontAwesome5"}
                name="wallet"
                size={screenHeightInPercent(2.4)}
                color={R.colors.DarkGrey}
              />
              <Text style={styles.cardTxt}>{data.price} EGP</Text>
            </View>
          </View> 

          <View style={styles.progressView}>
            <View style={styles.progressRow}>
              <View
                style={[
                  styles.progressUnit,
                  { backgroundColor: progress >= 1 ? "#2A8559" : "#80C8A5" },
                ]}
              />
              <View
                style={[
                  styles.progressUnit,
                  { backgroundColor: progress >= 2 ? "#2A8559" : "#80C8A5" },
                ]}
              />
              <View
                style={[
                  styles.progressUnit,
                  { backgroundColor: progress >= 3 ? "#2A8559" : "#80C8A5" },
                ]}
              />
              <View
                style={[
                  styles.progressUnit,
                  { backgroundColor: progress >= 4 ? "#2A8559" : "#80C8A5" },
                ]}
              />
              <View
                style={[
                  styles.progressUnit,
                  { backgroundColor: progress >= 5 ? "#2A8559" : "#80C8A5" },
                ]}
              />
              <View
                style={[
                  styles.progressUnit,
                  { backgroundColor: progress >= 6 ? "#2A8559" : "#80C8A5" },
                ]}
              />
            </View>
          </View>

          <View style={styles.contentView}>
            <View style={styles.contentHead}>
              <Icons
                family={"Ionicons"}
                name="list"
                size={screenHeightInPercent(4.5)}
                color={R.colors.Grey}
              />
              <Text style={styles.contentHeadTxt}>Job Requirements</Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {data.description.map((v, k) => {
                return (
                  <View style={styles.txtRow}>
                    <Text style={styles.contentTxt}>•</Text>
                    <Text
                      style={[
                        styles.contentTxt,
                        {
                          marginRight: screenWidthInPercent(10),
                          marginLeft: screenWidthInPercent(2),
                        },
                      ]}
                    >
                      {v}
                    </Text>
                  </View>
                );
              })}
              <View style={{ flex: 1 }} />
              {jobType == "New Jobs" && (
                <View style={styles.btnView}>
                  <SubmitButtonContainer
                    onPress={() => {
                      dispatch(setAppLoading(true));
                      acceptJobInvite(data._id, true)
                        .then((res) => {
                          dispatch(setAppLoading(false));
                          navigation.pop(2);
                        })
                        .catch((err) => {
                          dispatch(setAppLoading(false));
                        });
                    }}
                    containerStyle={styles.btnBG}
                    contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
                    gradientColors={[
                      R.colors.PrimaryColorDark,
                      R.colors.PrimaryColorDark,
                    ]}
                    titleTextStyle={{
                      fontSize: screenHeightInPercent(1.6),
                      color: R.colors.White,
                      fontFamily: R.fonts.Maven_semiBold,
                    }}
                    title={"ACCEPT"}
                  />
                  <View style={{ width: "5%" }} />
                  <SubmitButtonContainer
                    onPress={() => {
                      dispatch(setAppLoading(true));
                      acceptJobInvite(data._id, false)
                        .then((res) => {
                          dispatch(setAppLoading(false));
                          navigation.pop(2);
                        })
                        .catch((err) => {
                          dispatch(setAppLoading(false));
                        });
                    }}
                    containerStyle={[{ padding: 2 }, styles.btnBG]}
                    contentContainerStyle={[
                      R.appStyles.rowCenter,
                      {
                        flex: 1,
                        backgroundColor: R.colors.BackgroundLightGrey,
                        borderRadius: 8,
                      },
                    ]}
                    activeOpacity={1}
                    titleTextStyle={{
                      fontSize: screenHeightInPercent(1.6),
                      color: R.colors.PrimaryColorDark,
                      fontFamily: R.fonts.Maven_semiBold,
                    }}
                    title={"DECLINE"}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </MainBackground>
  );
};

export default JobDetail;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 15 : 20),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.4),
  },
  whiteView: {
    backgroundColor: R.colors.White,
    flex: 1,
    marginTop: screenHeightInPercent(4),
    marginHorizontal: screenWidthInPercent(3.4),
    borderTopRightRadius: screenHeightInPercent(3),
    borderTopLeftRadius: screenHeightInPercent(3),
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginTop: screenHeightInPercent(2.2),
    marginHorizontal: screenHeightInPercent(2),
  },

  imgView: {
    width: screenHeightInPercent(10),
    height: screenHeightInPercent(10),
    borderRadius: screenHeightInPercent(2),
    backgroundColor: R.colors.ExtraLightGrey2,

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
    borderRadius: screenHeightInPercent(2),
  },
  headerContent: {
    // justifyContent: "center",
    alignItems: "center",
    marginLeft: screenWidthInPercent(2),
    marginRight: screenWidthInPercent(6),
    marginTop: screenWidthInPercent(2),
    flex: 1,
  },
  headerHeadTxt: {
    fontSize: screenHeightInPercent(2.1),
    color: R.colors.Black,
    fontFamily: R.fonts.Maven_regular,
    textDecorationLine: "underline",
  },
  headerDateTxt: {
    marginTop: 5,
    fontSize: screenHeightInPercent(1.3),
    color: R.colors.Red,
    fontFamily: R.fonts.Maven_semiBold,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: screenWidthInPercent(3),
    alignItems: "center",
  },
  cardTxt: {
    fontSize: screenHeightInPercent(1.4),
    color: R.colors.DarkGrey,
    marginLeft: screenWidthInPercent(2),
  },
  progressView: {
    marginHorizontal: screenWidthInPercent(3),
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressUnit: {
    width: screenWidthInPercent(13.5),
    height: 3,
  },

  statusView: {
    marginVertical: screenHeightInPercent(0.8),
    marginHorizontal: screenWidthInPercent(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  progressTxt: {
    fontFamily: R.fonts.BalooBhai_semiBold,
    fontSize: screenHeightInPercent(1.4),
    color: R.colors.Red,
    paddingTop: screenHeightInPercent(0.6),
  },

  contentView: {
    flex: 1,
    backgroundColor: R.colors.ExtraLightGrey2,
    marginTop: screenHeightInPercent(1.2),
    borderTopRightRadius: screenHeightInPercent(18),
    paddingHorizontal: screenWidthInPercent(2),
  },
  contentHead: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: screenHeightInPercent(1),
  },
  contentHeadTxt: {
    fontSize: screenHeightInPercent(2.2),
    color: R.colors.Black,
    fontFamily: R.fonts.BalooBhai_bold,
    marginLeft: screenWidthInPercent(2),
  },
  txtRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: screenHeightInPercent(1.5),
  },
  contentTxt: {
    fontSize: screenHeightInPercent(1.7),
    fontFamily: R.fonts.BalooBhai_medium,
    color: R.colors.Black,
  },
  btnBG: {
    width: "33%",
    height: screenHeightInPercent(5),
    borderRadius: 10,
    // alignSelf: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
});
