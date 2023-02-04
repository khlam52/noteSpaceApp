import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { StyleProp, StyleSheet, Text, View } from 'react-native';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import { FontFormatStyle, FontStyleItem, NoteTextContent } from './NoteModel';

interface Props {
  contentLayoutItem: NoteTextContent;
  updateFontStyle: (
    styleItem: FontStyleItem,
    b: boolean,
    i: boolean,
    u: boolean,
    s: boolean,
  ) => void;
}

export const BottomFontStyleView: React.FC<Props> = props => {
  const { contentLayoutItem, updateFontStyle } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const isSelectedBoldRef = useRef<boolean>(
    contentLayoutItem?.fontWeight === '900' ?? false,
  );
  const isSelectedItalicRef = useRef<boolean>(
    contentLayoutItem?.fontStyle === 'italic' ?? false,
  );
  const isSelectedUnderlineRef = useRef<boolean>(
    String(contentLayoutItem?.textDecorationLine).includes('underline') ??
      false,
  );
  const isSelectedLineThroughRef = useRef<boolean>(
    String(contentLayoutItem?.textDecorationLine).includes('line-through') ??
      false,
  );

  const fontStyleList = [
    {
      title: 'B',
      style: 'bold',
    },
    {
      title: 'I',
      style: 'italic',
    },
    {
      title: 'U',
      style: 'underline',
    },
    {
      title: 'S',
      style: 'line-through',
    },
  ];

  const updateFontStyleSeletion = (item: FontStyleItem) => {
    if (item.title === 'B') {
      isSelectedBoldRef.current = !isSelectedBoldRef.current;
    }
    if (item.title === 'I') {
      isSelectedItalicRef.current = !isSelectedItalicRef.current;
    }
    if (item.title === 'U') {
      isSelectedUnderlineRef.current = !isSelectedUnderlineRef.current;
    }
    if (item.title === 'S') {
      isSelectedLineThroughRef.current = !isSelectedLineThroughRef.current;
    }
    updateFontStyle(
      item,
      isSelectedBoldRef.current,
      isSelectedItalicRef.current,
      isSelectedUnderlineRef.current,
      isSelectedLineThroughRef.current,
    );
  };

  const checkFontStyleViewStyle: StyleProp<any> = (
    item: FontStyleItem,
    index: number,
  ) => {
    return {
      ...styles.fontStyleItem,
      backgroundColor:
        (isSelectedBoldRef.current && item.title === 'B') ||
        (isSelectedItalicRef.current && item.title === 'I') ||
        (isSelectedUnderlineRef.current && item.title === 'U') ||
        (isSelectedLineThroughRef.current && item.title === 'S')
          ? '#424450'
          : '#252525',
      borderTopLeftRadius: index === 0 ? sw(12) : null,
      borderBottomLeftRadius: index === 0 ? sw(12) : null,
      borderTopRightRadius: index === fontStyleList.length - 1 ? sw(12) : null,
      borderBottomRightRadius:
        index === fontStyleList.length - 1 ? sw(12) : null,
    };
  };

  const fontStyleStyle: StyleProp<any> = (title: string, style: string) => {
    return {
      color: '#FFF',
      fontStyle: title === 'I' ? style : 'normal',
      fontSize: sw(32),
      fontWeight: title === 'B' ? style : '400',
      textDecorationLine: title === 'U' ? style : title === 'S' ? style : null,
    };
  };

  return (
    <View style={styles.fontStyleListView}>
      {fontStyleList.map((item, index) => {
        return (
          <AppPressable
            key={item.title}
            onPress={() => {
              updateFontStyleSeletion(item);
            }}
          >
            <View style={checkFontStyleViewStyle(item, index)}>
              <Text style={fontStyleStyle(item.title, item.style)}>
                {item.title}
              </Text>
            </View>
          </AppPressable>
        );
      })}
    </View>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    fontStyleListView: {
      flexDirection: 'row',
      marginBottom: sw(24),
      paddingHorizontal: sw(12),
    },
    fontStyleItem: {
      width: (SCREEN_WIDTH - 30) / 4,
      height: sw(60),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: sw(2),
    },
  });
};
