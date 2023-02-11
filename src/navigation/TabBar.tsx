import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavNoteIcon, NavTaskIcon, PlusIcon } from '../assets/images';
import AppSquircleButtonView from '../components/AppSquircleButtonView';
import { useAppTheme } from '../hooks/useAppTheme';
import { sw } from '../styles/Mixins';
import { Route } from './Route';

export default function TabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const {
    themeSwitched: { settings: theme, name: themeName },
  } = useAppTheme();

  const styles = getStyle(insets, theme);

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const getTabBarIcon = (focused: boolean, route: any) => {
    let icon;
    switch (route) {
      case Route.TASK_SCREEN:
        icon = <NavTaskIcon fill={focused ? '#FFF' : '#CCCCCC'} />;
        break;
      case Route.HOME_SCREEN:
        icon = (
          <PlusIcon
            fill={focused ? '#FFF' : '#CCCCCC'}
            width={sw(35)}
            height={sw(35)}
          />
        );
        break;
      case Route.NOTE_SCREEN:
        icon = <NavNoteIcon fill={focused ? '#FFF' : '#CCCCCC'} />;
        break;
      default:
        break;
    }

    return <View style={{ alignSelf: 'center' }}>{icon}</View>;
  };

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={route.name}>
            <TouchableWithoutFeedback
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <AppSquircleButtonView
                style={styles.tabItemContainer}
                fillColor={isFocused ? '#3B3B3D' : 'transparent'}
              >
                {getTabBarIcon(isFocused, route.name)}
              </AppSquircleButtonView>
            </TouchableWithoutFeedback>
          </View>
        );
      })}
    </View>
  );
}

const getStyle = (insets: any, theme: any) => {
  return StyleSheet.create({
    tabBarContainer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      backgroundColor: '#252525',
      paddingHorizontal: sw(36),
      justifyContent: 'space-between',
      height:
        insets.bottom > 0
          ? insets.bottom + sw(60)
          : sw(theme.spacings.s2) + sw(60),
      shadowOpacity: 0.1,
      shadowRadius: 4.0,
      paddingTop: sw(12),
      paddingBottom: insets.bottom > 0 ? insets.bottom : sw(theme.spacings.s2),
      borderTopRightRadius: sw(12),
      borderTopLeftRadius: sw(12),
    },
    tabItemContainer: {
      width: sw(60),
      height: sw(60),
      borderRadius: sw(12),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
