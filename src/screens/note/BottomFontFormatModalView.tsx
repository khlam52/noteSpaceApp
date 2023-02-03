import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  TouchableOpacity,
  useBottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { useMemo, useState } from 'react';
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

interface Props {}

export const BottomFontFormatModalView = React.forwardRef<BottomSheetModal>(
  (props, ref) => {
    const {
      themeSwitched: { settings: theme, name: themeName },
    } = useAppTheme();
    const styles = getStyle(theme);
    const snapPoints = useMemo(() => ['40%'], []);

    const [selectedFontSize, setSelectedFontSize] = useState('T');
    const [selectedFontStyle, setSelectedFontStyle] = useState('Normal');
    const [selectedAlignStyle, setSeletedAlignStyle] = useState('left');
    const [selectedPaddingRight, setSelectedPaddingRight] = useState(sw(0));
    const [selectedPaddingLeft, setSelectedPaddingLeft] = useState(sw(0));

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
              selectedFontSize={selectedFontSize}
              setSelectedFontSize={setSelectedFontSize}
            />
            <BottomFontStyleView
              selectedFontStyle={selectedFontStyle}
              setSelectedFontStyle={setSelectedFontStyle}
            />
            <View style={styles.alignAndPaddingView}>
              <BottomAlignView
                selectedAlignStyle={selectedAlignStyle}
                setSeletedAlignStyle={setSeletedAlignStyle}
              />
              <BottomPaddingView
                selectedAlignStyle={selectedAlignStyle}
                selectedPaddingRight={selectedPaddingRight}
                setSelectedPaddingRight={setSelectedPaddingRight}
                selectedPaddingLeft={selectedPaddingLeft}
                setSelectedPaddingLeft={setSelectedPaddingLeft}
              />
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

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
