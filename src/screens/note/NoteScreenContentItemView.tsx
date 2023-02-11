import _ from 'lodash';
import React from 'react';
import { Image, StyleProp, StyleSheet, Text, View } from 'react-native';
import { TickIcon, UnTickIcon } from '../../assets/images';
import AppPressable from '../../components/AppPressable';
import AppSquircleButtonView from '../../components/AppSquircleButtonView';
import { NOTE_CONTENT_TYPE } from '../../constants/Constants';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Typography } from '../../styles';
import { sw } from '../../styles/Mixins';
import NoteHelper from '../../util/NoteHelper';
import {
  NoteContent,
  NoteImageContent,
  NoteItem,
  NoteSelectItem,
  NoteTextContent,
} from './NoteModel';

interface NoteContentItemProps {
  contentList: NoteItem[];
  isLeftView: boolean;
  onNoteItemPress: (noteItem: NoteItem) => void;
  isItemLongPressed: boolean;
  setIsItemLongPressed: React.Dispatch<React.SetStateAction<boolean>>;
  selectedList: NoteSelectItem[];
  setSelectedList: React.Dispatch<React.SetStateAction<NoteSelectItem[]>>;
}

export const NoteScreenContentItemView: React.FC<NoteContentItemProps> =
  props => {
    const {
      contentList,
      isLeftView,
      onNoteItemPress,
      isItemLongPressed,
      setIsItemLongPressed,
      selectedList,
      setSelectedList,
    } = props;
    const {
      themeSwitched: { settings: theme, name: themeName },
    } = useAppTheme();
    const styles = getStyle(theme, isLeftView);

    const onPress_ = (noteItem: NoteItem) => {
      onNoteItemPress(noteItem);
    };

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

    const renderNoteItemSelectView = (item: NoteItem) => {
      return (
        <View>
          <AppPressable
            onPress={() => {
              NoteHelper.onNoteItemSelectedFunc(
                item,
                selectedList,
                setSelectedList,
              );
            }}
          >
            {selectedList.length !== 0 &&
            selectedList[
              _.findIndex(selectedList, {
                uuid: item.uuid,
              })
            ].isSelected ? (
              <TickIcon fill={'#FFEAA1'} width={sw(25)} height={sw(25)} />
            ) : (
              <UnTickIcon
                stroke={'#FFEAA1'}
                fill={'#2A2A32'}
                width={sw(25)}
                height={sw(25)}
              />
            )}
          </AppPressable>
        </View>
      );
    };

    return (
      <View style={styles.mainContainer}>
        {contentList.map((item: NoteItem, index: number) => {
          return (
            <AppSquircleButtonView
              key={item.uuid}
              style={styles.itemView}
              fillColor={'#2A2A32'}
            >
              <AppPressable
                onPress={() => {
                  onPress_(item);
                }}
                onLongPress={() => {
                  setIsItemLongPressed(true);
                }}
                disabled={isItemLongPressed}
                hvDisabledStyle={isItemLongPressed}
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
              </AppPressable>
              {isItemLongPressed && (
                <View style={styles.longPressCircleView}>
                  {renderNoteItemSelectView(item)}
                </View>
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
    longPressCircleView: {
      position: 'absolute',
      right: 0,
      marginRight: sw(12),
      marginTop: sw(12),
    },
  });
};
