import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import R from '../../../assets';
import GradientContainer from '../../../containers/preview/gradientContainer';
import GradientText from '../../../containers/preview/textGradient';

const Loading = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          paddingVertical: hp('5%'),
          paddingHorizontal: wp('10%'),
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('40%'),
              height: hp('5%'),
              borderRadius: 5,
            }}
          />
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: hp('10%'),
              height: hp('10%'),
              borderRadius: hp('5%'),
              marginTop: 10,
            }}
          />
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('30%'),
              height: hp('2%'),
              borderRadius: 5,
              marginTop: 10,
            }}
          />
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('20%'),
              height: hp('2%'),
              borderRadius: 5,
              marginTop: 10,
            }}
          />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <GradientText
            style={{
              fontSize: hp('6%'),
              color: R.colors.DefaultTextColor,
              fontFamily: R.fonts.ArialRoundedBold,
            }}>
            Butler
          </GradientText>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('60%'),
              height: hp('3%'),
              borderRadius: 5,
            }}
          />
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('80%'),
              height: hp('3%'),
              borderRadius: 5,
              marginTop: hp('1%'),
            }}
          />
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('30%'),
              height: hp('3%'),
              borderRadius: 5,
              marginTop: hp('1%'),
            }}
          />
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('40%'),
              height: hp('3%'),
              borderRadius: 5,
              marginTop: hp('3%'),
            }}
          />
          <GradientContainer
            direction={'horizontal'}
            colors={['rgba(236, 236, 236, 1)', 'rgba(249, 249, 249, 1)']}
            containerStyle={{
              width: wp('50%'),
              height: hp('3%'),
              borderRadius: 5,
              marginTop: hp('1%'),
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Loading;
