import React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import NoteHelper from '../../util/NoteHelper';
import { NoteContent, NoteTextContent } from './NoteModel';

interface NoteImageItemProps {
  contentList: NoteContent[];
  updateContentList: (updatedList: NoteContent[]) => void;
  item: NoteTextContent;
  index: number;
  setIsShowFontIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingTextIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const NoteTextInputContentView: React.FC<NoteImageItemProps> = props => {
  const {
    item,
    index,
    contentList,
    updateContentList,
    setIsShowFontIcon,
    setEditingTextIndex,
  } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const onKeyPress = ({
    nativeEvent,
  }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (nativeEvent.key === 'Backspace' && item.value === '') {
      NoteHelper.onBackspaceTextInputHandle(
        contentList,
        updateContentList,
        index,
      );
    }
  };

  const onChangeTextInputContent = (val: string) => {
    NoteHelper.onChangeTextInputContent(
      val,
      contentList,
      updateContentList,
      index,
    );
  };

  const onBlur = () => {
    setIsShowFontIcon(false);
  };

  const onFocus = () => {
    setIsShowFontIcon(true);
    setEditingTextIndex(index);
  };

  const getItemFontFormat: StyleProp<any> = (item: NoteTextContent) => {
    return {
      color: '#FFF',
      fontStyle: item.fontStyle,
      fontSize: item.fontSize,
      fontWeight: item.fontWeight,
      textDecorationLine: item.textDecorationLine,
      textAlign: item.align,
      paddingLeft: item.paddingLeft,
      paddingRight: item.paddginRight,
    };
  };

  return (
    <View>
      <TextInput
        onKeyPress={onKeyPress}
        key={index}
        value={item.value}
        onChangeText={onChangeTextInputContent}
        style={getItemFontFormat(item)}
        multiline={true}
        placeholder={'Add text'}
        placeholderTextColor={'#B6B6B6'}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </View>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      borderRadius: sw(12),
      marginBottom: sw(12),
      flex: 1,
    },
  });
};
