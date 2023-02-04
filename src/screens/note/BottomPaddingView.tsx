import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { LeftPaddingIcon, RightPaddingIcon } from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import { FontPaddingItem, TextAlign } from './NoteModel';

interface Props {
  selectedAlignStyle: TextAlign;
  updateFontPadding: (padding: string) => void;
}

export const BottomPaddingView: React.FC<Props> = props => {
  const { selectedAlignStyle, updateFontPadding } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const paddingStylelist = [
    {
      title: 'right',
      icon: <LeftPaddingIcon />,
      style: sw(20),
    },
    {
      title: 'left',
      icon: <RightPaddingIcon />,
      style: sw(20),
    },
  ];

  const checkPaddingViewStyle: StyleProp<any> = (index: number) => {
    return {
      ...styles.alignStyleItem,
      backgroundColor: '#252525',
      borderTopLeftRadius: index === 0 ? sw(12) : null,
      borderBottomLeftRadius: index === 0 ? sw(12) : null,
      borderTopRightRadius:
        index === paddingStylelist.length - 1 ? sw(12) : null,
      borderBottomRightRadius:
        index === paddingStylelist.length - 1 ? sw(12) : null,
    };
  };

  return (
    <View style={styles.paddingStyleListView}>
      {paddingStylelist.map((item, index) => {
        return (
          <AppPressable
            key={item.title}
            onPress={() => {
              updateFontPadding(item.title);
            }}
            disables={selectedAlignStyle === 'center'}
            hvDisabledStyle={selectedAlignStyle === 'center'}
          >
            <View style={checkPaddingViewStyle(index)}>{item.icon}</View>
          </AppPressable>
        );
      })}
    </View>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    paddingStyleListView: {
      flexDirection: 'row',
    },
    alignStyleItem: {
      width: (SCREEN_WIDTH - 42) / 5,
      height: sw(60),
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: sw(2),
    },
  });
};
