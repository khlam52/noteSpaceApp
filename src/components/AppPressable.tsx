import React, { useEffect, useState } from 'react';

import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const defaultHitSlopDimension = 60;

export default function AppPressable({
  style,
  children,
  onPress,
  hitOffset,
  hvDisabledStyle,
  ...props
}: any) {
  const [hitRectOffset, setHitRectOffset] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const insets = useSafeAreaInsets();
  const styles = getStyle({ insets, props });

  useEffect(() => {}, [hitRectOffset]);
  const onBtnPressed = () => {
    preventMultiTap(onPress);
  };

  let debounce: any;
  const preventMultiTap = (onPress: any) => {
    if (debounce) {
      return;
    }
    debounce = true;
    onPress();
    debounce = setTimeout(() => {
      debounce = false;
    }, 500);
  };

  let disableDelayPress = props.disableDelayPress
    ? props.disableDelayPress
    : false;

  return (
    <Pressable
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => {
        const widthOffset =
          defaultHitSlopDimension - width > 0
            ? (defaultHitSlopDimension - width) / 2
            : 0;
        const heightOffset =
          defaultHitSlopDimension - height > 0
            ? (defaultHitSlopDimension - height) / 2
            : 0;
        setHitRectOffset({
          top: heightOffset,
          bottom: heightOffset,
          left: widthOffset,
          right: widthOffset,
        });
      }}
      hitSlop={{
        top: hitRectOffset.top / 1.5,
        right: hitRectOffset.right / 1.5,
        bottom: hitRectOffset.bottom / 1.5,
        left: hitRectOffset.left / 1.5,
      }}
      pressRetentionOffset={{
        top: hitRectOffset.top,
        right: hitRectOffset.right,
        bottom: hitRectOffset.bottom,
        left: hitRectOffset.left,
      }}
      onPress={disableDelayPress ? onPress : onBtnPressed}
      style={({ pressed }) => {
        let extraStyle = null;
        if (style && typeof style === 'function') {
          extraStyle = style({ pressed });
        } else if (style && typeof style === 'object') {
          extraStyle = style;
        }
        return [
          pressed || hvDisabledStyle
            ? styles.btnDisabledStyle
            : styles.btnStyle,
          extraStyle,
        ];
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const getStyle = ({ insets, props }: any) => {
  return StyleSheet.create({
    btnStyle: {
      backgroundColor: 'transparent',
    },
    btnDisabledStyle: {
      opacity: props.setOpacity ? props.setOpacity : 0.3,
    },
  });
};
