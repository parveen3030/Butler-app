import React, { useState, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import IconF from "react-native-vector-icons/FontAwesome5";
import R from "../../assets";
import { isValidEmail } from "../../utils/validator";
import creditcardutils from "creditcardutils";
import moment from "moment";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import { isValidNumber } from "react-native-phone-number-input";

export const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [ShowPicker, setShowPicker] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());

  const {
    passwordField,
    keyboardType,
    showFlag,
    value,
    disabled,
    onChangeText,
    placeHolder,
    emailField,
    phoneField,
    leftIcon,
    required,
    containerStyle,
    contentContainerStyle,
    showError,
    rightIcon,
    title,
    titleTextStyle,
    fontSize,
    type,
    defultText,
  } = props;

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      setShowPicker(false);
      const val = moment(selectedDate).format("MM/YYYY");
      onChangeText(val);
      setDate(selectedDate);
    },
    [date, setShowPicker]
  );

  return (
    <View style={containerStyle}>
      {title && (
        <Text
          numberOfLines={1}
          style={[
            {
              marginBottom: 5,
              marginTop: 5,
              fontSize: hp("1.4%"),
              color: R.colors.Grey,
              fontFamily: R.fonts.defaultSemiBold,
            },
            titleTextStyle,
          ]}
        >
          {title}
        </Text>
      )}
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            color: "rgba(255, 255, 255, 1)",
            borderColor: R.colors.GreenOutlineColor,
            borderWidth: 1,
            color: "#353635",
            borderRadius: 12,
            paddingHorizontal: 15,
          },
          contentContainerStyle,
        ]}
      >
        {showFlag && <Text>🇪🇬</Text>}
        {leftIcon}
        {/* {type == "monthYearPicker" ? (
          <>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={{
                flex: 1,
                // justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: value ? R.colors.DefaultTextColor : R.colors.LightGrey,
                  height: 50,
                  marginLeft: leftIcon ? 10 : 0,

                  fontSize: hp("1.8%"),
                  backgroundColor: "transparent",
                  fontFamily: R.fonts.ArialRegular,
                  textAlignVertical: "center",
                  paddingTop:
                    Platform.OS == "ios" ? screenHeightInPercent(1.7) : 0,
                }}
              >
                {value ? value : "11/2028"}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={ShowPicker}
              onRequestClose={() => {
                setShowPicker(!ShowPicker);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#464646a6",
                }}
              >
                <MonthPicker
                  onChange={onValueChange}
                  value={date}
                  minimumDate={new Date()}
                  // maximumDate={new Date(2025, 5)}
                  mode="number"
                />
              </View>
            </Modal>
          </>
        ) : ( */}
        {defultText && (
          <Text
            style={{
              color: R.colors.DefaultTextColor,
              fontSize: fontSize ? fontSize : hp("1.8%"),
              fontFamily: R.fonts.ArialRegular,
              height: Platform.OS == "android" ? 50 : undefined,
              textAlignVertical: "center",
              paddingVertical: 0,
              marginVertical: 0,
              alignSelf: "center",
              marginHorizontal: 5,
            }}
          >
            {defultText}
          </Text>
        )}
        <TextInput
          editable={!disabled}
          placeholder={placeHolder ? placeHolder : ""}
          keyboardType={keyboardType}
          maxLength={type == "cvc" ? 3 : null}
          placeholderTextColor={R.colors.LightGrey}
          style={{
            color: R.colors.DefaultTextColor,
            height: 50,
            marginLeft: leftIcon ? 10 : 0,
            flex: 1,
            fontSize: fontSize
              ? fontSize
              : passwordField && !showPassword && value.text != ""
              ? hp("2.6%")
              : hp("1.8%"),
            backgroundColor: "transparent",
            paddingVertical: 0,
            marginVertical: 0,
            fontFamily: R.fonts.ArialRegular,
          }}
          autoCapitalize={passwordField ? "none" : props.autoCapitalize}
          secureTextEntry={
            passwordField ? (showPassword ? false : true) : false
          }
          onChangeText={(text) => {            
            let errorText = "";
            if (required) {
              if (text.trim().length == 0) {
                errorText = "This field is required";
              }
            } else if (emailField) {
              if (!isValidEmail(text)) {
                errorText = "Enter a valid email address";
              }
            } else if (passwordField) {
              if (text != "" && text.length < 6) {
                errorText = "Password should be atleast 6 characters";
              }
            } else if (phoneField) {
              if (!isValidNumber(text, 'EG')) {                
                errorText = "Enter a valid phone number";
              }
            } else if (
                type == "creditcard" &&
                !creditcardutils.validateCardNumber(
                  creditcardutils.formatCardNumber(text)
                )
            ) {
              errorText = "Invalid card number";
            } else if (
              type == "cvc" &&
              !creditcardutils.validateCardCVC(text)
            ) {
              errorText = "Invalid cvc";
            }            

            onChangeText({
              text:
                type == "creditcard"
                  ? creditcardutils.formatCardNumber(text)
                  : text,
              error: errorText ? true : false,
            });

            if (showError || showError == undefined) {              
              setError(errorText);
            }
          }}
          value={value.text}
        />
        {/* )} */}
        {passwordField && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <IconF
              name={showPassword ? "eye" : "eye-slash"}
              color={R.colors.GreenDarkColor}
              size={18}
            />
          </TouchableOpacity>
        )}
        {rightIcon}
      </View>
      {error != "" ? (
        <Text
          style={{
            marginLeft: 10,
            marginBottom: 10,
            marginTop: 5,
            height: hp("2%"),
            fontSize: hp("1.5%"),
            color: "#C70039",
            fontFamily: R.fonts.montserratRegular,
          }}
        >
          {error}
        </Text>
      ) : (
        <View style={{ height: hp("2%"), marginTop: 5 }}></View>
      )}
    </View>
  );
};
