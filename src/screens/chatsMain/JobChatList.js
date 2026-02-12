import React, { useCallback, useMemo, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import MainBackground from "../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import { getImageByName } from "../../utils/data";
import { userDataSelector } from "../../redux/auth/selectors";
import { useFocusEffect } from "@react-navigation/native";

import {
  getChatRooms,
  getActiveChats,
  getDiscussionChats,
  getSupportChats,
} from "../../redux/chat/actions";

const JobChatList = ({ navigation, route, user, getChatRooms,
  getSupportChats,
  getActiveChats,
  getDiscussionChats, }) => {

  useFocusEffect(
    useCallback(() => {
      getChatRooms();
      getSupportChats();
      getActiveChats({roomType: user.userType == "client" ? "client" : "freelancer" });
      getDiscussionChats();
    }, [])
  );


  const { chatListType } = route.params || {};
  const { supportChats, discussionChats, activeChats } = useSelector((state) => state.chat);
  const [searchTxt, setSearchTxt] = useState("");

  const listData = useMemo(() => {
    switch (chatListType) {
      case "support":
        return supportChats;
      case "discussion jobs":
        return discussionChats;
      default:
        return activeChats;
    }
  }, [chatListType, supportChats, discussionChats, activeChats]);

  const formatMessageSendTime = (sendTime) => {
    const today = moment().startOf("day");
    const sendMoment = moment(sendTime);
    return sendMoment.isSame(today, "day")
      ? sendMoment.format("h:mm A")
      : sendMoment.format("MMM D, YY");
  };

  return (
    <MainBackground BGcolor={R.colors.White} showButler onButlerPress={() => navigation.goBack()}>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>
          {chatListType == "support" ? "Support" : "Jobs"}
        </Text>

        {/* <Image
          style={{
            width: screenWidthInPercent(100),
            resizeMode: "contain",
            height: screenHeightInPercent(10),
            backgroundColor: R.colors.White,
            position: "absolute",
            bottom: screenHeightInPercent(2.6),
          }}
          source={R.images.birds}
        /> */}

        <View style={styles.contentView}>
          {
            <FlatList
              data={listData}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{flexGrow: 1, width: screenWidthInPercent(100)}}
              ListEmptyComponent={() =>
               (
                  <Text
                    style={{
                      fontFamily: R.fonts.Maven_medium,
                      fontSize: 18,
                      color: R.colors.Black,
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    No Chat Found
                  </Text>
                )
              }
              renderItem={({ item, index }) => {
                console.log("item ===>", item)
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigation.navigate("ChatSingle", {
                        chatRoomID: item._id,
                        endChat:
                          chatListType == "support"
                            ? true
                            : chatListType == "discussion jobs"
                            ? true
                            : chatListType == "active jobs" &&
                              (item?.job?.status?.toLowerCase() == "done" ||
                                item?.job?.status?.toLowerCase() ==
                                  "completed") &&
                              user?.userType == "freelancer"
                            ? true
                            : false,
                      })
                    }
                    style={styles.card}
                  >
                    <Image
                      source={
                        chatListType == "support"
                          ? R.images.questionMark
                          : getImageByName(item?.title)
                      }
                      resizeMode="contain"
                      style={styles.cardImg}
                    />

                    <View
                      style={{
                        marginLeft: screenWidthInPercent(5),
                        paddingVertical: screenHeightInPercent(2.8),
                        flex: 1,
                      }}
                    >
                      <Text style={styles.chatTitle}>
                        {item.title
                          ? item.title
                          : item?.admins[0]?.participant?.fullName}
                      </Text>
                      <Text style={styles.chatTxt}>
                        {item?.lastMessage?.body}
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.chatTxt}>
                        {item?.lastMessage &&
                          formatMessageSendTime(item?.lastMessage?.sentAt)}
                      </Text>
                      <View style={{ height: screenHeightInPercent(2.4) }} />
                      {/* <View style={styles.chatCountBG}>
												<Text style={styles.countTxt}>1</Text>
											</View> */}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          }       

          <View style={styles.createBtnBG}>
            {chatListType == "support" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("SupportChatList")}
                style={styles.smallBtn}
              >
                <Text style={styles.btnTxt}>CREATE A TICKET</Text>
              </TouchableOpacity>
             ) : <View />} 

            {/* <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelTxt}>{chatListType == "support" ? "CANCEL" : "BACK"}</Text>
            </TouchableOpacity> */}

          </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(JobChatList);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 20 : 25),
  },

  createBtnBG: {
    flexDirection: 'row',
    alignSelf: "center",
    paddingVertical: screenHeightInPercent(2.6),
    backgroundColor: 'transparent'
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(4.2),
  },
  inputView: {
    borderRadius: screenHeightInPercent(1.3),
    flexDirection: "row",
    height: screenHeightInPercent(7),
    backgroundColor: R.colors.LightGreyShade,
    marginHorizontal: screenWidthInPercent(5),
    alignItems: "center",
    paddingHorizontal: screenWidthInPercent(4),
    // paddingVertical: screenHeightInPercent(0.8),
    marginBottom: screenHeightInPercent(2),
  },
  input: {
    flex: 1,
    fontFamily: R.fonts.BalooBhai_bold,
    fontSize: screenHeightInPercent(1.8),
    color: R.colors.Black,
  },
  contentView: {
    flex: 1,
    marginTop: screenHeightInPercent(2),
    marginBottom: screenHeightInPercent(3),
    alignItems: 'center',
  },
  card: {
    marginVertical: screenHeightInPercent(0.8),
    height: screenHeightInPercent(9.5),
    flexDirection: "row",
    backgroundColor: "rgba(129, 201, 166, 0.24)",
    alignItems: "center",
    paddingHorizontal: screenWidthInPercent(4),
    borderRadius: screenHeightInPercent(1.3),
    marginHorizontal: screenWidthInPercent(5),
  },
  cardImg: {
    height: screenHeightInPercent(6),
    width: screenHeightInPercent(6),
    borderRadius: screenHeightInPercent(3),
  },
  chatTitle: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(2.2),
    color: R.colors.Black,
  },
  chatTxt: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.Grey,
  },
  chatCountBG: {
    height: screenHeightInPercent(2.4),
    width: screenHeightInPercent(2.4),
    borderRadius: screenHeightInPercent(1.5),
    backgroundColor: R.colors.Grey,
    justifyContent: "center",
    alignItems: "center",
  },
  countTxt: {
    color: R.colors.White,
    fontFamily: R.fonts.Inter_regular,
    fontSize: screenHeightInPercent(1.5),
  },
  smallBtn: {
    height: screenHeightInPercent(4.5),
    backgroundColor: R.colors.PrimaryColorDark,
    justifyContent: "center",
    paddingHorizontal: 16,
    alignItems: "center",
    borderRadius: 12,
    alignSelf: "center",
  },
  cancelBtn: {
    width: 135,
    height: screenHeightInPercent(4.5),
    borderColor: R.colors.PrimaryColorDark,
    borderWidth: 1,
    justifyContent: "center",
    // width: 135,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 12,
    alignSelf: "center",
    // backgroundColor: R.colors.BackgroundLightGrey,
  },


  
  // cardTxt: {},
  btnTxt: {    
    fontSize: screenHeightInPercent(1.4),
    fontFamily: R.fonts.Maven_medium,
    color: R.colors.White,
  },

  cancelTxt: {
    fontSize: screenHeightInPercent(1.4),
    fontFamily: R.fonts.Maven_medium,
    color: R.colors.PrimaryColorDark,
  },

  btnBG: {
    width: "33%",
    height: screenHeightInPercent(5),
    borderRadius: 10,
    // alignSelf: "center",
  },
});
