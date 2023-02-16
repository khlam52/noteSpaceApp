import env from 'react-native-config';

const config = {
  env: env.ENV,
  version: {
    ios: env.IOS_APP_VERSION,
    android: env.AOS_APP_VERSION,
  },
  build_num: {
    ios: env.IOS_BUILD_VERSION,
    android: env.AOS_BUILD_VERSION,
  },
};

export const ENV = config.env;
export const IOS_APP_VERSION = config.version.ios;
export const AOS_APP_VERSION = config.version.android;
export const IOS_APP_BUILD_NUM = config.build_num.ios;
export const AOS_APP_BUILD_NUM = config.build_num.android;
