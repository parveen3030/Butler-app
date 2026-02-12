import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import MainBackground from "../../containers/common/MainBackground";
import RoundedBG from "../../containers/common/RoundedBG";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { inputContainers } from "../../containers/input";
import { BottomSheet } from "react-native-sheet";
// import { showMessage } from "react-native-flash-message";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
// import { Rating, AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { postRating } from "../../network/ratingApi";
import { setAppLoading } from "../../redux/app/actions";
import { Rating } from "react-native-ratings";
import StarRating from "react-native-star-rating-widget";
import { useKeyboard } from "../../containers/common/KeyboardHeight";

const RatingComponent = ({ navigation }) => {
  let SubmitButtonContainer = inputContainers["submitButton"];
  const sheetRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [about, setAbout] = useState("");
  const [KeyBoardStatus, setKeyBoardStatus] = useState(false);
  const keyboardHeight = useKeyboard();
  // console.log("======>",keyboardHeight);

  const submit = () => {
    if (!rating) {
      //   showMessage({ type: "danger", message: `Please select rating stars` });
    } else if (!comment) {
      //   showMessage({ type: "danger", message: `Please enter your comment` });
    } else {
      console.log("rati", rating, comment);
      dispatch(setAppLoading(true));
      postRating({
        job: "645e247e4b08bab25c48df47",
        commentBy: user._id,
        userId: "645d010d29dea8b5154ee646", // freelancer's id , who done your job
        comment: comment,
        rating: rating,
      })
        .then((res) => {
          // showMessage({ type: "success", message: res?.message });
          dispatch(setAppLoading(false));
          if (res?.message == "review added successfully")
            sheetRef.current.show();
          setTimeout(() => {
            sheetRef.current.hide();
            navigation.goBack();
          }, 3000);
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
          console.log("err", err);
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
    <MainBackground showButler>
      {KeyBoardStatus && (
        <View
          style={[
            styles.keyBtnView,
            { bottom: Platform.OS == "ios" ? keyboardHeight : 0 },
          ]}
        >
          <TouchableOpacity onPress={Keyboard.dismiss} style={styles.keyBtnBG}>
            <Text style={styles.keyBtn}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
      <RoundedBG
        borderRadius={0.00000000001}
        marginTop={screenHeightInPercent(Platform.OS == "ios" ? 16.8 : 22.3)}
        borderTopColor={R.colors.GreenOutlineColor}
        paddingHorizontal={0.0000000001}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingHorizontal: screenWidthInPercent(4.3),
              marginBottom: screenHeightInPercent(2.2),
            }}
          >
            <View style={styles.ratingView}>
              <Text style={styles.headTxt}>How did we do?</Text>
              <StarRating
                starSize={screenHeightInPercent(5.8)}
                rating={rating}
                onChange={setRating}
                enableHalfStar={false}
                emptyColor={"#dddddd"}
                StarIconComponent={({ size, color }) => (
                  <Image
                    style={{
                      backgroundColor: color,
                      height: screenHeightInPercent(6.2),
                      width: screenHeightInPercent(6.2),
                    }}
                    source={R.images.star}
                  />
                )}
                starStyle={{
                  marginHorizontal: 0,
                }}
                animationConfig={{ scale: 1.1 }}
              />
              {/* <Rating
                ratingBackgroundColor={"#dddddd"}
                ratingCount={5}
                type="custom"
                onFinishRating={(r) => setRating(r)}
                ratingImage={R.images.star}
                imageSize={screenHeightInPercent(6.2)}
                startingValue={0}
                style={{ paddingVertical: screenHeightInPercent(0.9) }}
              /> */}
            </View>
            <Text style={styles.headTxt}>Care to share more about it?</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              value={comment}
              placeholder="Write..."
              placeholderTextColor={R.colors.LightGrey}
              onChangeText={setComment}
              // onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.BackgroundLightGrey,
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.btnView}>
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
                  color: R.colors.PrimaryColorDark,
                  fontFamily: R.fonts.BalooBhai_bold,
                }}
                onPress={() => navigation.goBack()}
                title={"CANCEL"}
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
                  color: R.colors.White,
                  fontFamily: R.fonts.BalooBhai_bold,
                }}
                onPress={() => submit()}
                title={"SEND"}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </RoundedBG>
      <BottomSheet
        backdropClosesSheet={false}
        draggable={false}
        onRequestClose={() => navigation.goBack()}
        borderRadius={20}
        height={screenHeightInPercent(60)}
        dragIconStyle={{ width: screenWidthInPercent(35), height: 4 }}
        ref={sheetRef}
        colorScheme="light"
        sheetStyle={{ backgroundColor: R.colors.White }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: screenHeightInPercent(2),
            marginBottom: screenHeightInPercent(4),
          }}
        >
          <Image style={styles.sheetImg} source={R.images.thanks} />
          <View>
            <Text style={styles.sheetHtxt}>Thank you!</Text>
            <Text style={styles.sheetSubtxt}>
              Your feedback has been successfully added
            </Text>
          </View>
        </View>
      </BottomSheet>
    </MainBackground>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({
  headTxt: {
    fontFamily: R.fonts.Inter_medium,
    fontSize: screenHeightInPercent(1.9),
    color: R.colors.Black,
  },
  ratingView: {
    alignItems: "flex-start",
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: screenHeightInPercent(1.7),
    borderColor: R.colors.BorderLightGreen,
  },
  btnBG: {
    width: "45%",
    height: screenHeightInPercent(7),
    borderRadius: 10,
    alignSelf: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 20,
  },
  sheetImg: {
    height: screenHeightInPercent(25),
    width: "100%",
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 10,
  },
  input: {
    borderColor: R.colors.GreenOutlineColor,
    borderWidth: 1,
    borderRadius: 12,
    paddingTop: screenHeightInPercent(1.7),
    padding: screenHeightInPercent(1.7),
    textAlign: "justify",
    textAlignVertical: "top",
    color: R.colors.Black,
    fontSize: screenHeightInPercent(1.8),
    fontFamily: R.fonts.Inter_regular,
    marginTop: 10,
    height: screenHeightInPercent(27),
  },
  sheetHtxt: {
    fontSize: screenHeightInPercent(3.5),
    color: R.colors.Black,
    textAlign: "center",
    fontFamily: R.fonts.Inter_light,
  },
  sheetSubtxt: {
    fontSize: screenHeightInPercent(2),
    color: R.colors.Black,
    textAlign: "center",
    fontFamily: R.fonts.Inter_light,
    paddingHorizontal: screenWidthInPercent(7),
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
});
