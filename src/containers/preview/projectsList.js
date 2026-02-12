import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import R from '../../assets';
import Icon from 'react-native-vector-icons/FontAwesome'

export let projectsList = [
    {
        title: 'Redesign our booking Process & Mobile App',
        description: 'Imporve the UI/UX for website & mobile app'
    },
    {
        title: 'Simple Fintech App Splash screen modification',
        description: 'Simple Fintech App Splash screen modification'
    },
    {
        title: 'Mobile / Web app design and branding along with flow diagrams',
        description: 'Mobile / Web app design and branding'
    },
    {
        title: 'Building our booking Process & Mobile App',
        description: 'Imporve the UI/UX for website & mobile app and testing by using a long text so it doesnt go above two lines'
    },
    {
        title: 'Fintech App Splash screen modification',
        description: 'Newly created Fintech App Splash screen modification'
    },
    {
        title: 'Hybrid Mobile / Web app design and branding',
        description: 'Hybrid Mobile / Web app design and branding'
    }
];

const Item = (props) => {
    const { item, index, disableSelection, textStyle, boxStyle, textDescriptionStyle, } = props;
    return (
        <View key={index} style={[{
            paddingVertical: 10,
            justifyContent: 'space-between',
            color: '#353635',
            flexDirection: 'row',
        }, index != projectsList.length - 1 ? { borderBottomColor: R.colors.PrimaryColorLight,
            borderBottomWidth: 1,} : { paddingBottom: 0}]}>
            <TouchableOpacity disabled={disableSelection} onPress={() => {

            }} style={[{
                color: 'rgba(255, 255, 255, 1)',
                marginLeft: 10,
                width: '90%',
                borderRadius: 8
            }, boxStyle]}>
                <View>
                    <Text 
                    numberOfLines={1} ellipsizeMode="tail"
                    style={[{
                        color: R.colors.DarkBlack,
                        fontSize: hp('1.5%'),
                        fontFamily: R.fonts.defaultMedium
                    }, textStyle]}>
                        {item.title}
                    </Text>
                    <Text 
                    numberOfLines={2} ellipsizeMode="tail"
                    style={[{
                        color: R.colors.Grey,
                        fontSize: hp('1.5%'),
                        fontFamily: R.fonts.defaultMedium
                    }, textDescriptionStyle]}>
                        {item.description}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name='bookmark-o' color={R.colors.PrimaryColorDark} size={hp('2.2%')} />
            </TouchableOpacity>
        </View>)
}

export const ProjectsList = (props) => {
    const { containerStyle, keyword, disableSelection, textStyle, length, boxStyle, textDescriptionStyle } = props;

    if (length) {
        projectsList = projectsList.splice(0, length);
    }
    return (
        <View style={[{}, containerStyle]}>
            {
                projectsList.map((item, index) => { if (!keyword || (keyword && item.title.toLowerCase().includes(keyword.toLowerCase()))) { return (<Item key={index} disableSelection={disableSelection} textStyle={textStyle} index={index} boxStyle={boxStyle} textDescriptionStyle={textDescriptionStyle} item={item} />) } else { return null; } })
            }
        </View>
    )
};
