import React, { useEffect } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomEventEmitter from '../util/CustomEventEmitter';
import RootNavigation from './RootNavigation';
import { Route } from './Route';
import { MainStack } from './MainStack';
import { RootStackParams } from './type';

const commonModals = {};

const Stack = createStackNavigator<RootStackParams>();

export const RootStack: React.FC = () => {
  useEffect(() => {
    const setIsReadyRefFalse = () => {
      (RootNavigation.isReadyRef as React.MutableRefObject<boolean>).current =
        false;
    };
    return () => setIsReadyRefFalse();
  }, []);

  const onReady = () => {
    console.log('RootStack -> NavigationContainer -> onReady');
    (RootNavigation.isReadyRef as React.MutableRefObject<boolean>).current =
      true;
    RootNavigation.routeNameRef.current =
      RootNavigation.navigationRef.current.getCurrentRoute().name;
    CustomEventEmitter.emit(
      CustomEventEmitter.EVENT_NAVIGATION_CONTAINER_IS_READY,
    );
  };

  const screenOptions = ({ route }: any) => {
    return RootNavigation.getScreenOptions(route);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={DarkTheme}
        ref={RootNavigation.navigationRef}
        onStateChange={RootNavigation.onStateChange}
        onReady={onReady}
      >
        <Stack.Navigator
          initialRouteName={Route.MAIN_STACK}
          screenOptions={screenOptions}
        >
          {Object.entries({
            // Use the screens normally
            ...commonModals,
            // Use some screens conditionally based on some condition
          }).map(([name, component]: any, index) => {
            const keyIdn = name + '-' + index;
            return (
              <Stack.Screen
                key={keyIdn}
                name={name}
                component={component}
                options={{ headerShown: false, gestureEnabled: false }}
              />
            );
          })}
          <Stack.Screen
            name={Route.MAIN_STACK}
            component={MainStack}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
