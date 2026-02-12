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
  StyleSheet,
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
import { signUpProcessNavigate } from "../../../../redux/auth/actions";
import { signUpProcessDataSelector } from "../../../../redux/auth/selectors";
import { Profession } from "../../../../containers/preview/profession";
import RoundedBG2 from "../../../../containers/common/RoundedBG2";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../../utils/screenDimensions";
import { setAppLoading } from "../../../../redux/app/actions";
import { getAllCatagory } from "../../../../network/userApi";
import Icons from "../../../../containers/common/Icons";

const UserSkills = (props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [profession, setProfession] = useState("");
  const [AnimatorCategories, setAnimator] = useState([]);
  const [DesignerCategories, setDesigner] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const submit = async () => {
    let signUpProcessDataUpdated = {
      ...props.signUpProcessData,
      skills: selectedSkills,
      clientProfession: profession,
      userSignupStepConfigured: 5,
    };
    dispatch(signUpProcessNavigate({ step: 5 }, signUpProcessDataUpdated));
  };

  const back = async () => {
    props.navigation.goBack();
  };

  console.log("slills", selectedSkills);

  const skillPress = (val, ind) => {
    const found = selectedSkills.findIndex((element) => element == val);
    if (found == -1) {
      setSelectedSkills((oldArray) => [...oldArray, val]);
    } else {
      setSelectedSkills(selectedSkills.filter((item) => item !== val));
    }
  };

  useEffect(() => {
    dispatch(setAppLoading(true));
    getAllCatagory()
      .then((res) => {
        // console.log("rs", res?.categories);
        const designersArray = [];
        const animatorsArray = [];
        res?.categories.forEach((item) => {
          if (item.path) {
            const categories = item.path.split(",");
            if (categories.includes("Animators")) {
              animatorsArray.push(item);
            }
            if (categories.includes("Designers")) {
              designersArray.push(item);
            }
          }
        });
        // console.log("des", designersArray);
        setAnimator(animatorsArray);
        // console.log("ani", animatorsArray);
        setDesigner(designersArray);
        dispatch(setAppLoading(false));
      })
      .catch((err) => {
        dispatch(setAppLoading(false));
        console.log("errr", err);
      });
  }, []);

  return (
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
            4/5 STEPS
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
                fontSize: hp("2%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.BalooBhai_bold,
              }}
            >
              Please select your{" "}
              {props.signUpProcessData?.userType === "freelancer"
                ? "skills"
                : "profession"}
              .
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: hp("15%") }}
            >
              {props.signUpProcessData?.userType === "freelancer" ? (
                <>
                  <RoundedBG2
                    borderRadius={30}
                    backgroundColor={R.colors.LightGreyShade}
                    marginTop={screenHeightInPercent(4)}
                    marginHorizontal={12}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: R.fonts.Maven_semiBold,
                        fontSize: screenHeightInPercent(4.2),
                        color: R.colors.PrimaryColorDark,
                        marginBottom: 10,
                      }}
                    >
                      Animators
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingBottom: 25,
                        justifyContent: "space-between",
                      }}
                    >
                      {AnimatorCategories.map((val, ind) => {
                        return (
                          <TouchableOpacity
                            onPress={() => skillPress(val._id, ind)}
                            style={styles.skillBox}
                            key={ind}
                          >
                            {selectedSkills.find((v) => v == val._id) && (
                              <Icons
                                family={"AntDesign"}
                                name="checkcircle"
                                size={15}
                                color={R.colors.PrimaryColorDark}
                              />
                            )}
                            <Text style={styles.skillTxt}>{val.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </RoundedBG2>
                  {/* <RoundedBG2
                    borderRadius={30}
                    backgroundColor={R.colors.LightGreyShade}
                    marginTop={screenHeightInPercent(4)}
                    marginHorizontal={12}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: R.fonts.Maven_semiBold,
                        fontSize: screenHeightInPercent(4.2),
                        color: R.colors.PrimaryColorDark,
                      }}
                    >
                      Animators
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingBottom: 25,
                      }}
                    >
                      <Skills
                        keyword={search}
                        skills={skills}
                        onChangeSkills={setSkills}
                      />
                    </View>
                  </RoundedBG2> */}
                  <RoundedBG2
                    borderRadius={30}
                    backgroundColor={R.colors.LightGreyShade}
                    marginTop={screenHeightInPercent(4)}
                    marginHorizontal={12}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: R.fonts.Maven_semiBold,
                        fontSize: screenHeightInPercent(4.2),
                        color: R.colors.PrimaryColorDark,
                        marginBottom: 10,
                      }}
                    >
                      Designers
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingBottom: 25,
                        justifyContent: "space-between",
                      }}
                    >
                      {DesignerCategories.map((val, ind) => {
                        return (
                          <TouchableOpacity
                            onPress={() => skillPress(val._id, ind)}
                            style={styles.skillBox}
                            key={ind}
                          >
                            {selectedSkills.find((v) => v == val._id) && (
                              <Icons
                                family={"AntDesign"}
                                name="checkcircle"
                                size={15}
                                color={R.colors.PrimaryColorDark}
                              />
                            )}
                            <Text style={styles.skillTxt}>{val.name}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </RoundedBG2>
                  {/* <RoundedBG2
                    borderRadius={30}
                    backgroundColor={R.colors.LightGreyShade}
                    marginTop={screenHeightInPercent(4)}
                    marginHorizontal={12}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: R.fonts.Maven_semiBold,
                        fontSize: screenHeightInPercent(4.2),
                        color: R.colors.PrimaryColorDark,
                      }}
                    >
                      Designers
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingBottom: 25,
                      }}
                    >
                      <Skills
                        keyword={search}
                        skills={skills}
                        onChangeSkills={setSkills}
                      />
                    </View>
                  </RoundedBG2> */}
                </>
              ) : (
                <Profession
                  keyword={search}
                  onChangeProfession={setProfession}
                />
              )}
            </ScrollView>
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
            height: hp("16%"),
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
            disabled={selectedSkills.length == 0 && !profession}
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

export default connect(mapStateToProps)(UserSkills);
const styles = StyleSheet.create({
  skillBox: {
    paddingVertical: 6,
    borderColor: R.colors.GreenOutlineColor,
    backgroundColor: R.colors.White,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 10,
    width: screenWidthInPercent(32),
  },
  skillTxt: {
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(1.3),
    color: R.colors.Black,
    marginLeft: 5,
    lineHeight: 20,
  },
});
