import { AppConfig } from '../config';
import { getRequest, postRequest } from '../util/HttpConnector';

function getFetchRequest(apiUrl: string, params?: any): Promise<any> {
  return getRequest(apiUrl, params);
}

function postFetchRequest(apiUrl: string, params?: any): Promise<any> {
  return postRequest(apiUrl, params);
}

// Account API
function postAccountLogin(username: string, password: string) {
  let params = {
    username,
    password,
  };
  return postFetchRequest(AppConfig.ACCOUNT_LOGIN_URL, params);
}

function postAccountSignUp(username: string, password: string, email: string) {
  let params = {
    username,
    password,
    email,
  };
  return postFetchRequest(AppConfig.ACCOUNT_CREATE_URL, params);
}

export default {
  postAccountLogin,
  postAccountSignUp,
};
