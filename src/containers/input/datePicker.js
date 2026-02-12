import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../assets";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../assets/colors";

export const DatePicker = (props) => {
  const { value, onChangeDate, placeHolder, containerStyle, maxDate } = props;
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState(value || new Date());

  const handleConfirm = () => {
    setOpen(false);
    onChangeDate(tempDate);
  };

  const handleCancel = () => {
    setOpen(false);
    setTempDate(value || new Date());
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          height: 50,
          color: "rgba(255, 255, 255, 1)",
          justifyContent: "center",
          borderColor: R.colors.GreenOutlineColor,
          borderWidth: 1,
          color: "#353635",
          borderRadius: 12,
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            color: !value ? R.colors.Grey : R.colors.DefaultTextColor,
            fontSize: hp("1.8%"),
            fontFamily: value ? R.fonts.defaultMedium : R.fonts.defaultRegular,
          }}
        >
          {value ? moment(value).format("MMMM DD, YYYY") : placeHolder}
        </Text>
      </TouchableOpacity>
      {open && (
        <>
          <DateTimePicker
            // testID="dateTimePicker"
            value={tempDate}
            is24Hour={true}
            maximumDate={maxDate}
            accentColor={colors.PrimaryColorDark}
            mode="date"
            themeVariant="light"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              if (Platform.OS === 'android') {
                if (event.type === 'dismissed') {
                  setOpen(false);
                } else if (event.type === 'set' && selectedDate) {
                  setTempDate(selectedDate);
                  setOpen(false);
                  onChangeDate(tempDate);
                }
              } else if (selectedDate) {
                setTempDate(selectedDate);
              }
            }}
          />

          {Platform.OS === 'ios' && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={{
                  color: colors.PrimaryColorDark, padding: 10, fontSize: hp("1.8%"),
                  fontFamily: R.fonts.defaultMedium
                }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
                <Text style={{
                  color: colors.PrimaryColorDark, padding: 10, fontSize: hp("1.8%"),
                  fontFamily: R.fonts.defaultMedium
                }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

        </>
      )}
      {/* <DatePickerRN
        modal
        maximumDate={maxDate}
        mode="date"
        open={open}
        date={value ? value : new Date()}
        onConfirm={(date) => {
          setOpen(false);
          onChangeDate(date);
        }}
        onCancel={() => {  
          setOpen(false);
        }}
      /> */}
    </View>
  );
};
