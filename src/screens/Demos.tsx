import React, { useCallback } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';

import colors from '../constants/colors';
// import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { useLogin } from '../util/auth';
import { useLocalization } from '../hooks/useLocalization';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAuthLogin } from '../hooks/useAuth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});

export const TextDemo = () => (
  <View style={styles.container}>
    <Text>This is a header</Text>
    <Text>This is a subheader</Text>
    <Text>This is normal text</Text>
  </View>
);

export const FormDemo = () => {
  const { submit, errors, username, setUsername, password, setPassword } =
    useAuthLogin();
  const { t, locale, setLocale } = useLocalization();
  const changeLocale = useCallback((v: any) => {
    setLocale(v);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        placeholder="Enter your email..."
        value={username}
        onChangeText={(text: string) => setUsername(text)}
        errorText={errors.email}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <Text>{locale}</Text>
      <Text>{t('button.ok', {})}</Text>
      <Button
        onPress={() => {
          changeLocale('en');
        }}
      >
        en
      </Button>
      <Button
        onPress={() => {
          changeLocale('zh-Hant');
        }}
      >
        zh
      </Button>

      <Button onPress={submit}>Sign In</Button>
    </View>
  );
};

export const ButtonDemo = () => (
  <View style={styles.container}>
    <Button onPress={() => Alert.alert('you pressed the default button')}>
      Default Button
    </Button>
    <Button
      type="outline"
      onPress={() => Alert.alert('you pressed the outline button')}
    >
      Outline Button
    </Button>
  </View>
);
