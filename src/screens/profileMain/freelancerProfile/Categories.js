import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import R from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import Icons from "../../../containers/common/Icons";
import { useDispatch, useSelector } from "react-redux";
import RoundedBG from "../../../containers/common/RoundedBG";
import MainBackground from "../../../containers/common/MainBackground";
import { inputContainers } from "../../../containers/input";
import { updateCategorySkills, updateProfile } from "../../../network/userApi";
import { setAppLoading } from "../../../redux/app/actions";
// import { showMessage } from "react-native-flash-message";
import RoundedBG2 from "../../../containers/common/RoundedBG2";

const Categories = ({ navigation, route }) => {
  let SubmitButtonContainer = inputContainers["submitButton"];
  const { categories } = route.params;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searched, setSearched] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [addedSkills, setAddedSkills] = useState([]);
  const [removedSkills, setRemovedSkills] = useState([]);

  const skillPress = (val, ind) => {
    if (val?.isActiveSkill) {
      // remove skill
      if (removedSkills.includes(val?._id)) {
        const newArray = removedSkills.filter((item) => item !== val?._id);
        setRemovedSkills(newArray);
      } else {
        let arr = [...removedSkills];
        arr.push(val?._id);
        setRemovedSkills(arr);
      }
    } else {
      // add skill
      if (addedSkills.includes(val?._id)) {
        const newArray = addedSkills.filter((item) => item !== val?._id);
        setAddedSkills(newArray);
      } else {
        let arr = [...addedSkills];
        arr.push(val?._id);
        setAddedSkills(arr);
      }
    }
  };

  const searchHandle = (txt) => {
    setSearchTxt(txt.text);
    if (txt.text !== "") {
      const searchedSkills = categories.filter((d) => {
        return d.name.toLowerCase().search(txt.text.toLowerCase()) !== -1;
      });
      setSearched(searchedSkills);
    }
  };

  return (
    <MainBackground showButler={true}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: R.fonts.Maven_semiBold,
          fontSize: screenHeightInPercent(4.2),
          color: R.colors.Grey,
          marginTop:
            Platform.OS == "ios"
              ? screenHeightInPercent(15)
              : screenHeightInPercent(20),
        }}
      >
        Skills
      </Text>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {categories
          ?.sort((a, b) => {
            if (a._id === ",Animators,") {
              return -1; // "Animators" comes first
            } else if (b._id === ",Animators,") {
              return 1; // "Designers" comes first
            } else {
              return 0; // no change in order
            }
          })
          ?.map((val, key) => {
            return (
              <RoundedBG2
                key={key}
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
                  {val?._id?.replace(/,/g, "")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingBottom: 25,
                    justifyContent: "center",
                  }}
                >
                  {val?.skills.map((val, ind) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          skillPress(val, ind);
                        }}
                        style={[
                          styles.skillBox,
                          {
                            marginRight:
                              ind % 2 == 0 ? screenWidthInPercent(2.5) : 0,
                            marginLeft:
                              ind % 2 == 0 ? 0 : screenWidthInPercent(2.5),
                          },
                        ]}
                        key={ind}
                      >
                        {((val.isActiveSkill &&
                          !removedSkills.find((v) => v == val._id)) ||
                          addedSkills.find((v) => v == val._id)) && (
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
            );
          })}
        <View style={{ flex: 1 }} />
      </KeyboardAwareScrollView>
      <View style={styles.btnView}>
        <SubmitButtonContainer
          containerStyle={styles.btnBG}
          contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
          gradientColors={[
            R.colors.PrimaryColorDark,
            R.colors.PrimaryColorDark,
          ]}
          titleTextStyle={{
            fontSize: screenHeightInPercent(1.6),
            color: R.colors.White,
            fontFamily: R.fonts.Maven_semiBold,
          }}
          onPress={() => {
            dispatch(setAppLoading(true));
            let postData = {
              userId: user?._id,
              addedSkills: addedSkills,
              removedSkills: removedSkills,
            };
            updateCategorySkills(postData)
              .then((res) => {
                dispatch(setAppLoading(false));
                navigation.navigate("FinalMessage");
                console.log("update", res);
              })
              .catch((err) => {
                dispatch(setAppLoading(false));
                console.log("error", err);
              });
          }}
          title={"UPDATE"}
        />
        <View style={{ width: "5%" }} />

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
          onPress={() => navigation.goBack()}
          activeOpacity={1}
          titleTextStyle={{
            fontSize: screenHeightInPercent(1.6),
            color: R.colors.PrimaryColorDark,
            fontFamily: R.fonts.Maven_semiBold,
          }}
          title={"CANCEL"}
        />
      </View>
    </MainBackground>
  );
};

export default Categories;

const styles = StyleSheet.create({
  headTxt: {
    fontSize: screenHeightInPercent(1.8),
    fontFamily: R.fonts.Inter_semibold,
    color: R.colors.Black,
  },
  btnBG: {
    width: "33%",
    height: screenHeightInPercent(5),
    borderRadius: 10,
    // alignSelf: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  skillBox: {
    paddingVertical: 6,
    borderColor: R.colors.GreenOutlineColor,
    borderWidth: 1,
    borderRadius: 8,
    // paddingHorizontal: 11,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 10,
    width: screenWidthInPercent(37),
    marginTop: 10,
  },
  skillTxt: {
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(1.3),
    color: R.colors.Black,
    marginLeft: 5,
    lineHeight: 20,
  },
});
