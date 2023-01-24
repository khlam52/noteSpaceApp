import DeviceInfo from 'react-native-device-info';
import { FONT_SIZE_ADJUSTMENT_RATIO } from '../constants/Constants';

import { sf, sw } from './Mixins';

// FONT FAMILY (We must use font family instead of weight to control the thickness of the font)
export const FONT_FAMILY_100 = 'ExtraLight'; //FontWeight = 100
export const FONT_FAMILY_200 = 'ExtraLight'; //FontWeight = 200
export const FONT_FAMILY_300 = 'Light'; //FontWeight = 300
export const FONT_FAMILY_400 = 'Regular'; // FontWeight = 400
export const FONT_FAMILY_500 = 'Medium'; //FontWeight = 500
export const FONT_FAMILY_600 = 'SemiBold'; //FontWeight = 600
export const FONT_FAMILY_700 = 'Bold'; // FontWeight = 700
export const FONT_FAMILY_800 = 'ExtraBold'; // FontWeight = 800
export const FONT_FAMILY_900 = 'Black'; // FontWeight = 900

//Retrieve the device manufacturer / brand, in order to apply style fix specifically.

const deviceBrand = DeviceInfo.getBrand();

const getTextStyle = (
  fontFamily: String,
  fontSizeInDp = 18,
  lineHeightInDp = 0,
) => {
  let lineHeight =
    FONT_SIZE_ADJUSTMENT_RATIO[deviceBrand.toLowerCase()] !== undefined
      ? Number(
          (
            sw(lineHeightInDp) *
            FONT_SIZE_ADJUSTMENT_RATIO[deviceBrand.toLowerCase()]
          ).toFixed(0),
        )
      : sw(lineHeightInDp);
  if (lineHeightInDp === 0) {
    lineHeight = getLineHeight(fontSizeInDp);
  }
  return {
    // fontFamily: fontFamily,
    fontSize: sf(fontSizeInDp),
    lineHeight: lineHeight,
  };
};

export const ts = getTextStyle;

const getLineHeight = (fontSizeInDp: number) => {
  let multiplier = 1.2;
  let lineHeight = sw(Math.round(fontSizeInDp * multiplier));
  return lineHeight;
};

export const getTextExtraPadding = (fontSizeInDp: number) => {
  return {
    paddingVertical: sw(fontSizeInDp * 0.375),
  };
};
