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
import { inputContainers } from "../../../containers/input";
// import { showMessage } from "react-native-flash-message";
import R from "../../../assets";
import {
  signUpProcessNavigate,
  updateUser,
} from "../../../redux/auth/actions";
import Lock from "../../../assets/images/lock.svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GradientContainer from "../../../containers/preview/gradientContainer";
import { PhoneNumber } from "../../../containers/input/phoneNumber";
import { userDataSelector } from "../../../redux/auth/selectors";
import { updateUserProfile } from "../../../network/userApi";
import {
  ImageSelectFromCamera,
  ImageSelectFromGallery,
} from "../../../utils/imageSelection";
import ImagePicker from "react-native-image-crop-picker";
import Icons from "../../../containers/common/Icons";
import is from "is2";
import ModalScreen from "../../../containers/common/Modal";
import { PhoneVerification } from "../../../containers/input/phoneVerification";
import { changePhoneNumber } from "../../../network/phoneVerificationApi";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const { userData } = props;
  const [firstName, setFirstName] = useState({
    text: userData?.firstName,
    error: false,
  });
  const [lastName, setLastName] = useState({
    text: userData?.lastName,
    error: false,
  });
  const [email, setEmail] = useState({ text: userData?.email, error: false });
  const [phoneNumber, setPhoneNumber] = useState({
    text: userData?.phone,
    error: false,
  });
  const [otp, setOtp] = useState();
  // const [phoneNumber, setPhoneNumber] = useState(userData?.phone);
  const [image, setImage] = useState(null);
  const modal = useRef(null);

  console.log("num==", userData.phone);

  const [disabled, setDisabled] = useState(false);
  let InputContainer = inputContainers["input"];
  let SubmitButtonContainer = inputContainers["submitButton"];

  const imageSelector = () => {
    Alert.alert("Select Image", "Select your profile image", [
      {
        text: "Cencel",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Select",
        onPress: () => {
          ImageSelectFromGallery().then((image) => {
            setImage({
              name: image.path.substring(image.path.lastIndexOf("/") + 1),
              type: image.mime,
              uri: image.path,
            });
          });
        },
      },
    ]);
  };

  const submit = async () => {
    console.log("dd", phoneNumber.text.length);
    if (firstName.text.trim() == "" || firstName.error) {
      // showMessage({ type: "danger", message: `First Name can't be empty` });
    } else if (lastName.text.trim() == "" || lastName.error) {
      // showMessage({ type: "danger", message: `Last Name can't be empty` });
    } else if (email.text.trim() == "" || email.error) {
      // showMessage({ type: "danger", message: `Invalid email input` });
    } else if (
      phoneNumber.text.trim() == "" ||
      phoneNumber.error ||
      phoneNumber.text.length < 9
    ) {
      // showMessage({ type: "danger", message: `Invalid phone number` });
    } else if (
      firstName?.text != userData?.firstName ||
      lastName?.text != userData?.lastName ||
      email?.text != userData?.email ||
      image?.uri ||
      phoneNumber.text != userData.phone
    ) {
      if (phoneNumber.text != userData.phone) {
        changePhoneNumber({ phoneNumber: phoneNumber.text, id: userData?._id })
          .then((res) => {
            let r = JSON.parse(res);
            // showMessage({ type: "success", message: r?.message });
            modal.current.openModel();
          })
          .catch((err) => {
            console.log("err", err.message);
          });
        // console.log('dkdkdkd==', userData?._id);
        // modal.current.openModel()
      }
      const userData = {
        firstName: firstName.text,
        lastName: lastName.text,
        email: email.text,
        profileImage: image,
      };
      var formdata = new FormData();
      formdata.append("firstName", firstName.text);

      formdata.append("lastName", lastName.text);
      formdata.append("email", email.text);
      formdata.append("profileImage", image);
      updateUserProfile({ formdata: formdata, type: "formdata" })
        .then((data) => {
          let d = JSON.parse(data);
          if (d?.updatedUser) {
            dispatch(updateUser(d.updatedUser));
            // showMessage({ type: "success", message: "Profile updated" });
            setImage(null);
          }
        })
        .catch((err) => {
          // showMessage({ type: "danger", message: err.message });
        });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: R.colors.BackgroundLightGrey }}
    >
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <ScrollView>
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
            <Text
              style={{
                fontSize: hp("1.8%"),
                fontStyle: "normal",
                color: R.colors.DarkBlack,
                fontFamily: R.fonts.defaultMedium,
              }}
            >
              Upload Profile Picture
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {image ? (
                <Image
                  source={{
                    uri: image?.uri,
                  }}
                  style={{
                    width: hp("10%"),
                    height: hp("10%"),
                    borderRadius: hp("5%"),
                  }}
                  resizeMode={"contain"}
                />
              ) : userData?.profileImage ? (
                <View
                  style={{
                    width: hp("5%"),
                    height: hp("5%"),
                    borderRadius: hp("2.5%"),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "lightgray",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{
                      uri: `${userData.profileImage}`,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode={"contain"}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: hp("10%"),
                    height: hp("10%"),
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "lightgray",
                  }}
                >
                  <Icons
                    family={"FontAwesome"}
                    name="user"
                    size={60}
                    color="black"
                  />
                </View>
              )}
              {/*  */}

              {/* <Icon name={'verified'} color={'rgba(40, 204, 126, 1)'} size={hp('2%')} /> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  style={{
                    width: wp("30%"),
                    borderWidth: 1,
                    borderColor: R.colors.OrangeRed,
                    padding: 10,
                    paddingVertical: 8,
                    alignItems: "center",
                    borderRadius: 8,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 5,
                      textAlign: "center",
                      fontSize: hp("1.8%"),
                      color: R.colors.OrangeRed,
                      fontFamily: R.fonts.defaultSemiBold,
                    }}
                  >
                    REMOVE
                  </Text>
                </TouchableOpacity>
                <GradientContainer
                  direction={"horizontal"}
                  containerStyle={{
                    width: wp("30%"),
                    borderRadius: 8,
                    padding: 1,
                    marginLeft: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={imageSelector}
                    style={{
                      padding: 10,
                      paddingVertical: 8,
                      borderColor: "#fff",
                      alignItems: "center",
                      borderRadius: 7,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                    activeOpacity={0.7}
                  >
                    <Icon
                      name="cloud-upload-outline"
                      color={R.colors.PrimaryColorDark}
                      size={hp("2%")}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        textAlign: "center",
                        fontSize: hp("1.8%"),
                        color: R.colors.PrimaryColorDark,
                        fontFamily: R.fonts.defaultSemiBold,
                      }}
                    >
                      UPLOAD
                    </Text>
                  </TouchableOpacity>
                </GradientContainer>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 20,
              marginTop: hp("2%"),
              paddingTop: 0,
              backgroundColor: "#fff",
              borderTopColor: R.colors.BorderColor,
              borderTopWidth: 1,
              borderBottomColor: R.colors.BorderColor,
              borderBottomWidth: 1,
            }}
          >
            <View style={{ justifyContent: "flex-start", marginTop: hp("2%") }}>
              <Text
                style={{
                  fontSize: hp("1.8%"),
                  fontStyle: "normal",
                  color: R.colors.DarkBlack,
                  fontFamily: R.fonts.defaultMedium,
                }}
              >
                User Detail
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <InputContainer
                  titleTextStyle={{ marginLeft: 5 }}
                  containerStyle={{ width: wp("42%") }}
                  title={"First Name"}
                  showError={true}
                  required={true}
                  value={firstName}
                  placeHolder={"Jane"}
                  onChangeText={(text) => setFirstName(text)}
                />
                <InputContainer
                  titleTextStyle={{ marginLeft: 5 }}
                  containerStyle={{ width: wp("42%") }}
                  title={"Last Name"}
                  showError={false}
                  required={true}
                  value={lastName}
                  placeHolder={"Doe"}
                  onChangeText={(text) => setLastName(text)}
                />
              </View>
              <InputContainer
                titleTextStyle={{ marginLeft: 5 }}
                title={"Email"}
                showError={false}
                required={true}
                value={email}
                emailField={true}
                placeHolder={"Email"}
                onChangeText={(text) => setEmail(text)}
                disabled={false}
              />
              <InputContainer
                titleTextStyle={{ marginLeft: 5 }}
                title={"Phone Number"}
                showError={false}
                required={true}
                value={phoneNumber}
                keyboardType="phone-pad"
                placeHolder={"+20 123456..."}
                onChangeText={(text) => setPhoneNumber(text)}
                disabled={false}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
              alignItems: "flex-end",
              margin: 20,
            }}
          >
            <SubmitButtonContainer
              containerStyle={{
                width: "45%",
                height: hp("7%"),
                borderRadius: 10,
                alignSelf: "flex-end",
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
              containerStyle={{
                width: "45%",
                height: hp("7%"),
                borderRadius: 10,
                alignSelf: "flex-end",
              }}
              contentContainerStyle={[R.appStyles.rowCenter, { flex: 1 }]}
              gradientColors={[
                R.colors.PrimaryColorDark,
                R.colors.PrimaryColorDark,
              ]}
              disabled={disabled}
              titleTextStyle={{
                fontSize: hp("2.4%"),
                color: R.colors.White,
                fontFamily: R.fonts.defaultSemiBold,
              }}
              title={"UPDATE"}
              onPress={() => submit()}
            />
          </View>
          <ModalScreen ref={modal}>
            <PhoneVerification
              phoneNumber={phoneNumber.text}
              onCodeFilled={(e) => setOtp(e)}
              codeContainerStyle={{ width: "80%", alignSelf: "center" }}
            />
          </ModalScreen>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    userData: userDataSelector(state),
  };
}

export default connect(mapStateToProps)(EditProfile);
