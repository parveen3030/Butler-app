import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import R from '../../../assets';
import GradientContainer from '../../../containers/preview/gradientContainer';
import GradientText from '../../../containers/preview/textGradient';

const SkillsRequest = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ paddingVertical: hp('4%'), paddingHorizontal: wp('10%'), flex: 1, justifyContent: "space-between", alignItems: 'center' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <GradientText style={{
                        fontSize: hp('4.2%'),
                        color: R.colors.DefaultTextColor,
                        fontFamily: R.fonts.defaultExtraBold
                    }}>Butler</GradientText>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={R.images.skillsRequest} style={{ width: wp('50%') }} resizeMode={'contain'} />
                </View>
                <View style={{ justifyContent: 'center', width: wp('80%') }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: hp('3%'),
                        color: R.colors.DarkBlack,
                        fontFamily: R.fonts.defaultRegular
                    }} >You’re request have been recieved us!</Text>
                    <Text style={{
                        marginTop: 10,
                        textAlign: 'center',
                        fontSize: hp('1.8%'),
                        color: R.colors.Grey,
                        fontFamily: R.fonts.defaultRegular
                    }} >We will update your skills soon!</Text>
                    <GradientContainer direction={'horizontal'} containerStyle={{ borderRadius: 10, padding: 2, marginTop: 20 }}>
                        <TouchableOpacity
                            style={{
                                padding: 20,
                                paddingVertical: 15,
                                borderColor: '#fff',
                                alignItems: 'center',
                                borderRadius: 8,
                                backgroundColor: "#fff",
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                            onPress={() => {
                                props.navigation.navigate('Profile')
                            }
                            }
                            activeOpacity={1}
                        >

                            <Text style={{
                                textAlign: 'center',
                                fontSize: hp('2.2%'),
                                color: R.colors.PrimaryColorDark,
                                fontFamily: R.fonts.defaultSemiBold
                            }} >BACK TO PROFILE</Text>
                        </TouchableOpacity>
                    </GradientContainer>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SkillsRequest;