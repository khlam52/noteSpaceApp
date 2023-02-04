import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  BackIcon,
  CameraIcon,
  FontIcon,
  PenIcon,
  PhotoIcon,
} from '../../assets/images';
import AppFocusAwareStatusBar from '../../components/AppFocusAwareStatusBar';
import AppPressable from '../../components/AppPressable';
import { NOTE_CONTENT_TYPE } from '../../constants/Constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Route } from '../../navigation/Route';
import { ScreenProp } from '../../navigation/type';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import CommonUtils from '../../util/CommonUtils';
import NoteHelper from '../../util/NoteHelper';
import { BottomFontFormatModalView } from './BottomFontFormatModalView';
import { NoteImageContentView } from './NoteImageContentView';
import { NoteContent, NoteImageContent, NoteTextContent } from './NoteModel';
import { NoteTextInputContentView } from './NoteTextInputContentView';

type Props = ScreenProp<Route.NOTE_CREATE_AND_EDIT_SCREEN>;

export const NoteCreateAndEditScreen: React.FC<Props> = props => {
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const {
    navigation,
    route: {
      params: { noteItem, isCreateNote },
    },
  } = props;

  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());
  const [contentLayoutList, setContentLayoutList] = useState<NoteContent[]>([]);
  const [isShowFontIcon, setIsShowFontIcon] = useState<boolean>(false);
  const fontFormatModal = useRef<BottomSheetModal | null>(null);

  const [editingTextIndex, setEditingTextIndex] = useState<number>(0);

  const BOTTOM_BTN_LIST = [
    {
      icon: <PhotoIcon />,
      onPress: () => {
        NoteHelper.accessImagePickerFunc(
          contentLayoutList,
          updateContentLayoutList,
        );
      },
    },
    {
      icon: <CameraIcon />,
      onPress: () => {
        NoteHelper.accessCameraPickerFunc(
          contentLayoutList,
          updateContentLayoutList,
        );
      },
    },
    {
      icon: <PenIcon />,
      onPress: () => {
        NoteHelper.onPenIconPress(contentLayoutList, updateContentLayoutList);
      },
    },
  ];

  useEffect(() => {
    console.log('noteitem:', noteItem);
  }, []);

  const onBackIconPress = () => {
    navigation.goBack();
  };

  const onFontIconPress = () => {
    fontFormatModal.current?.present();
  };

  // Note Handle
  const onChangeTitle = (val: string | undefined) => {
    setTitle(val);
  };

  const updateContentLayoutList = (updatedList: NoteContent[]) => {
    setContentLayoutList(updatedList);
  };
  ////

  const renderContentLayoutListView = () => {
    let contentViewList: any = [];
    contentLayoutList &&
      contentLayoutList?.map((item: NoteContent, index: number) => {
        if (item.type === NOTE_CONTENT_TYPE.TEXT) {
          contentViewList.push(
            <NoteTextInputContentView
              item={item as NoteTextContent}
              index={index}
              contentList={contentLayoutList}
              updateContentList={updateContentLayoutList}
              setIsShowFontIcon={setIsShowFontIcon}
              setEditingTextIndex={setEditingTextIndex}
            />,
          );
        } else if (item.type === NOTE_CONTENT_TYPE.IMAGE) {
          contentViewList.push(
            <NoteImageContentView
              item={item as NoteImageContent}
              index={index}
              contentList={contentLayoutList}
              updateContentList={updateContentLayoutList}
            />,
          );
        }
      });
    return (
      <View style={{ flex: 1, paddingBottom: sw(90) }}>{contentViewList}</View>
    );
  };

  const renderBottomView = () => {
    return (
      <View style={styles.bottomBtnView}>
        {BOTTOM_BTN_LIST &&
          BOTTOM_BTN_LIST.map((item, index: number) => {
            return (
              <AppPressable onPress={item.onPress} key={index}>
                <View style={styles.btnView}>{item.icon}</View>
              </AppPressable>
            );
          })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppFocusAwareStatusBar barStyle={'light-content'} />
      <View style={styles.header}>
        <AppPressable onPress={onBackIconPress}>
          <BackIcon />
        </AppPressable>
        <View style={styles.headerRightcontainer}>
          {isShowFontIcon && (
            <AppPressable onPress={onFontIconPress}>
              <FontIcon />
            </AppPressable>
          )}
          <Text style={styles.saveText}>Save</Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        scrollEnabled={true}
        enableOnAndroid={true}
        style={styles.inputContainer}
      >
        <TextInput
          value={title}
          onChangeText={onChangeTitle}
          placeholder={'Note Title'}
          style={styles.inputTitleText}
          placeholderTextColor={'#B6B6B6'}
        />
        <Text style={styles.dateText}>{CommonUtils.getMomentDate(date)}</Text>
        {renderContentLayoutListView()}
      </KeyboardAwareScrollView>
      {renderBottomView()}
      <BottomFontFormatModalView
        ref={fontFormatModal}
        editingTextIndex={editingTextIndex}
        contentLayoutList={contentLayoutList}
        updateContentLayoutList={updateContentLayoutList}
      />
    </SafeAreaView>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1B191E',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: sw(24),
      justifyContent: 'space-between',
    },
    headerRightcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputContainer: {
      flex: 1,
      paddingHorizontal: sw(24),
      paddingTop: sw(24),
      marginTop: sw(12),
    },
    saveText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFEAA1',
      paddingLeft: sw(12),
    },
    inputTitleText: {
      ...Typography.ts(theme.fonts.weight.bold, sw(28)),
      color: '#FFF',
    },
    dateText: {
      ...Typography.ts(theme.fonts.weight.regular, sw(16)),
      color: '#B6B6B6',
      marginVertical: sw(24),
    },
    bottomBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: sw(48),
      marginBottom: sw(24),
      marginTop: sw(12),
    },
    btnView: {
      borderRadius: sw(100),
      backgroundColor: '#000',
      width: sw(60),
      height: sw(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
