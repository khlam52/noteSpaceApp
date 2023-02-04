import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  TouchableOpacity,
  useBottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useAppTheme } from '../../hooks/useAppTheme';
import { sw } from '../../styles/Mixins';
import { BottomAlignView } from './BottomAlignView';
import { BottomFontSizeView } from './BottomFontSizeView';
import { BottomFontStyleView } from './BottomFontStyleView';
import { BottomPaddingView } from './BottomPaddingView';
import {
  FontSizeItem,
  FontStyleItem,
  NoteContent,
  NoteTextContent,
  TextAlign,
} from './NoteModel';

const CustomBackdrop: React.FC<BottomSheetBackdropProps> = props => {
  const { animatedIndex, style } = props;
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolate.CLAMP,
    ),
  }));
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#00000090',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={useBottomSheetModal().dismissAll}
      />
    </Animated.View>
  );
};

interface Props {
  editingTextIndex: number;
  contentLayoutList: NoteContent[];
  updateContentLayoutList: (list: NoteContent[]) => void;
}

export const BottomFontFormatModalView = React.forwardRef<
  BottomSheetModal,
  Props
>((props, ref) => {
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();
  const styles = getStyle(theme);
  const snapPoints = useMemo(() => ['40%'], []);

  const { editingTextIndex, contentLayoutList, updateContentLayoutList } =
    props;

  const updateFontSize = (sizeItem: FontSizeItem) => {
    if (contentLayoutList) {
      let newContentLayoutList = [...contentLayoutList];
      let edittingContent = newContentLayoutList[
        editingTextIndex
      ] as NoteTextContent;
      edittingContent.fontSizeOption = sizeItem.option;
      edittingContent.fontSize = sizeItem.size;
      edittingContent.fontWeight = sizeItem.weight;
      updateContentLayoutList(newContentLayoutList);
    }
  };

  const updateFontStyle = (
    styleItem: FontStyleItem,
    b: boolean, // bold
    i: boolean, // italic
    u: boolean, // underline
    s: boolean, // line-through
  ) => {
    if (contentLayoutList) {
      let newContentLayoutList = [...contentLayoutList];
      let edittingContent = newContentLayoutList[
        editingTextIndex
      ] as NoteTextContent;

      // Bold
      if (b) {
        edittingContent.fontWeight = '900';
      } else if (edittingContent.fontSizeOption === 'H') {
        edittingContent.fontWeight = '600';
      } else if (edittingContent.fontSizeOption === 'S') {
        edittingContent.fontWeight = '400';
      } else {
        edittingContent.fontWeight = '300';
      }

      // Italic
      if (i) {
        edittingContent.fontStyle = 'italic';
      } else {
        edittingContent.fontStyle = 'normal';
      }

      // Line
      if (u && s) {
        edittingContent.textDecorationLine = 'underline line-through';
      } else if (u) {
        edittingContent.textDecorationLine = 'underline';
      } else if (s) {
        edittingContent.textDecorationLine = 'line-through';
      } else {
        edittingContent.textDecorationLine = 'none';
      }
      updateContentLayoutList(newContentLayoutList);
    }
  };

  const updateFontAlign = (align: TextAlign) => {
    if (contentLayoutList) {
      let newContentLayoutList = [...contentLayoutList];
      let edittingContent = newContentLayoutList[
        editingTextIndex
      ] as NoteTextContent;
      edittingContent.align = align;
      edittingContent.paddingLeft = 0;
      edittingContent.paddingRight = 0;
      updateContentLayoutList(newContentLayoutList);
    }
  };

  const updateFontPadding = (padding: string) => {
    if (contentLayoutList) {
      let newContentLayoutList = [...contentLayoutList];
      let edittingContent = newContentLayoutList[
        editingTextIndex
      ] as NoteTextContent;

      if (padding === 'right') {
        edittingContent.paddingRight = edittingContent.paddingRight + sw(20);
        edittingContent.paddingLeft = edittingContent.paddingLeft - sw(20);
      } else {
        edittingContent.paddingLeft = edittingContent.paddingLeft + sw(20);
        edittingContent.paddingRight = edittingContent.paddingRight - sw(20);
      }
      updateContentLayoutList(newContentLayoutList);
    }
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        backdropComponent={CustomBackdrop}
        handleHeight={sw(40)}
        style={styles.modal}
        handleIndicatorStyle={styles.modalIndicator}
        handleStyle={styles.handleStyle}
        backgroundStyle={{ backgroundColor: '#161616' }}
      >
        <View style={styles.container}>
          <BottomFontSizeView
            selectedFontSize={
              (contentLayoutList[editingTextIndex] as NoteTextContent)
                ?.fontSizeOption ?? 'B'
            }
            updateFontSize={updateFontSize}
          />
          <BottomFontStyleView
            contentLayoutItem={
              contentLayoutList[editingTextIndex] as NoteTextContent
            }
            updateFontStyle={updateFontStyle}
          />
          <View style={styles.alignAndPaddingView}>
            <BottomAlignView
              selectedAlignStyle={
                (contentLayoutList[editingTextIndex] as NoteTextContent)
                  ?.align ?? 'left'
              }
              updateFontAlign={updateFontAlign}
            />
            <BottomPaddingView
              selectedAlignStyle={
                (contentLayoutList[editingTextIndex] as NoteTextContent)
                  ?.align ?? 'left'
              }
              updateFontPadding={updateFontPadding}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const getStyle = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#161616',
      paddingTop: sw(24),
    },
    modal: {
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 2,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      elevation: 2,
    },
    modalIndicator: {
      backgroundColor: '#FFF',
    },
    handleStyle: {
      backgroundColor: '#161616',
      borderTopLeftRadius: sw(12),
      borderTopRightRadius: sw(12),
    },
    alignAndPaddingView: {
      flexDirection: 'row',
      paddingHorizontal: sw(12),
    },
  });
};
