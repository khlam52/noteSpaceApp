import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppPressable from '../../components/AppPressable';
import AppSquircleButtonView from '../../components/AppSquircleButtonView';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import { FontSizeItem } from './NoteModel';

interface Props {
  selectedFontSize: string;
  updateFontSize: (sizeItem: FontSizeItem) => void;
}

export const BottomFontSizeView: React.FC<Props> = props => {
  const { selectedFontSize, updateFontSize } = props;
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);

  const fontSizeList = [
    {
      option: 'T',
      title: 'Title',
      size: sw(28),
      style: theme.fonts.weight.bold,
      weight: '900',
    },
    {
      option: 'H',
      title: 'Heading',
      size: sw(24),
      style: theme.fonts.weight.bold,
      weight: '600',
    },
    {
      option: 'S',
      title: 'Subheading',
      size: sw(18),
      style: theme.fonts.weight.regular,
      weight: '400',
    },
    {
      option: 'B',
      title: 'Body',
      size: sw(16),
      style: theme.fonts.weight.light,
      weight: '300',
    },
  ];

  const checkfontSizeViewStyle = (item: FontSizeItem): StyleProp<any> => {
    return {
      ...styles.fontSizeItem,
      backgroundColor: selectedFontSize === item.option ? '#424450' : null,
      borderRadius: selectedFontSize === item.option ? sw(12) : null,
    };
  };

  const fontSizeStyle = (style: any, size: number) => {
    return {
      ...Typography.ts(style, size),
      color: '#FFF',
    };
  };

  const renderItem: ListRenderItem<FontSizeItem> = ({ item }) => {
    return (
      <View key={item.option}>
        <AppSquircleButtonView
          fillColor={selectedFontSize === item.option ? '#424450' : null}
        >
          <AppPressable
            style={checkfontSizeViewStyle(item)}
            onPress={() => {
              updateFontSize(item);
            }}
          >
            <Text style={fontSizeStyle(item.style, item.size)}>
              {item.title}
            </Text>
          </AppPressable>
        </AppSquircleButtonView>
      </View>
    );
  };

  const renderFooter = () => {
    return <View style={styles.paddingView} />;
  };

  return (
    <View>
      <FlatList
        data={fontSizeList}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: FontSizeItem) => item.option}
        style={styles.fontSizeListView}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const getStyle = (theme: any) => {
  return StyleSheet.create({
    fontSizeListView: {
      paddingHorizontal: sw(12),
      marginBottom: sw(24),
    },
    fontSizeItem: {
      paddingHorizontal: sw(12),
      height: sw(60),
      justifyContent: 'center',
    },
    paddingView: {
      paddingRight: sw(28),
    },
  });
};
