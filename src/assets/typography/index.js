import colors from "../colors";
import fonts from "../fonts";
// Trick to convert text style object `obj` type form {[key in string]: TextStyle} to
// {[key in keysof typeof obj]: TextStyle }
export function TextStyleSheet(obj) {
  return obj;
}

const title = {
  color: colors.PrimaryColor,
  textAlign: "center",
  fontFamily: fonts.openSansSemiBold,
};

const subtitle = {
  color: colors.PrimaryColor,
  fontFamily: fonts.openSansRegular,
  textAlign: "center",
};

const header = {
  color: colors.Black,
  fontFamily: fonts.openSansMedium,
};

const subHeading = {
  color: colors.Black,
  fontFamily: fonts.openSansSemiBold,
};

const label = {
  color: colors.Black,
  fontFamily: fonts.openSansRegular,
};

const buttonText = {
  color: colors.Black,
  fontFamily: fonts.openSansRegular,
};

const typography = {
  core: TextStyleSheet({
    title,
    subtitle,
    header,
    subHeading,
    label,
  }),
};

export default typography;
