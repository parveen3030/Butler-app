import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckedIcon from './checkedIcon';

export let professionListMock = [
  'Doctor',
  'Engineer',
  'Business man',
  'Lawyer',
];

const Item = props => {
  const {
    item,
    index,
    selectedIndex,
    setSelectedIndex,
    disableSelection,
    textStyle,
    boxStyle,
    onChangeProfession,
  } = props;
  return (
    <View key={index} style={{flex: 1, marginTop: index == 0 ? 5 : 15, marginRight: 10}}>
      <TouchableOpacity
        disabled={disableSelection}
        onPress={() => {
          setSelectedIndex(index);
          onChangeProfession(professionListMock[index]);
        }}
        style={[
          {
            flex:1,
            height: hp('5%'),
            color: 'rgba(255, 255, 255, 1)',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: R.colors.BorderPrimaryLight,
            borderBottomWidth: 1,
            color: '#353635',
            flexDirection: 'row',
            borderRadius: 8,
            paddingHorizontal: 10,
          },
          boxStyle,
        ]}>
        
        <Text
          style={[
            {
              color: R.colors.DarkBlack,
              fontSize: hp('1.8%'),
              fontFamily: R.fonts.defaultMedium,
            },
            textStyle,
          ]}>
          {item}
        </Text>
        {selectedIndex == index && (
          <CheckedIcon>
            <Icon name="check-circle" size={hp('2.4%')} />
          </CheckedIcon>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const Profession = props => {
  const {
    containerStyle,
    keyword,
    onChangeProfession,
    disableSelection,
    textStyle,
    boxStyle,
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <View style={[containerStyle]}>
      {professionListMock.map((item, index) => {
        if (
          !keyword ||
          (keyword && item.toLowerCase().includes(keyword.toLowerCase()))
        ) {
          return (
            <Item
              key={index}
              disableSelection={disableSelection}
              textStyle={textStyle}
              index={index}
              boxStyle={boxStyle}
              onChangeProfession={onChangeProfession}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              item={item}
            />
          );
        } else {
          return null;
        }
      })}
    </View>
  );
};
