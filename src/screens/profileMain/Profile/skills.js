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
} from "react-native";
import { connect, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { inputContainers } from "../../../containers/input";
// import { showMessage } from 'react-native-flash-message';
import R from "../../../assets";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Skills } from "../../../containers/preview/skills";

const EditSkills = (props) => {
  const dispatch = useDispatch();
  let SubmitButtonContainer = inputContainers["submitButton"];
  let InputContainer = inputContainers["input"];
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);

  const submit = async () => {
    props.navigation.navigate("SkillsRequest");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: R.colors.BackgroundLightGrey }}
    >
      <View
        style={{
          padding: 15,
          marginTop: hp("2%"),
          backgroundColor: "#fff",
          borderTopColor: R.colors.BorderColor,
          borderTopWidth: 1,
          borderBottomColor: R.colors.BorderColor,
          borderBottomWidth: 1,
        }}
      >
        <View style={{ justifyContent: "flex-start", marginTop: hp("2%") }}>
          <InputContainer
            contentContainerStyle={{ borderColor: R.colors.BorderLightGrey }}
            showError={false}
            rightIcon={
              <Icon
                name={"magnify"}
                size={hp("3%")}
                color={R.colors.LightGrey}
              />
            }
            value={search}
            placeHolder={"Search"}
            onChangeText={(text) => setSearch(text.text)}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: 15,
            marginTop: hp("2%"),
            backgroundColor: "#fff",
            borderTopColor: R.colors.BorderColor,
            borderTopWidth: 1,
            borderBottomColor: R.colors.BorderColor,
            borderBottomWidth: 1,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp("2%") }}
          >
            <Skills
              keyword={search}
              skills={skills}
              onChangeSkills={setSkills}
            />
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: hp("2%"),
        }}
      >
        <SubmitButtonContainer
          containerStyle={{
            width: "45%",
            height: hp("7%"),
            borderRadius: 10,
            padding: 2,
          }}
          contentContainerStyle={[
            R.appStyles.rowCenter,
            { flex: 1, backgroundColor: R.colors.White, borderRadius: 8 },
          ]}
          activeOpacity={1}
          titleTextStyle={{
            fontSize: hp("2.4%"),
            color: R.colors.PrimaryColorDark,
            fontFamily: R.fonts.defaultSemiBold,
          }}
          title={"CANCEL"}
          onPress={() => props.navigation.goBack()}
        />
        <SubmitButtonContainer
          containerStyle={{ width: "45%", height: hp("7%"), borderRadius: 10 }}
          contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
          titleTextStyle={{
            fontSize: hp("2.4%"),
            color: R.colors.White,
            fontFamily: R.fonts.defaultSemiBold,
          }}
          title={"UPDATE"}
          onPress={() => submit()}
        />
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(EditSkills);
