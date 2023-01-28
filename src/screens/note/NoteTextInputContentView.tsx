import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import { NoteContent, NoteTextContent } from './NoteModel';

interface NoteImageItemProps {
  contentList: NoteContent[];
  updateContentList: (updatedList: NoteContent[]) => void;
  item: NoteTextContent;
  index: number;
}

export const NoteTextInputContentView: React.FC<NoteImageItemProps> = props => {
  const { item, index, contentList, updateContentList } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const onChangeContent = (val: string, index: number) => {
    let newNoteContentLayoutList = [...contentList];
    (newNoteContentLayoutList[index] as NoteTextContent).value = val;
    updateContentList(newNoteContentLayoutList);
  };

  return (
    <View>
      <TextInput
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace' && item.value === '') {
            let newNoteContentLayoutList = [...contentList];
            newNoteContentLayoutList.splice(index, 1);
            updateContentList(newNoteContentLayoutList);
          }
        }}
        key={index}
        value={item.value}
        onChangeText={val => {
          onChangeContent(val, index);
        }}
        // style={getItemFontFormat(item, index)}
        multiline={true}
        placeholder={'Add text'}
        placeholderTextColor={'#B6B6B6'}
        // onBlur={() => {
        //   setIsShowFontIcon(false);
        // }}
        // onFocus={() => {
        //   setIsShowFontIcon(true);
        //   setEditingTextIndex(index);
        // }}
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
