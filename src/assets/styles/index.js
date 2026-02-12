import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../colors";

const appStyles = StyleSheet.create({
  /* Column Layouts */
  colCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  colVCenter: {
    flexDirection: "column",
    alignItems: "center",
  },
  colHCenter: {
    flexDirection: "column",
    justifyContent: "center",
  },
  /* Row Layouts */
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowVCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  rowHCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowSpaceBtwn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  /* Default Layouts */
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  back: {
    marginStart: wp(24),
  },
  fullSize: {
    height: "100%",
    width: "100%",
  },
  absoluteCenter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shadow: {
    shadowColor: colors.ShadowColor,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default appStyles;
