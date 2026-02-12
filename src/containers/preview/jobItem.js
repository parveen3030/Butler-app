import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../assets';

const JobItem = props => {
  let item = props.invite
    ? props.item
    : {_id: props.item._id, job: [props.item]};
  const {
    index,
    disableSelection,
    textStyle,
    boxStyle,
    textDescriptionStyle,
    jobInvitesLength,
  } = props;

  console.log('item', item);
  return (
    <View
      key={index}
      style={[
        {
          paddingVertical: 10,
          justifyContent: 'space-between',
          color: '#353635',
        },
        index != jobInvitesLength - 1
          ? {borderBottomColor: R.colors.BorderLightGrey, borderBottomWidth: 1}
          : {paddingBottom: 0},
      ]}>
      <TouchableOpacity
        disabled={!props.invite}
        onPress={() => {
          props.navigation.navigate('JobDetail', {jobID: item?._id});
        }}
        style={[
          {
            color: 'rgba(255, 255, 255, 1)',
            marginLeft: 10,
            borderRadius: 8,
          },
          boxStyle,
        ]}>
        <View>
          <Text
            numberOfLines={1}
            style={[
              {
                color: R.colors.DarkBlack,
                fontSize: hp('2.2%'),
                fontFamily: R.fonts.defaultMedium,
              },
              textStyle,
            ]}>
            {item?.job?.[0]?.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              {
                color: R.colors.Grey,
                fontSize: hp('1.6%'),
                fontFamily: R.fonts.defaultRegular,
              },
              textDescriptionStyle,
            ]}>
            {item?.job?.[0]?.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={[
              {
                marginTop: 10,
                color: R.colors.DarkGrey,
                fontSize: hp('1.5%'),
                fontFamily: R.fonts.defaultMedium,
              },
              textStyle,
            ]}>
            Category:{' '}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              {
                marginTop: 10,
                color: R.colors.PrimaryColorDark,
                fontSize: hp('1.6%'),
                fontFamily: R.fonts.ArialRoundedBold,
              },
              textStyle,
            ]}>
            {item?.job?.[0]?.category?.name.charAt(0).toUpperCase() +
              item?.job?.[0]?.category?.name.substr(1)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default JobItem;
