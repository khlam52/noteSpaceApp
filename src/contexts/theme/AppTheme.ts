// const AppScreenThemesAvailability = {
//   DEFAULT: [THEME_NAME.DARK],
//   TAB_ACCOUNT_OVERVIEW_SCREEN: [THEME_NAME.DARK, THEME_NAME.LIGHT],
// };

import { THEME_NAME } from '../../constants/Constants';
import { Typography } from '../../styles';

const baseComponentDisplays = {};

const baseSpacings = {
  s1: 8,
  s2: 16,
  s3: 24,
  s4: 32,
  s5: 40,
  s6: 48,
  s7: 56,
};

const baseRadiuses = {
  container: 48,
  item: 24,
  corner: 16,
  badge: 8,
};

const darkColorScheme = {
  splashBackground: '#111111',
};

const lightColorScheme = {
  splashBackground: '#FFF1BF',
};

const baseFonts = {
  weight: {
    thin: Typography.FONT_FAMILY_100,
    extralight: Typography.FONT_FAMILY_200,
    light: Typography.FONT_FAMILY_300,
    regular: Typography.FONT_FAMILY_400,
    medium: Typography.FONT_FAMILY_500,
    semibold: Typography.FONT_FAMILY_600,
    bold: Typography.FONT_FAMILY_700,
    extrabold: Typography.FONT_FAMILY_800,
    black: Typography.FONT_FAMILY_900,
  },
  size: {
    note2: 14,
    note1: 15,
    desc: 16,
    para: 18,
    lead: 20,
    ///
    h5: 20,
    h4: 24,
    h3: 28,
    h2: 32,
    h1: 48,
  },
};

const AppDarkTheme = {
  name: THEME_NAME.DARK,
  settings: {
    roundness: baseRadiuses,
    spacings: baseSpacings,
    colors: darkColorScheme,
    fonts: baseFonts,
    animation: { scale: 1 },
  },
  displays: baseComponentDisplays,
};

const AppLightTheme = {
  name: THEME_NAME.LIGHT,
  settings: {
    roundness: baseRadiuses,
    spacings: baseSpacings,
    colors: lightColorScheme,
    fonts: baseFonts,
    animation: { scale: 1 },
  },
  displays: baseComponentDisplays,
};

export { AppDarkTheme, AppLightTheme };
