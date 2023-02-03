import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { LeftPaddingIcon, RightPaddingIcon } from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import { FontPaddingItem } from './NoteModel';

interface Props {
  selectedAlignStyle: string;
  selectedPaddingRight: number;
  setSelectedPaddingRight: (padding: number) => void;
  selectedPaddingLeft: number;
  setSelectedPaddingLeft: (padding: number) => void;
}

export const BottomPaddingView: React.FC<Props> = props => {
  const {
    selectedAlignStyle,
    selectedPaddingRight,
    setSelectedPaddingRight,
    selectedPaddingLeft,
    setSelectedPaddingLeft,
  } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const paddingStylelist = [
    {
      title: 'right',
      icon: <RightPaddingIcon />,
      style: sw(20),
    },
    {
      title: 'left',
      icon: <LeftPaddingIcon />,
      style: sw(20),
    },
  ];

  const checkPaddingViewStyle: StyleProp<any> = (
    item: FontPaddingItem,
    index: number,
  ) => {
    return {
      ...styles.alignStyleItem,
      backgroundColor:
        selectedAlignStyle === item.title ? '#424450' : '#252525',
      borderTopLeftRadius: index === 0 ? sw(12) : null,
      borderBottomLeftRadius: index === 0 ? sw(12) : null,
      borderTopRightRadius:
        index === paddingStylelist.length - 1 ? sw(12) : null,
      borderBottomRightRadius:
        index === paddingStylelist.length - 1 ? sw(12) : null,
    };
  };

  const updatePaddingStyleSelection = (title: string) => {
    if (title === 'right' && selectedAlignStyle === 'right') {
      setSelectedPaddingRight(selectedPaddingRight + 20);
    } else if (title === 'left' && selectedAlignStyle === 'right') {
      setSelectedPaddingRight(selectedPaddingRight - 20);
    } else if (title === 'left' && selectedAlignStyle === 'left') {
      setSelectedPaddingLeft(selectedPaddingLeft + 20);
    } else if (title === 'right' && selectedAlignStyle === 'left') {
      setSelectedPaddingLeft(selectedPaddingLeft - 20);
    }
  };

  return (
    <View style={styles.paddingStyleListView}>
      {paddingStylelist.map((item, index) => {
        return (
          <AppPressable
            key={item.title}
            onPress={() => {
              updatePaddingStyleSelection(item.title);
            }}
          >
            <View style={checkPaddingViewStyle(item, index)}>{item.icon}</View>
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
