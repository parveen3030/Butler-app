import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import MainBackground from "../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import Icons from "../../containers/common/Icons";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createSupportChat, getSupportChat } from "../../network/chatApi";
import { setAppLoading } from "../../redux/app/actions";
import { setSupportChats } from "../../redux/chat/actions";
import { NavigationActions } from "react-navigation";
import { StackActions } from "@react-navigation/native";
// import { showMessage } from "react-native-flash-message";
import { useKeyboard } from "../../containers/common/KeyboardHeight";

const SupportChatList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [value, setValue] = useState(route?.params?.initialMessage || "");
  const [KeyBoardStatus, setKeyBoardStatus] = useState(false);
  const keyboardHeight = useKeyboard();

  const fetchData = async () => {
    dispatch(setAppLoading(true));
    const [supportRes] = await Promise.all([getSupportChat(100, 1)]);
    dispatch(setAppLoading(false));
    if (supportRes[0].data) {
      dispatch(setSupportChats(supportRes[0].data));
    }
    navigation.dispatch(StackActions.pop(1));
  };
  const startChat = () => {
    if (!value) {
      // showMessage({ type: "danger", message: `Enter message` });
    } else {
      dispatch(setAppLoading(true));
      createSupportChat(value)
        .then((res) => {
          console.log("eresss", res);
          dispatch(setAppLoading(false));
          // showMessage({
          //   type: "success",
          //   message: `Support chat is created successfully`,
          // });
          navigation.navigate("ChatSingle", {
            chatRoomID: res?._id,
            endChat: true,
            roomType: 'support'
          });
          // fetchData();
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
          // showMessage({ type: "danger", message: `Something went wrong` });
        });
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyBoardStatus(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyBoardStatus(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <MainBackground BGcolor={R.colors.BackgroundLightGrey} showButler onButlerPress={() => navigation.goBack()}>
      {KeyBoardStatus && (
        <View
          style={[
            styles.keyBtnView,
            { bottom: Platform.OS == "ios" ? keyboardHeight : 0 },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setKeyBoardStatus(false);
              Keyboard.dismiss();
            }}
            style={styles.keyBtnBG}
          >
            <Text style={styles.keyBtn}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.mainView}>
        <Text style={styles.headTxt}>Ticket</Text>
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

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentView}
          scrollEnabled={KeyBoardStatus}
        >
          <View
            style={{
              paddingHorizontal: screenWidthInPercent(5),
              marginTop: screenHeightInPercent(4),
              borderTopLeftRadius: screenHeightInPercent(5),
              borderTopRightRadius: screenHeightInPercent(5),
              backgroundColor: R.colors.White,
            }}
          >
            <Text
              style={[
                styles.mainTxt,
                {
                  marginTop: screenHeightInPercent(5),
                },
              ]}
            >
              How can we help you?
            </Text>
            <TextInput
              multiline={true}
              placeholder="Please explain your issue."
              placeholderTextColor={R.colors.Grey}
              style={styles.input}
              value={value}
              onChangeText={setValue}
            />
          </View>

          <View style={styles.btnView}>
            <TouchableOpacity onPress={startChat} style={styles.btn}>
              <Text style={styles.btnTxt}>START CHAT</Text>
            </TouchableOpacity>
{/* 
            <View style={{ width: "5%" }} />

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnCancel}>
              <Text style={styles.btnCancelTxt}>CANCEL</Text>
            </TouchableOpacity> */}
          </View>
            
        </KeyboardAwareScrollView>
      </View>
    </MainBackground>
  );
};

export default SupportChatList;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 20 : 25),
  },
  headTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(4.3),
  },
  mainTxt: {
    color: R.colors.Grey,
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(1.8),
  },
  contentView: {
    flexGrow: 1,
    // ,
  },
  input: {
    borderWidth: 1,
    borderColor: R.colors.BorderLightGreen,
    borderRadius: screenHeightInPercent(1.3),
    textAlignVertical: "top",
    paddingHorizontal: screenWidthInPercent(4),
    fontSize: screenHeightInPercent(1.8),
    fontFamily: R.fonts.Inter_regular,
    color: R.colors.Black,
    height: screenHeightInPercent(21),
    marginTop: screenHeightInPercent(2),
    marginBottom: screenHeightInPercent(2.8),
    paddingTop: 10,
  },
  btn: {
    width: "33%",
    backgroundColor: R.colors.PrimaryColorDark,
    alignSelf: "center",
    alignItems: 'center',
    borderRadius: screenHeightInPercent(1.3),
    paddingVertical: screenHeightInPercent(1.6),
    marginTop: screenHeightInPercent(5),
  },
  btnTxt: {
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(1.4),
    color: R.colors.White,
  },

  btnCancel: {
    width: "33%",
    alignSelf: "center",
    alignItems: 'center',
    borderColor: R.colors.PrimaryColorDark,
    borderRadius: screenHeightInPercent(1.3),
    borderWidth: 1,
    paddingVertical: screenHeightInPercent(1.6),
    marginTop: screenHeightInPercent(5),
  },

  btnCancelTxt: {
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(1.4),
    color: R.colors.PrimaryColorDark,
  },

  row: {
    flexDirection: "row",
    backgroundColor: R.colors.ExtraLightGrey,
    paddingVertical: screenHeightInPercent(2),
    paddingHorizontal: screenWidthInPercent(3),
    borderRadius: screenHeightInPercent(1),
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowTxt: {
    fontFamily: R.fonts.BalooBhai_extrabold,
    fontSize: screenHeightInPercent(1.8),
    color: R.colors.White,
  },
  keyBtn: {
    color: R.colors.Black,
    fontFamily: R.fonts.Inter_medium,
    fontSize: screenHeightInPercent(1.9),
  },
  keyBtnBG: {
    paddingHorizontal: screenWidthInPercent(4),
    paddingVertical: 8,
    alignSelf: "flex-end",
  },
  keyBtnView: {
    backgroundColor: R.colors.White,
    position: "absolute",
    zIndex: 9999,
    right: 0,
    left: 0,
    borderTopColor: R.colors.LightGreyShade,
    borderTopWidth: 1,
  },

  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
