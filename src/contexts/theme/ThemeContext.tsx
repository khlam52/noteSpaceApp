import React, { useMemo, useState } from 'react';
import { THEME_NAME } from '../../constants/Constants';
import { AppDarkTheme, AppLightTheme } from './AppTheme';

export interface ThemeContextValue {
  theme: any;
  themeSwitched: any;
  setTheme: (t: string) => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>(null as any);

export const ThemeContextProvider: React.FC = props => {
  //   const { theme } = props;
  const [themeObj, changeTheme] = useState(AppLightTheme);

  const onChangeTheme = (t: string) => {
    const themeObjCaptured =
      t.toUpperCase() === THEME_NAME.DARK ? AppDarkTheme : AppLightTheme;
    changeTheme(themeObjCaptured);
  };

  const themeContext = useMemo<ThemeContextValue>(
    () => ({
      theme: AppLightTheme,
      themeSwitched: themeObj,
      setTheme: (t: string) => onChangeTheme(t),
    }),
    [themeObj, onChangeTheme],
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};
