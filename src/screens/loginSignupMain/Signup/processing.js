import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import R from '../../../assets';
import GradientText from '../../../containers/preview/textGradient';
import {signUpProcessNavigate} from '../../../redux/auth/actions';
import ProcessingAccount from '../../../assets/images/processingAccount.svg';
import ProcessingBanner from '../../../assets/images/processingBanner.svg';

const Processing = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(signUpProcessNavigate({step: 0}));
    }, 2000);
  });
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: hp('6%'),
              fontStyle: 'normal',
              color: R.colors.PrimaryColorDark,
              fontFamily: R.fonts.ArialRoundedBold,
            }}>
            Butler
          </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{}}>
            <ProcessingBanner width={wp('100%')} />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: wp('70%'),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: hp('3.8%'),
              color: R.colors.DefaultTextColor,
              fontFamily: R.fonts.defaultRegular,
            }}>
            We're creating your account.
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: hp('1.8%'),
              color: R.colors.Grey,
              fontFamily: R.fonts.defaultRegular,
            }}>
            Please wait...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Processing;
