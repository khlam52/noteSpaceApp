import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import { Locale } from '../../constants/Constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useLocalization } from '../../hooks/useLocalization';
import StorageService from '../../services/StorageService';
import * as RNLocalize from 'react-native-localize';
import { Route } from '../../navigation/Route';
import { sw } from '../../styles/Mixins';
import { Typography } from '../../styles';

export const SplashScreen = ({ navigation }: any) => {
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const { locale, setLocale, t } = useLocalization();

  useEffect(() => {
    console.log('SplashScreen -> useEffect');
    loadData();
  }, []);

  const loadData = async () => {
    await setDefaultLocale();
    setTimeout(() => {
      navigation.navigate(Route.MAIN_STACK, { screen: Route.TAB_STACK });
    }, 1000);
  };

  const setDefaultLocale = async () => {
    // first time open app, load value from device os lang
    let savedLocale = await StorageService.getLocale();
    if (savedLocale) {
      if (savedLocale) {
        console.log(
          'SplashScreen -> setDefaultLanguage -> not first launch -> savedLocale:',
          savedLocale,
        );
        setLocale(savedLocale);
        return savedLocale;
      }
    } else {
      const deviceLocales = RNLocalize.getLocales();
      console.log(
        'SplashScreen -> setDefaultLocale -> first launch -> RNLocalize.getLocales:',
        deviceLocales,
      );
      if (Array.isArray(deviceLocales)) {
        let languageTag = deviceLocales[0].languageTag;
        let defaultLocale = Locale.en;
        if (
          languageTag.indexOf('zh-HK') !== -1 ||
          languageTag.indexOf('zh-MO') !== -1 ||
          languageTag.indexOf('zh-TW') !== -1 ||
          languageTag.indexOf('zh-Hant') !== -1 ||
          languageTag.indexOf('zh-CN') !== -1 ||
          languageTag.indexOf('zh-Hans') !== -1
        ) {
          defaultLocale = Locale.zhHant;
        }

        setLocale(defaultLocale);
        return defaultLocale;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.mainContainer}>
        <Text style={styles.appNameText}>Note Space</Text>
      </View>
    </SafeAreaView>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
      alignItems: 'center',
    },
    mainContainer: {
      flex: 1,
      paddingTop: sw(60),
    },
    appNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(36)),
      color: '#FFF',
      marginBottom: sw(12),
      textAlign: 'center',
    },
  });
};
