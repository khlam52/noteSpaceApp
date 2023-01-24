import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LocalizationContextProvider } from './contexts/i18n/LocalizationContext';
import { MainStack } from './navigation/MainStack';
import { RootStack } from './navigation/RootStack';

export default function App() {
  return (
    <>
      <LocalizationContextProvider>
        <RootStack />
      </LocalizationContextProvider>
    </>
  );
}
