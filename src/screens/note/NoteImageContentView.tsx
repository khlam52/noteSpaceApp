import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CloseIcon, DeleteIcon } from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import NoteHelper from '../../util/NoteHelper';
import { NoteContent, NoteImageContent, NoteTextContent } from './NoteModel';

interface LoginPressProps {
  setIsShowLongPressHandle: (boolean: boolean) => void;
  contentList: NoteContent[];
  updateContentList: (updatedList: NoteContent[]) => void;
  index: number;
}

const RenderImageLongPressHandleView: React.FC<LoginPressProps> = props => {
  const { setIsShowLongPressHandle, contentList, updateContentList, index } =
    props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const onCloseIconPress = () => {
    setIsShowLongPressHandle(false);
  };

  const onDeleteIconPress = () => {
    NoteHelper.deletePhotoItem(contentList, updateContentList, index);
    setIsShowLongPressHandle(false);
  };

  return (
    <View style={styles.longPressImageView}>
      <AppPressable onPress={onCloseIconPress}>
        <CloseIcon width={sw(18)} height={sw(18)} />
      </AppPressable>
      <View style={styles.longPressLineSeparator} />
      <AppPressable onPress={onDeleteIconPress}>
        <DeleteIcon />
      </AppPressable>
    </View>
  );
};

interface NoteImageItemProps {
  contentList: NoteContent[];
  updateContentList: (updatedList: NoteContent[]) => void;
  item: NoteImageContent;
  index: number;
}

export const NoteImageContentView: React.FC<NoteImageItemProps> = props => {
  const { item, index, contentList, updateContentList } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const [isShowLongPressHandle, setIsShowLongPressHandle] =
    useState<boolean>(false);

  return (
    <TouchableOpacity
      key={index}
      onLongPress={() => {
        setIsShowLongPressHandle(true);
      }}
      style={{ marginVertical: sw(12) }}
    >
      <Image
        source={{ uri: item?.imgBase64 }}
        style={styles.images}
        key={index}
      />
      {isShowLongPressHandle && (
        <RenderImageLongPressHandleView
          setIsShowLongPressHandle={setIsShowLongPressHandle}
          contentList={contentList}
          updateContentList={updateContentList}
          index={index}
        />
      )}
    </TouchableOpacity>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      borderRadius: sw(12),
      marginBottom: sw(12),
      flex: 1,
    },
    mainContainer: {
      flexDirection: 'row',
    },
    images: {
      width: '100%',
      height: sw(300),
      marginVertical: sw(12),
      borderRadius: sw(10),
    },
    longPressImageView: {
      flexDirection: 'row',
      width: sw(100),
      height: sw(40),
      alignSelf: 'flex-end',
      marginTop: sw(-60),
      marginRight: sw(20),
      backgroundColor: '#252525',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: sw(30),
      paddingHorizontal: sw(16),
    },
    longPressLineSeparator: {
      width: sw(2),
      height: sw(40),
      backgroundColor: '#424450',
    },
  });
};
