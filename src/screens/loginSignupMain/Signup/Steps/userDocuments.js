import React, { Component, useState, useEffect, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inputContainers } from "../../../../containers/input";
// import { showMessage } from "react-native-flash-message";
import R from "../../../../assets";
import SignupStepsHeader from "./header";
import { signUpProcessNavigate } from "../../../../redux/auth/actions";
import { updateUserProfile } from "../../../../network/userApi";
import { signUpProcessDataSelector } from "../../../../redux/auth/selectors";

const UserDocuments = (props) => {
  const dispatch = useDispatch();
  let DocumentPicker = inputContainers["documentPicker"];
  let SubmitButtonContainer = inputContainers["submitButton"];
  const [portfolio, setPortfoio] = useState([]);
  const [resume, setResume] = useState([]);
  const [error, setError] = useState(true);
  const [showError, setShowError] = useState(false);

  const submit = async () => {
    if (!error) {
      let signUpProcessDataUpdated = {
        ...props.signUpProcessData,
        resume: resume,
        portfolio: portfolio,
        userSignupStepConfigured: 4,
      };
      dispatch(signUpProcessNavigate({ step: 4 }, signUpProcessDataUpdated));
    } else {
      setShowError(true);
    }
  };

  const back = async () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    if (portfolio?.length !== 0 && resume?.length !== 0) {
      setError(false);
    } else {
      setError(true);
    }
  }, [portfolio, resume]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <View
          style={{ padding: 20, flex: 1, paddingTop: 0, marginTop: hp("2%") }}
        >
          {/* <SignupStepsHeader /> */}
          <Text
            style={{
              fontSize: hp("1.8%"),
              fontStyle: "normal",
              color: R.colors.DarkBlack,
              fontFamily: R.fonts.Maven_semiBold,
              marginBottom: 5,
            }}
          >
            3/5 STEPS
          </Text>
          <View
            style={{
              justifyContent: "flex-start",
              marginTop: hp("5%"),
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: hp("2.4%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
                marginBottom: 10,
              }}
            >
              Please upload your CV.
            </Text>

            <DocumentPicker
              containerStyle={{ marginTop: -20 }}
              allowMultiple={false}
              onChangeDocuments={setResume}
            />
            {error && showError && resume?.length == 0 && (
              <Text
                style={{
                  fontFamily: R.fonts.Inter_regular,
                  fontSize: 16,
                  color: R.colors.Red,
                }}
              >
                Please upload your CV
              </Text>
            )}
            <Text
              style={{
                fontSize: hp("2.4%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
                marginTop: 40,
              }}
            >
              Please upload your Portfolio.
            </Text>
            <Text
              style={{
                marginTop: 5,
                fontSize: hp("1.8%"),
                fontStyle: "normal",
                color: R.colors.Grey,
                fontFamily: R.fonts.BalooBhai_regular,
              }}
            >
              Only png/txt etc format allowed*
            </Text>
            <DocumentPicker
              allowMultiple={true}
              containerStyle={{ maxHeight: hp("35%"), marginTop: -10 }}
              onChangeDocuments={setPortfoio}
            />
            {error && showError && portfolio?.length == 0 && (
              <Text
                style={{
                  fontFamily: R.fonts.Inter_regular,
                  fontSize: 16,
                  color: R.colors.Red,
                }}
              >
                Please upload your portfolio
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <SubmitButtonContainer
              containerStyle={{
                width: "95%",
                height: hp("7%"),
                borderRadius: hp("2%"),
                alignSelf: "center",
              }}
              contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
              gradientColors={[
                R.colors.PrimaryColorDark,
                R.colors.PrimaryColorDark,
              ]}
              titleTextStyle={{
                fontSize: hp("2.4%"),
                color: R.colors.White,
                fontFamily: R.fonts.BalooBhai_bold,
              }}
              title={"NEXT"}
              onPress={() => submit()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    signUpProcessData: signUpProcessDataSelector(state),
  };
}

export default connect(mapStateToProps)(UserDocuments);
