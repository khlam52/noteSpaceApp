import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  CloseIcon,
  DeleteIcon,
  NoNoteIcon,
  TickIcon,
  UnTickIcon,
} from '../../assets/images';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import AppPressable from '../../components/AppPressable';
import AppSquircleButtonView from '../../components/AppSquircleButtonView';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Route } from '../../navigation/Route';
import StorageService from '../../services/StorageService';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import NoteHelper from '../../util/NoteHelper';
import { NoteItem, NoteSelectItem } from '../note/NoteModel';
import { NoteScreenContentItemView } from '../note/NoteScreenContentItemView';

export const NoteScreen = ({ navigation }: any) => {
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

  const [selectedList, setSelectedList] = useState<NoteSelectItem[]>([]);
  const [isItemLongPressed, setIsItemLongPressed] = useState<boolean>(false);

  useEffect(() => {
    if (!isItemLongPressed) {
      getNoteList();
    }
  }, [noteListWithOddIndex, isItemLongPressed]);

  // First Note
  const getNoteList = async () => {
    let list = await StorageService.getNoteList();
    setSelectedList(NoteHelper.getSelectedList(list));
    setNoteListWithOddIndex(NoteHelper.getNoteFlatListWithIndex(list));
    setNoteListWithEvenIndex(NoteHelper.getNoteFlatListWithIndex(list, false));
  };

  const onNoteItemPress = (item: NoteItem) => {
    navigation.navigate(Route.NOTE_CREATE_AND_EDIT_SCREEN, {
      noteItem: item,
      isCreateNote: false,
    });
  };

  // Delete Handle
  const OnSelectAllPress = () => {
    NoteHelper.onSelectAllPressedFunc(selectedList, setSelectedList);
  };

  const onCloseIconPressed = () => {
    setIsItemLongPressed(false);
  };
  const onDeleteIconPressed = async () => {
    await NoteHelper.deleteNoteFunc(selectedList);
    setIsItemLongPressed(false);
  };
  //

  const renderSelectAllView = () => {
    return (
      <View style={styles.selectAllView}>
        <AppPressable onPress={OnSelectAllPress}>
          <View style={styles.selectAllLeftView}>
            {selectedList.filter(item => item.isSelected).length ===
            selectedList.length ? (
              <TickIcon fill={'#FFEAA1'} width={sw(20)} height={sw(20)} />
            ) : (
              <UnTickIcon stroke={'#FFEAA1'} width={sw(20)} height={sw(20)} />
            )}
            <Text style={styles.selectAllText}>{'Select All'}</Text>
          </View>
        </AppPressable>

        <AppSquircleButtonView
          style={styles.longPressImageView}
          fillColor={'#252525'}
        >
          <AppPressable onPress={onCloseIconPressed}>
            <CloseIcon width={sw(18)} height={sw(18)} />
          </AppPressable>
          <View style={styles.longPressLineSeparator} />
          <AppPressable onPress={onDeleteIconPressed}>
            <DeleteIcon />
          </AppPressable>
        </AppSquircleButtonView>
      </View>
    );
  };

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
      {isItemLongPressed && renderSelectAllView()}
      {noteListWithOddIndex.length === 0 &&
      noteListWithEvenIndex.length === 0 ? (
        noResultScreen()
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContentView}>
            <NoteScreenContentItemView
              contentList={noteListWithOddIndex}
              isLeftView={true}
              onNoteItemPress={onNoteItemPress}
              isItemLongPressed={isItemLongPressed}
              setIsItemLongPressed={setIsItemLongPressed}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
            <NoteScreenContentItemView
              contentList={noteListWithEvenIndex}
              isLeftView={false}
              onNoteItemPress={onNoteItemPress}
              isItemLongPressed={isItemLongPressed}
              setIsItemLongPressed={setIsItemLongPressed}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          </View>
        </ScrollView>
      )}
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
      marginBottom: sw(90),
    },
    selectAllView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: sw(28),
      marginTop: sw(36),
      marginBottom: sw(8),
    },
    selectAllLeftView: {
      flexDirection: 'row',
    },
    selectAllText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(20)),
      color: '#FFEAA1',
      marginLeft: sw(8),
    },
    longPressImageView: {
      flexDirection: 'row',
      width: sw(100),
      height: sw(40),
      alignSelf: 'flex-end',
      backgroundColor: '#252525',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: sw(30),
      paddingHorizontal: sw(16),
    },
    longPressLineSeparator: {
      width: sw(2),
      height: sw(40),
      backgroundColor: '#2A2A32',
    },
    longPressCircleView: {
      position: 'absolute',
      right: 0,
      marginRight: sw(24),
      marginTop: sw(24),
    },
  });
};
