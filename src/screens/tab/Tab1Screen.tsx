import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import colors from '../../constants/colors';
import { Route } from '../../navigation/Route';

export const Tab1Screen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>tab1 screen</Text>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate(Route.LOGIN_SCREEN);
        }}
      >
        <Text>Press to Login</Text>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate(Route.SIGN_UP_SCREEN);
        }}
      >
        <Text>Press to Signup</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
