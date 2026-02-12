import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import MainBackground from "../../../containers/common/MainBackground";
import R from "../../../assets";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import Icons from "../../../containers/common/Icons";
// import { showMessage } from "react-native-flash-message";
import {connect, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getHomeData } from "../../../redux/job/actions";
import { userDataSelector } from "../../../redux/auth/selectors";
import { createChatRoom, createSupportChat } from "../../../network/chatApi";
import { setAppLoading } from "../../../redux/app/actions";
import { useNavigation } from "@react-navigation/native";

const HomeFreelancer = ({getHomeData, homeData}) => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getHomeData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      if (homeData){
        setData(homeData)
      }      
    }, [homeData])
  );

  const transfer = () => {
    // navigation.navigate("SupportChatList", {
    //   initialMessage: "Withdrawal"
    // });

    setTimeout(() => {
      dispatch(setAppLoading(true));
      createSupportChat("Withdrawal")
        .then((res) => {
          dispatch(setAppLoading(false));
          if (res?._id) {
            navigation.navigate("ChatSingle", {
              chatRoomID: res?._id,
              endChat: true,
            });
          }
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
          Alert.alert(
            "Error",
            err.message,
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ],
            { cancelable: false }
          );
        });
    }, 380);
  };

  return (
    <MainBackground showButler>
      <View
        style={{
          marginTop: screenHeightInPercent(Platform.OS == "ios" ? 12 : 17),
          paddingHorizontal: screenWidthInPercent(7),
        }}
      >
        <Text style={styles.headTxt}>My Jobs</Text>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardHead}>{data?.activeJobsCount}</Text>
            <Text style={styles.cardTxt}>Current Jobs</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardHead}>{data?.previousJobsCount}</Text>
            <Text style={styles.cardTxt}>Previous Jobs</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardHead}>{data?.totalJobsCount}</Text>
            <Text style={styles.cardTxt}>Total Jobs</Text>
          </View>
        </View>
        <Image style={styles.mainImg} source={R.images.HomeImg} />
        <View style={[styles.cardRow, styles.longBtn]}>
          <Text style={styles.btnTxt}>Balance</Text>
          <Text style={styles.earnTxt}>
            {data?.walletBalance}
            <Text style={{ fontSize: screenHeightInPercent(1.1) }}> EGP</Text>
          </Text>
          <TouchableOpacity style={[R.appStyles.rowCenter]} onPress={transfer}>
            <Text style={[styles.btnTxt, { alignItems: "center" }]}>
              Transfer 
            </Text>
            <Icons
              family={"AntDesign"}
              name="swap"
              size={screenHeightInPercent(2.0)}
              color={R.colors.White}
            />
          </TouchableOpacity>
        </View>
      </View>
    </MainBackground>
  );
};

const mapStateToProps = (state) => ({
  user: userDataSelector(state),
  homeData: state.job.homeData,
});

const mapDispatchToProps = {
  getHomeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFreelancer);

const styles = StyleSheet.create({
  headTxt: {
    fontSize: screenHeightInPercent(4.2),
    color: "#A1A1A1",
    fontFamily: R.fonts.Maven_semiBold,
    textAlign: "center",
  },
  earnTxt: {
    fontSize: screenHeightInPercent(3),
    color: "#344F4A",
    fontFamily: R.fonts.Maven_regular,
    opacity: 1.0,
    textAlign: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: screenHeightInPercent(2),
    paddingHorizontal: screenWidthInPercent(0),
  },
  card: {
    width: screenWidthInPercent(24),
    height: screenWidthInPercent(24),
    borderRadius: screenWidthInPercent(6),
    backgroundColor: R.colors.PrimaryColorDark,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: screenWidthInPercent(13),
    height: screenWidthInPercent(13),
  },
  cardHead: {
    fontFamily: R.fonts.Maven_semiBold,
    color: "#344F4A",
    fontSize: screenHeightInPercent(3.6),
  },
  cardTxt: {
    fontFamily: R.fonts.BalooBhai_regular,
    color: R.colors.White,
    fontSize: screenHeightInPercent(1.6),
    marginTop: screenHeightInPercent(1),
  },
  btnTxt: {
    fontFamily: R.fonts.Maven_regular,
    color: R.colors.Black,
    fontSize: screenHeightInPercent(1.4),
    textAlign: "center",
  },
  mainImg: {
    width: screenHeightInPercent(31),
    height: screenHeightInPercent(31),
    marginTop: screenHeightInPercent(3.5),
    marginBottom: screenHeightInPercent(1),
    resizeMode: "contain",
    alignSelf: "center",
  },
  longBtn: {
    backgroundColor: R.colors.PrimaryColorDark,
    padding: screenHeightInPercent(1.5),
    paddingHorizontal: screenWidthInPercent(4),
    borderRadius: screenHeightInPercent(3),
    marginTop: screenHeightInPercent(4),
  },
  userValueTxt: {
    flex: 2,
    fontSize: screenHeightInPercent(1.6),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Inter_regular,
  },
  userUnderLineTxt: {
    textDecorationColor: R.colors.DarkGrey,
    textDecorationLine: "underline",
    color: R.colors.DarkGrey,
  },
});
