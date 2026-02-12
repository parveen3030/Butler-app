import { Dimensions, Platform, TextStyle } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const IS_IOS = Platform.OS === "ios";

export const IS_ANDROID = Platform.OS === "android";

export const IS_DEV_ENV = __DEV__ === true;

export const DEVICE_VERSION = Platform.Version;

export const getWindowHeight = () => Dimensions.get("window").height;

export const getWindowWidth = () => Dimensions.get("window").width;

export function fontSizing(
    size,
    spacing,
    height
) {
    return IS_IOS
        ? {
            fontSize: hp(size),
            letterSpacing: spacing,
            lineHeight: hp(height),
        }
        : {
            fontSize: hp(size),
            letterSpacing: spacing,
        };
}
