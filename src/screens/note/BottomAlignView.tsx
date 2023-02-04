import React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import {
  CenterAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
} from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { SCREEN_WIDTH, sw } from '../../styles/Mixins';
import { FontAlignItem, TextAlign } from './NoteModel';

interface Props {
  selectedAlignStyle: TextAlign;
  updateFontAlign: (align: TextAlign) => void;
}

export const BottomAlignView: React.FC<Props> = props => {
  const { selectedAlignStyle, updateFontAlign } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const alignStylelist = [
    {
      icon: <LeftAlignIcon />,
      style: 'left' as TextAlign,
    },
    {
      icon: <CenterAlignIcon />,
      style: 'center' as TextAlign,
    },
    {
      icon: <RightAlignIcon />,
      style: 'right' as TextAlign,
    },
  ];

  const checkAlignViewStyle: StyleProp<any> = (
    item: FontAlignItem,
    index: number,
  ) => {
    return {
      ...styles.alignStyleItem,
      backgroundColor:
        selectedAlignStyle === item.style ? '#424450' : '#252525',
      borderTopLeftRadius: index === 0 ? sw(12) : null,
      borderBottomLeftRadius: index === 0 ? sw(12) : null,
      borderTopRightRadius: index === alignStylelist.length - 1 ? sw(12) : null,
      borderBottomRightRadius:
        index === alignStylelist.length - 1 ? sw(12) : null,
    };
  };

  return (
    <View style={styles.alignStyleListView}>
      {alignStylelist.map((item, index) => {
        return (
          <AppPressable
            key={item.style}
            onPress={() => {
              updateFontAlign(item.style);
            }}
          >
            <View style={checkAlignViewStyle(item, index)}>{item.icon}</View>
          </AppPressable>
        );
      })}
    </View>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    alignStyleListView: {
      flexDirection: 'row',
      marginRight: sw(12),
    },
    alignStyleItem: {
      width: (SCREEN_WIDTH - 48) / 5,
      height: sw(60),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: sw(2),
    },
  });
};
