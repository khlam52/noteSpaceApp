import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Form';
import colors from '../../constants/colors';
import { useAuthLogin, useAuthSignUp } from '../../hooks/useAuth';

export const SignUpScreen = () => {
  const {
    submit,
    errors,
    username,
    email,
    setEmail,
    setUsername,
    password,
    setPassword,
  } = useAuthSignUp();

  const updateUserName = (value: string) => {
    setUsername(value);
  };
  const updateEmail = (value: string) => {
    setEmail(value);
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
        errorText={errors.username}
        autoCapitalize="none"
      />
      <TextInput
        label="Email"
        placeholder="Enter your email..."
        value={email}
        onChangeText={updateEmail}
        errorText={errors.email}
        autoCapitalize="none"
        keyboardType="email-address"
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
      <Button onPress={submit}>Sign Up</Button>
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
