import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, View } from 'react-native';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import { FontFormatStyle, FontStyleItem } from './NoteModel';

interface Props {
  selectedFontStyle: string;
  setSelectedFontStyle: (size: string) => void;
}

export const BottomFontStyleView: React.FC<Props> = props => {
  const { selectedFontStyle, setSelectedFontStyle } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const [isSelectedBold, setIsSelectedBold] = useState(
    selectedFontStyle === 'B' ?? false,
  );
  const [isSelectedItalic, setIsSelectedItalic] = useState(
    selectedFontStyle === 'I' ?? false,
  );
  const [isSelectedUnderline, setIsSelectedUnderline] = useState(
    selectedFontStyle === 'U' ?? false,
  );
  const [isSelectedLineThrough, setIsSelectedLineThrough] = useState(
    selectedFontStyle === 'S' ?? false,
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

  const updateFontStyleSeletion = (title: string) => {
    if (title === 'B') {
      setIsSelectedBold(!isSelectedBold);
    }
    if (title === 'I') {
      setIsSelectedItalic(!isSelectedItalic);
    }
    if (title === 'U') {
      setIsSelectedUnderline(!isSelectedUnderline);
    }
    if (title === 'S') {
      setIsSelectedLineThrough(!isSelectedLineThrough);
    }
  };

  const checkFontStyleViewStyle: StyleProp<any> = (
    item: FontStyleItem,
    index: number,
  ) => {
    return {
      ...styles.fontStyleItem,
      backgroundColor:
        (isSelectedBold && item.title === 'B') ||
        (isSelectedItalic && item.title === 'I') ||
        (isSelectedUnderline && item.title === 'U') ||
        (isSelectedLineThrough && item.title === 'S')
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
              updateFontStyleSeletion(item.title);
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
