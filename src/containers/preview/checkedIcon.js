import R from '../../assets';
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";
import IconF from 'react-native-vector-icons/FontAwesome5'

const CheckedIcon = (props) => {
  return (
    <MaskedView maskElement={<IconF {...props} />}>
      <LinearGradient
        colors={[R.colors.PrimaryColorDark, R.colors.PrimaryColorLight]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
        <IconF {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default CheckedIcon;