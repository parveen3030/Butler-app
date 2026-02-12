import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import MainBackground from "../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import Icons from "../../containers/common/Icons";

import { connect } from "react-redux";
import {
  getChatRooms,
  getActiveChats,
  getDiscussionChats,
  getSupportChats,
} from "../../redux/chat/actions";
import { userDataSelector } from "../../redux/auth/selectors";
import { useFocusEffect } from "@react-navigation/native";

const ChatHome = ({
  navigation,
  user,
  getChatRooms,
  getSupportChats,
  getActiveChats,
  getDiscussionChats,
}) => {

  useFocusEffect(
    useCallback(() => {
      getChatRooms();
      getSupportChats();
      getActiveChats({roomType: user.userType == "client" ? "client" : "freelancer" });
      getDiscussionChats();
    }, [])
  );

  return (
    <MainBackground showButler>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>My Chats</Text>
        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                user.userType == "freelancer" ? "JobChatList" : "JobChatHome",
                {
                  chatListType: "freelancer jobs",
                }
              )
            }
            style={[
              styles.card,
              { backgroundColor: "rgba(99, 189, 146, 0.61)" },
            ]}
          >
            {/* <View style={styles.notificationView}>
              <Text style={styles.notificationTxt}>2</Text>
            </View> */}
            <Text style={styles.cardTxt}>Jobs</Text>
            <Icons
              family={"FontAwesome5"}
              name="briefcase"
              size={screenHeightInPercent(12)}
              color="#366A52"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: R.colors.ExtraLightGrey }]}
            onPress={() =>
              navigation.navigate("JobChatList", { chatListType: "support" })
            }
          >
            <Text style={styles.cardTxt}>Support</Text>
            <Icons
              family={"FontAwesome"}
              name="question-circle"
              size={screenHeightInPercent(13)}
              color="#736868"
            />
          </TouchableOpacity>
        </View>
      </View>
    </MainBackground>
  );
};

const mapStateToProps = (state) => ({
  user: userDataSelector(state),
});

const mapDispatchToProps = {
  getChatRooms,
  getSupportChats,
  getActiveChats,
  getDiscussionChats,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatHome);


const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 20 : 25),
  },
  contentView: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: screenHeightInPercent(7),
    backgroundColor: R.colors.White,
    borderTopLeftRadius: screenHeightInPercent(5.5),
    borderTopRightRadius: screenHeightInPercent(5.5),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: screenWidthInPercent(4),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(4.2),
  },
  card: {
    flex: 1,
    height: screenHeightInPercent(30),
    marginHorizontal: screenWidthInPercent(1.5),
    borderRadius: screenHeightInPercent(3.5),
    alignItems: "center",
    justifyContent: "center",
  },
  notificationTxt: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: R.fonts.Inter_regular,
    color: R.colors.White,
    fontSize: screenHeightInPercent(2.5),
  },
  notificationView: {
    backgroundColor: R.colors.Red,
    opacity: 1,
    width: screenHeightInPercent(6.5),
    height: screenHeightInPercent(6.5),
    borderRadius: screenHeightInPercent(4),
    justifyContent: "center",
    position: "absolute",
    right: -screenWidthInPercent(1.5),
    top: -screenHeightInPercent(3.2),
  },
  cardTxt: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(2.5),
    color: R.colors.Black,
    marginBottom: screenHeightInPercent(2),
    marginTop: -screenHeightInPercent(3),
  },
});
