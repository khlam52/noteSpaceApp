import React from 'react';
import 'react-native-gesture-handler';
import { LocalizationContextProvider } from './contexts/i18n/LocalizationContext';
import { RootStack } from './navigation/RootStack';
import { ThemeContextProvider } from './contexts/theme/ThemeContext';

export default function App() {
  return (
    <>
      <LocalizationContextProvider>
        <ThemeContextProvider>
          <RootStack />
        </ThemeContextProvider>
      </LocalizationContextProvider>
    </>
  );
}
