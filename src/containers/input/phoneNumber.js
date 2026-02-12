import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../assets";
import PhoneInput from "react-native-phone-number-input";
import CheckedIcon from "../preview/checkedIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const PhoneNumber = (props) => {
  const {
    value,
    onChangeNumber,
    onChangeFormattedNumber,
    placeHolder,
    containerStyle,
    contentContainerStyle,
    maxDate,
    title,
    titleTextStyle,
    defaultCode = "EG",
    disabled,
    showFlag = false
  } = props;
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);

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
            color: "rgba(255, 255, 255, 1)",
            justifyContent: "space-between",
            borderColor: R.colors.GreenOutlineColor,
            borderWidth: 1,
            color: "#353635",
            borderRadius: 12,
            paddingRight: 10,
            alignItems: "center",
            flexDirection: "row",
          },
          contentContainerStyle
        ]}
      >
        <PhoneInput
          // countryPickerProps={{
          //   countryCodes: ["EG"],
          // }}
          containerStyle={[
            {
              alignItems: "center",
              color: "rgba(255, 255, 255, 1)",
              color: "#353635",
              borderRadius: 12,
              paddingHorizontal: 15,
            },
            contentContainerStyle,
          ]}
          textContainerStyle={{
            backgroundColor: "transparent",
          }}
          codeTextStyle={{
            color: R.colors.DefaultTextColor,
            fontFamily: R.fonts.ArialRegular,
            fontSize: hp("1.8%"),
          }}
          textInputStyle={{
            fontFamily: R.fonts.ArialRegular,
            fontSize: hp("1.8%"),
            color: R.colors.DefaultTextColor,
          }}
          placeholder={"123456..."}
          ref={phoneInput}
          defaultValue={value}
          defaultCode={defaultCode}
          layout={showFlag? "first":"second"}
          disabled={disabled}
          onChangeText={(text) => {
            onChangeNumber(text);
          }}
          onChangeFormattedText={(text) => {
            const checkValid = phoneInput.current?.isValidNumber(text);
            setValid(checkValid ? checkValid : false);
            onChangeFormattedNumber(text);
          }}
        />
        {valid && (
          <CheckedIcon>
            <Icon name="check-circle" size={hp("2.6%")} style={{marginRight: 16}} />
          </CheckedIcon>
        )}
      </View>

      <View style={{ height: hp("2%"), marginTop: 5 }}></View>
    </View>
  );
};
