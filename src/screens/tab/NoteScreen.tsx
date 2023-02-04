import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import { NoNoteIcon } from '../../assets/images';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import colors from '../../constants/colors';
import { NOTE_CONTENT_TYPE } from '../../constants/Constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import StorageService from '../../services/StorageService';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import NoteHelper from '../../util/NoteHelper';
import { NoteContent, NoteItem } from '../note/NoteModel';
import { NoteScreenContentItemView } from '../note/NoteScreenContentItemView';

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

  const [noteListWithOddIndex, setNoteListWithOddIndex] = useState<NoteItem[]>(
    [],
  );
  const [noteListWithEvenIndex, setNoteListWithEvenIndex] = useState<
    NoteItem[]
  >([]);

  useEffect(() => {
    getNoteList();
  }, []);

  // First Note
  const getNoteList = useCallback(async () => {
    let list = await StorageService.getNoteList();
    console.log('list:', list);
    setNoteListWithOddIndex(NoteHelper.getNoteFlatListWithIndex(list));
    setNoteListWithEvenIndex(NoteHelper.getNoteFlatListWithIndex(list, false));
  }, []);

  const noResultScreen = () => (
    <View style={{ alignItems: 'center', marginTop: sw(150) }}>
      <NoNoteIcon />
      <Text style={styles.addNoteText}>{'Add Note'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.mainContainer}>
        <Text style={styles.appNameText}>Notes</Text>
      </View>
      <ScrollView>
        <View style={styles.scrollContentView}>
          <NoteScreenContentItemView
            contentList={noteListWithOddIndex}
            isLeftView={true}
          />
          <NoteScreenContentItemView
            contentList={noteListWithEvenIndex}
            isLeftView={false}
          />
        </View>
      </ScrollView>
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
      paddingTop: sw(24),
      paddingHorizontal: sw(24),
    },
    appNameText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(36)),
      color: '#FFF',
      marginBottom: sw(12),
      textAlign: 'center',
    },
    addNoteText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(36)),
      color: '#2A2A32',
      marginTop: sw(46),
    },
    scrollContentView: {
      flexDirection: 'row',
      paddingVertical: sw(24),
    },
  });
};
