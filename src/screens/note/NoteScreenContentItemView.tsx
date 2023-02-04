import React from 'react';
import { Image, StyleProp, StyleSheet, Text, View } from 'react-native';
import AppSquircleButtonView from '../../components/AppSquircleButtonView';
import { NOTE_CONTENT_TYPE } from '../../constants/Constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import {
  NoteContent,
  NoteImageContent,
  NoteItem,
  NoteTextContent,
} from './NoteModel';

interface NoteContentItemProps {
  contentList: NoteItem[];
  isLeftView: boolean;
}

export const NoteScreenContentItemView: React.FC<NoteContentItemProps> =
  props => {
    const { contentList, isLeftView } = props;
    const {
      themeSwitched: { settings: theme, name: themeName },
    } = useAppTheme();
    const styles = getStyle(theme, isLeftView);

    const getItemTextStyle: StyleProp<any> = (contentItem: NoteTextContent) => {
      return {
        color: '#FFF',
        fontStyle: contentItem.fontStyle,
        fontSize: contentItem.fontSize,
        fontWeight: contentItem.fontWeight,
        textDecorationLine: contentItem.textDecorationLine,
        textAlign: contentItem.align,
        paddingLeft: contentItem.paddingLeft,
        paddingRight: contentItem.paddingRight,
      };
    };

    const renderTextContent = (
      contentItem: NoteTextContent,
      contentIndex: number,
    ) => {
      return (
        <View key={contentIndex}>
          <Text style={getItemTextStyle(contentItem)} numberOfLines={3}>
            {contentItem.value}
          </Text>
        </View>
      );
    };

    const renderImageContent = (
      contentItem: NoteImageContent,
      contentIndex: number,
    ) => {
      return (
        <Image
          source={{ uri: contentItem?.imgBase64 }}
          style={styles.images}
          key={contentIndex}
        />
      );
    };

    return (
      <View style={styles.mainContainer}>
        {contentList.map((item: NoteItem) => {
          return (
            <AppSquircleButtonView
              key={item.uuid}
              style={styles.itemView}
              fillColor={'#2A2A32'}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.content.map(
                (contentItem: NoteContent, contentIndex: number) => {
                  if (contentIndex < 2) {
                    if (contentItem.type === NOTE_CONTENT_TYPE.TEXT) {
                      return renderTextContent(
                        contentItem as NoteTextContent,
                        contentIndex,
                      );
                    } else if (contentItem.type === NOTE_CONTENT_TYPE.IMAGE) {
                      return renderImageContent(
                        contentItem as NoteImageContent,
                        contentIndex,
                      );
                    }
                  }
                },
              )}
            </AppSquircleButtonView>
          );
        })}
      </View>
    );
  };

const getStyle = (theme: any, isLeftView: boolean) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      marginHorizontal: sw(6),
    },
    itemView: {
      paddingVertical: sw(12),
      paddingHorizontal: sw(12),
      marginBottom: sw(12),
      marginLeft: isLeftView ? sw(18) : 0,
      marginRight: !isLeftView ? sw(18) : 0,
      borderRadius: sw(12),
      shadowOpacity: 0.5,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
      shadowColor: '#000',
      elevation: 10,
    },
    itemTitle: {
      ...Typography.ts(theme.fonts.weight.bold, sw(20)),
      color: '#FFF',
      marginBottom: sw(8),
    },
    images: {
      width: sw(140),
      height: sw(80),
      marginTop: sw(12),
      borderRadius: sw(12),
    },
  });
};
