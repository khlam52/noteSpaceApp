import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import colors from '../../constants/colors';
import { NOTE_CONTENT_TYPE } from '../../constants/Constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';

export const NoteScreen = () => {
  const dummyList = [
    {
      title: 'aaa',
      date: new Date(),
      content: [
        {
          type: NOTE_CONTENT_TYPE.TEXT,
          value: 'Note Text',
          fontStyle: 'italic',
          fontSize: sw(20),
          fontWeight: 'bold',
          textDecorationLine: 'underline',
          textAlign: 'center',
          paddingLeft: sw(0),
          paddingRight: sw(0),
        },
        {
          type: NOTE_CONTENT_TYPE.IMAGE,
          img: 'sdfdsf',
        },
      ],
      uuid: '111',
    },
  ];
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const [content, setContent] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.mainContainer}>
        <Text style={styles.appNameText}>Notes</Text>
      </View>
    </SafeAreaView>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
    },
    mainContainer: {
      flex: 1,
      paddingTop: sw(24),
      paddingHorizontal: sw(24),
    },
    appNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(36)),
      color: '#FFF',
      marginBottom: sw(12),
      textAlign: 'center',
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
  });
};
