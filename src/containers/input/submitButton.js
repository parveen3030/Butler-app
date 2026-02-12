

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import GradientContainer from '../preview/gradientContainer';

export const SubmitButton = (props) => {
    const { title, onPress, containerStyle, contentContainerStyle, titleTextStyle, disabled, activeOpacity, gradientColors } = props;
    return (
        <GradientContainer disabled={disabled} containerStyle={containerStyle} colors={gradientColors} direction={'horizontal'}>
            <TouchableOpacity
                activeOpacity={activeOpacity}
                disabled={disabled}
                onPress={onPress}
                style={contentContainerStyle}>
                <Text style={titleTextStyle} >{title ? title : ''}</Text>
            </TouchableOpacity>
        </GradientContainer>
    )
};
