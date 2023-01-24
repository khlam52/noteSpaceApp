import { Header } from '@react-navigation/stack';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { API_TIMEOUT } from '../config/Config';

const makeRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  requestURL: string,
  requestData: any,
): Promise<any> => {
  let currentAppVersion = DeviceInfo.getVersion(); // iOS: "1.0", Android: "1.0"
  let osVersion = DeviceInfo.getSystemVersion(); //iOS: "11.0", Android: "7.1.1"
  let deviceModel = DeviceInfo.getDeviceId(); //iOS: "iPhone7,2", Android: "goldfish"
  let platform = Platform.OS;
  let uniqueDeviceId = DeviceInfo.getUniqueId();

  const commonHeader: HeadersInit_ = new Headers();

  commonHeader.set('MOBILE-APP-VERSION', currentAppVersion);
  commonHeader.set('MOBILE-DEVICE-PLATFORM', platform);
  commonHeader.set('MOBILE-DEVICE-OS-VERSION', osVersion);
  commonHeader.set('MOBILE-DEVICE-MODEL', deviceModel);
  commonHeader.set('MOBILE-DEVICE-ID', await uniqueDeviceId);
  commonHeader.set('content-type', 'application/json; charset=utf-8');

  console.log('requestURL:', requestURL);
  console.log('requestData:', requestData);
  console.log('commonHeader:', commonHeader);

  console.log(
    'HttpConnector -> makeRequest -> ' +
      method +
      ' requestURL: ' +
      requestURL +
      ' requestData: ' +
      (requestData ? JSON.stringify(requestData) : ''),
  );

  try {
    let requestBody;
    let response;
    if (method === 'POST') {
      requestBody = JSON.stringify(requestData);
      response = await fetch(requestURL, {
        method: method,
        // timeoutInterval: API_TIMEOUT, // milliseconds,
        body: requestBody,
        headers: commonHeader,
      });
    } else if (method === 'GET') {
      if (requestData) {
        let concatRequestURL = requestURL.concat('?');
        Object.keys(requestData).forEach(function (key) {
          concatRequestURL = concatRequestURL.concat(
            key + '=' + requestData[key] + '&',
          );
        });
        concatRequestURL = concatRequestURL.substring(
          0,
          concatRequestURL.length - 1,
        );
      }

      let encodeUrl = encodeURI(requestURL);
      response = await fetch(encodeUrl, {
        method: 'GET',
        // timeoutInterval: API_TIMEOUT, // milliseconds,
        headers: commonHeader,
      });
    }
    if (response) {
      console.log(
        'HttpConnector -> makeRequest -> response received: ',
        response,
      );
      let jsonResponse = await Promise.resolve(response.json()).catch(() => {
        return;
      });
      console.log('jsonResponse:', jsonResponse);
      if (jsonResponse) {
        return jsonResponse;
      }
    } else {
      console.log('HttpConnector -> makeRequest -> response is null');
      let errorResult = {
        result: {
          code: 'API_RESPONSE_NULL',
        },
      };
      return Promise.reject(errorResult);
    }
  } catch (error) {
    console.log(
      'HttpConnector -> makeRequest -> catch error: ',
      JSON.stringify(error),
    );
    return Promise.reject(error);
  }
};

export async function getRequest(
  requestURL: string,
  requestData: any,
): Promise<any> {
  return makeRequest('GET', requestURL, requestData);
}

export async function postRequest(
  requestURL: string,
  requestData: any,
): Promise<any> {
  return makeRequest('POST', requestURL, requestData);
}
