import i18n from 'i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import enTranslation from '../../assets/translations/en.json';
import zhHantTranslation from '../../assets/translations/zh-Hant.json';
import { Locale } from '../../constants/Constants';
import StorageService from '../../services/StorageService';

export const resources = {
  [Locale.en]: enTranslation,
  [Locale.zhHant]: zhHantTranslation,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export interface LocalizationContextValue {
  t: (scope: string, options: any | null) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocalizationContext =
  React.createContext<LocalizationContextValue>(null as any);

export const LocalizationContextProvider: React.FC = props => {
  const [locale, setLocale] = useState<Locale>(Locale.en);
  const { t } = useTranslation();

  // get savedLocale
  useEffect(() => {
    getLaunchAppLocale();
  }, []);

  const getLaunchAppLocale = async (): Promise<void> => {
    const deviceLang = getLocales()[0].languageTag;
    try {
      let savedLocale = await StorageService.getLocale();
      if (savedLocale) {
        changeLocale(savedLocale);
      } else {
        if (deviceLang.startsWith('zh-')) {
          changeLocale(Locale.zhHant);
        } else {
          changeLocale(Locale.en);
        }
      }
      console.log('deviceLang:', deviceLang);
      console.log('savedLocale:', savedLocale);
    } catch (error) {
      console.log('get saved locale error: ', error);
    }
  };

  const changeLocale = useCallback((selectLocale: any) => {
    setLocale(selectLocale);
    i18n.changeLanguage(selectLocale);
    StorageService.setLocale(selectLocale).then(() => {});
  }, []);

  const localizationContext = useMemo<LocalizationContextValue>(
    () => ({
      t: (scope: string, options: any | null) =>
        t(scope, { locale, ...options }),
      locale,
      setLocale: changeLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {props.children}
    </LocalizationContext.Provider>
  );
};
