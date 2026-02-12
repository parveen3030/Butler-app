import React, { Component, useState, useEffect } from "react";
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
  Dimensions
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inputContainers } from "../../../../containers/input";
import R from "../../../../assets";
import SignupStepsHeader from "./header";
import { Skills } from "../../../../containers/preview/skills";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GradientContainer from "../../../../containers/preview/gradientContainer";
import CheckedIcon from "../../../../containers/preview/checkedIcon";
import {
  signUpProcessNavigate,
  updateUser,
} from "../../../../redux/auth/actions";
import { signUpProcessDataSelector } from "../../../../redux/auth/selectors";
import { updateUserProfile } from "../../../../network/userApi";
import Loading from "../loading";
export const sourcesList = [
  "Facebook",
  "X",
  "News",
  "Instagram",
  "Youtube",
  "Google",
];

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48 - 30) / 3;

const Item = (props) => {
  const { item, index, setSelected, selectedIndex } = props;

  const selected = index == selectedIndex;
  return (
    <View
      key={index}
      style={{
        width: itemWidth,       
        alignItems: "center",
        marginTop: 15,
        marginRight: (index + 1) % 3 === 0 ? 0 : 15,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setSelected(selected ? -1 : index);
        }}
        style={[
          { 
            width: '100%',
            color: "rgba(255, 255, 255, 1)",
            justifyContent: "center",
            alignItems: "center",
            borderColor: selected
              ? R.colors.PrimaryColorDark
              : R.colors.PrimaryColorLight,
            borderWidth: 1,
            color: "#353635",
            flexDirection: "row",
            borderRadius: 8,
            paddingVertical: 15,
          },
        ]}
      >
        <Text
          style={{
            color: R.colors.DarkBlack,
            fontSize: hp("1.8%"),
            fontFamily: R.fonts.defaultMedium,
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>

      {selected && (
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: hp("-1%"),
            right: hp("-1%"),
            zIndex: 100,
          }}
        >
          <CheckedIcon>
            <Icon name="check-circle" size={hp("2.6%")} />
          </CheckedIcon>
        </View>
      )}
    </View>
  );
};

const HearAboutUs = (props) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState("");
  const [selected, setSelected] = useState(-1);
  const [showLoading, setShowLoading] = useState(false);
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  useEffect(() => {
    if (selected != -1) {
      setSource("");
    }
  }, [selected]);
  const submit = async () => {
    let userData = {
      clientProfession: props.signUpProcessData.clientProfession,
      heardFrom: selected != -1 ? sourcesList[selected] : source,
      signUpCompleted: "true",
      resume: props.signUpProcessData.resume,
      portfolio: props.signUpProcessData.portfolio,
    };
    if (props.signUpProcessData.userType === "freelancer") {
      const skills = props.signUpProcessData.skills.map((e) => e);
      userData["skills"] = skills;
    }
    setShowLoading(true);
    updateUserProfile(userData).then((data) => {
      console.log("data updateUserProfile is", data);
      if (data?.updatedUser) {
        dispatch(updateUser(data.updatedUser));
        props.navigation.navigate("Approval");
      }
    });
  };

  const back = async () => {
    dispatch(signUpProcessNavigate({ step: 4 }));
  };

  return showLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <View
          style={{ padding: 20, flex: 1, paddingTop: 0, marginTop: hp("2%") }}
        >
          <Text
            style={{
              fontSize: hp("1.8%"),
              fontStyle: "normal",
              color: R.colors.DarkBlack,
              fontFamily: R.fonts.Maven_semiBold,
              marginBottom: 5,
            }}
          >
            {props?.signUpProcessData?.userType == "freelancer" ? "5/5" : "3/3"}{" "}
            STEPS
          </Text>
          <View
            style={{
              justifyContent: "flex-start",
              marginTop: hp("1%"),
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: hp("2.4%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
              }}
            >
              Tell us about yourself!
            </Text>
            <Text
              style={{
                fontSize: hp("1.6%"),
                fontStyle: "normal",
                marginTop: 5,
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.Maven_regular,
              }}
            >
              Let’s fill this out to complete your account.
            </Text>
            <View style={[{ flexDirection: "row", flexWrap: "wrap" }]}>
              {sourcesList.map((item, index) => (
                <Item
                  key={index}
                  index={index}
                  selectedIndex={selected}
                  item={item}
                  setSelected={setSelected}
                />
              ))}
            </View>
            <Text
              style={{
                marginTop: hp("4%"),
                fontSize: hp("1.7%"),
                fontStyle: "normal",
                color: R.colors.Grey,
                fontFamily: R.fonts.BalooBhai_regular,
              }}
            >
              If not found on top, write down your name.
            </Text>
            <InputContainer
              containerStyle={{ marginTop: 5 }}
              showError={false}
              value={{ text: source }}
              placeHolder={"How did you hear about us?"}
              onChangeText={(text) => {
                setSource(text.text);
                setSelected(-1);
              }}
            />
          </View>
        </View>
        <GradientContainer
          direction={"vertical"}
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          containerStyle={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            padding: 20,
            height: hp("15%"),
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <SubmitButtonContainer
            containerStyle={{
              width: "95%",
              height: hp("7%"),
              borderRadius: hp("2%"),
              alignSelf: "flex-end",
            }}
            contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
            disabled={selected == -1 && source.trim() == ""}
            gradientColors={[
              R.colors.PrimaryColorDark,
              R.colors.PrimaryColorDark,
            ]}
            titleTextStyle={{
              fontSize: hp("2.4%"),
              color: R.colors.White,
              fontFamily: R.fonts.defaultSemiBold,
            }}
            title={"NEXT"}
            onPress={() => submit()}
          />
        </GradientContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    signUpProcessData: signUpProcessDataSelector(state),
  };
}

export default connect(mapStateToProps)(HearAboutUs);
