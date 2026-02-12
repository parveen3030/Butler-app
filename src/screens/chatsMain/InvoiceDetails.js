import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import MainBackground from "../../containers/common/MainBackground";
import RoundedBG from "../../containers/common/RoundedBG";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import Icons from "../../containers/common/Icons";
import { inputContainers } from "../../containers/input";
import moment from "moment";

const InvoiceDetails = ({ navigation, route }) => {
  const { data } = route.params;
  let SubmitButtonContainer = inputContainers["submitButton"];
  const [list] = useState([
    {
      id: 1,
      img: R.images.menue,
      name: "Requirements",
      des: data?.job?.description,
    },
    {
      id: 2,
      img: R.images.image,
      name: "Category",
      des: data?.job?.category?.name,
    },
    {
      id: 3,
      img: R.images.arrowDown,
      name: "Sub-Category",
      des: data?.job?.category?.name,
    },
    {
      id: 4,
      img: R.images.checkList,
      name: "Project",
      des: data?.job?.title,
    },
    {
      id: 5,
      img: R.images.volet,
      name: "Price",
      des: `$${data.job.price} - Fixed budget`,
    },
    {
      id: 6,
      img: R.images.time,
      name: "Duration",
      des:
        moment(data?.invoiceDate).format("MMM DD, YYYY") +
        " to " +
        moment(data?.dueDate).format("MMM DD, YYYY"),
    },
  ]);
  return (
    <MainBackground showButler>
      <Text style={styles.headTxt}>Invoice Details</Text>
      <RoundedBG paddingTop={screenHeightInPercent(6)}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.card,
                  {
                    minHeight: screenHeightInPercent(8),
                    paddingTop: item.name == "Requirements" ? 15 : 0,
                    alignItems:
                      item.name == "Requirements" ? "flex-start" : "center",
                  },
                ]}
              >
                <Image source={item.img} style={styles.img} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTxt}>{item.name}</Text>
                  <Text style={styles.cardDes}>
                    {item.name == "Requirements"
                      ? item?.des?.map((v) => `${v}\n`)
                      : item.des}
                  </Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderColor: R.colors.LightGreyShade,
                    marginBottom: screenHeightInPercent(4),
                  }}
                />
                {/* <View style={styles.btnView}>
                  <SubmitButtonContainer
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
                      fontSize: screenHeightInPercent(
                        Platform.OS == "ios" ? 2.6 : 2.4
                      ),
                      marginTop: screenHeightInPercent(
                        Platform.OS == "ios" ? 0.7 : 0
                      ),
                      color: R.colors.PrimaryColorDark,
                      fontFamily: R.fonts.BalooBhai_bold,
                    }}
                    // onPress={() => navigation.goBack()}
                    title={"DECLINE"}
                  />
                  <SubmitButtonContainer
                    containerStyle={styles.btnBG}
                    contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
                    gradientColors={[
                      R.colors.PrimaryColorDark,
                      R.colors.PrimaryColorDark,
                    ]}
                    titleTextStyle={{
                      fontSize: screenHeightInPercent(
                        Platform.OS == "ios" ? 2.6 : 2.4
                      ),
                      marginTop: screenHeightInPercent(
                        Platform.OS == "ios" ? 0.7 : 0
                      ),
                      color: R.colors.White,
                      fontFamily: R.fonts.BalooBhai_bold,
                    }}
                    title={"PAY!"}
                    // onPress={submit}
                  />
                </View> */}
              </>
            );
          }}
        />
      </RoundedBG>
    </MainBackground>
  );
};

export default InvoiceDetails;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop:
      Platform.OS == "ios"
        ? screenHeightInPercent(13)
        : screenHeightInPercent(17),
  },
  headTxt: {
    color: R.colors.Black,
    textAlign: "center",
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(3.5),
    position: "absolute",
    flex: 1,
    alignSelf: "center",
    marginTop: screenHeightInPercent(17),
  },
  card: {
    flexDirection: "row",

    justifyContent: "flex-start",
    borderTopWidth: 1,
    borderColor: R.colors.LightGreyShade,
  },
  img: {
    width: screenHeightInPercent(4.3),
    height: screenHeightInPercent(4.3),
    resizeMode: "contain",
  },
  cardTxt: {
    fontFamily: R.fonts.Inter_medium,
    fontSize: screenHeightInPercent(1.8),
    color: R.colors.Black,
  },
  cardDes: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(1.8),
    color: R.colors.Grey,
    lineHeight: screenHeightInPercent(2.3),
    marginTop: screenHeightInPercent(0.7),
  },
  cardContent: {
    marginLeft: screenWidthInPercent(3),
  },
  btnBG: {
    width: "48%",
    height: screenHeightInPercent(7),
    borderRadius: 10,
    alignSelf: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 15,
  },
});
