import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import MainBackground from "../../containers/common/MainBackground";

const JobChatHome = ({ navigation }) => {
  return (
    <MainBackground showButler onButlerPress={() => navigation.goBack()}>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>Jobs</Text>
        <Image
          style={{
            width: screenWidthInPercent(100),
            resizeMode: "contain",
            height: screenHeightInPercent(12),
              // backgroundColor: R.colors.PrimaryColorDark,
            position: "absolute",
            bottom: 0,
          }}
          source={R.images.birds}
        />

        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobChatList", {
                chatListType: "discussion jobs",
              })
            }
            style={[
              styles.card,
              { backgroundColor: R.colors.PrimaryColorDarkExtra,
                marginBottom: screenHeightInPercent(5)
               },
            ]}
          >
            <Text style={styles.cardTxt}>Discussion</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobChatList", {
                chatListType: "active jobs",
              })
            }
            style={[styles.card, { backgroundColor: R.colors.PrimaryLight2 }]}
          >
            <Text style={styles.cardTxt}>Active Jobs</Text>
          </TouchableOpacity>
        </View>


      </View>
    </MainBackground>
  );
};

export default JobChatHome;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 20 : 25),    
  },
  contentView: {
    flex: 1,
    paddingTop: screenHeightInPercent(5),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(4.2),
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
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.8),
    color: R.colors.White,
  },

  createBtnBG: {
    flexDirection: 'row',
    alignSelf: "center",
    paddingVertical: screenHeightInPercent(2.6),
    backgroundColor: 'transparent'
  },

  cancelBtn: {
    width: 135,
    height: screenHeightInPercent(4.5),
    borderColor: R.colors.PrimaryColorDark,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 12,
    alignSelf: "center",
    backgroundColor: R.colors.BackgroundLightGrey,
  },
});
