import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/colors';

export const Tab3Screen = () => {
  return (
    <View style={styles.container}>
      <Text>tab3 screen</Text>
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
