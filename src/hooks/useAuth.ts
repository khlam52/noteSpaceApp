import React, { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import ApiService from '../services/ApiService';

type ErrorType = {
  email?: string;
  username?: string;
  password?: string;
};

export function useAuthLogin() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});

  const isInputValidated = (): boolean => {
    const nextErrors: ErrorType = {};
    if (username.length === 0) {
      nextErrors.username = 'This field is required.';
    }
    if (password.length === 0) {
      nextErrors.password = 'This field is required.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }
    return true;
  };
  const submit = async (): Promise<any> => {
    if (!isInputValidated()) {
      return null;
    }
    try {
      let loginResponse = await ApiService.postAccountLogin(username, password);
      console.log('loginResponse:', loginResponse);
    } catch (error: unknown) {
      console.log('loginResponse error:', error);
    }

    Alert.alert('Success!', `username: ${username} \n Password: ${password}`);
    return null;
  };

  return {
    submit,
    errors,
    username,
    setUsername,
    password,
    setPassword,
  };
}

export function useAuthSignUp() {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});

  const isInputValidated = (): boolean => {
    const nextErrors: ErrorType = {};
    if (email.length === 0) {
      nextErrors.email = 'This field is required.';
    }
    if (username.length === 0) {
      nextErrors.username = 'This field is required.';
    }
    if (password.length === 0) {
      nextErrors.password = 'This field is required.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }
    return true;
  };
  const submit = async (): Promise<any> => {
    if (!isInputValidated()) {
      return null;
    }
    try {
      let signUpResponse = await ApiService.postAccountSignUp(
        username,
        password,
        email,
      );
      console.log('signUpResponse:', signUpResponse);
    } catch (error: unknown) {
      console.log('signUpResponse error:', error);
    }

    Alert.alert(
      'Sign Up Success!',
      `username: ${username} \n Password: ${password}\n Email: ${email}`,
    );
    return null;
  };

  return {
    submit,
    errors,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
  };
}
