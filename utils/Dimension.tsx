import Constants from "expo-constants";
// import { I18n } from "i18n-js";
import { Dimensions, Platform } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const DeviceWidth = Dimensions.get("window").width;
export const DeviceHeight = Dimensions.get("window").height;
export const iOS = Platform.OS === "ios";
export const BigScreen = windowHeight > 800;
export const isSmallDevice = windowWidth < 375;
export const statusBarHeight = Constants.statusBarHeight;

// const i18n = new I18n();
// export const nf = (amount: number, precision: number) =>
//   i18n.numberToRounded(amount, { precision });
