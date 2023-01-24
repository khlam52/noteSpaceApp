import env from 'react-native-config';

const config = {
  env: env.ENV,
  isEnableCertPinning: env.IS_ENABLE_CERT_PINNING,
  isEnableClientCertPinning: env.IS_ENABLE_CLIENT_CERT_PINNING,

  clientCertName: env.CLIENT_CERT_NAME,
  clientCertPw: env.CLIENT_CERT_PW,
  version: {
    ios: env.IOS_APP_VERSION,
    android: env.AOS_APP_VERSION,
  },
  build_num: {
    ios: env.IOS_BUILD_VERSION,
    android: env.AOS_BUILD_VERSION,
  },
  api: {
    isMockData: env.IS_MOCK_DATA,
    host: env.API_HOST,
    clientId: env.CLIENT_ID,
    timeout: 30000,
  },
  linking: {
    universalLink: env.UNIVERSAL_LINK,
  },
};

export const ENV = config.env;
export const API_HOST = config.api.host;
export const CLIENT_ID = config.api.clientId;
export const API_TIMEOUT = config.api.timeout;
export const IS_API_MOCK_DATA = config.api.isMockData;
export const IOS_APP_VERSION = config.version.ios;
export const AOS_APP_VERSION = config.version.android;
export const IOS_APP_BUILD_NUM = config.build_num.ios;
export const AOS_APP_BUILD_NUM = config.build_num.android;
export const IS_ENABLE_CERT_PINNING = config.isEnableCertPinning;
export const IS_ENABLE_CLIENT_CERT_PINNING = config.isEnableClientCertPinning;
export const CLIENT_CERT_NAME = config.clientCertName;
export const CLIENT_CERT_PW = config.clientCertPw;

// Universal Link
export const UNIVERSAL_LINK = config.linking.universalLink;

// API URL
export const API_ENDPOINT = 'https://2d5f-58-153-196-51.ngrok.io';

// Account
export const ACCOUNT_CREATE_URL = API_ENDPOINT + '/auth/sign-up';
export const ACCOUNT_LOGIN_URL = API_ENDPOINT + '/auth/login';
