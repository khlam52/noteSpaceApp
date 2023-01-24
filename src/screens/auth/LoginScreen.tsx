import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';
import colors from '../../constants/colors';
import { useAuthLogin } from '../../hooks/useAuth';

export const LoginScreen = () => {
  const { submit, errors, username, setUsername, password, setPassword } =
    useAuthLogin();

  const updateUserName = (value: string) => {
    setUsername(value);
  };

  const updatePassword = (value: string) => {
    setPassword(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Username"
        placeholder="Enter your username..."
        value={username}
        onChangeText={updateUserName}
        errorText={errors.email}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Enter your password..."
        value={password}
        onChangeText={updatePassword}
        secureTextEntry
        errorText={errors.password}
        autoCapitalize="none"
      />
      <Button onPress={submit}>Sign In</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});
