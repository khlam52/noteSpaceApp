import React from 'react';

import { StyleSheet } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';

AppSquircleButtonView.defaultProps = {
  style: {},
  cornerRadius: 12,
  fillColor: 'transaprent',
};
export default function AppSquircleButtonView({
  style,
  cornerRadius,
  fillColor,
  children,
  ...props
}: any) {
  return (
    <SquircleView
      style={style}
      squircleParams={{
        cornerSmoothing: 1,
        cornerRadius: cornerRadius,
        fillColor: fillColor,
      }}
      {...props}
    >
      {children}
    </SquircleView>
  );
}

const getStyle = ({ insets, props }: any) => {
  return StyleSheet.create({});
};
