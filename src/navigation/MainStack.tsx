import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
import { MainStackParams } from './type';
import { Route } from './Route';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { TabStack } from './TabStack';
import { Tab1Screen } from '../screens/tab/Tab1Screen';
import { Tab2Screen } from '../screens/tab/Tab2Screen';
import { Tab3Screen } from '../screens/tab/Tab3Screen';

const Stack = createStackNavigator<MainStackParams>();

const authScreens: any = {};
authScreens[Route.TAB_STACK] = TabStack;
authScreens[Route.TAB1_SCREEN] = Tab1Screen;
authScreens[Route.TAB2_SCREEN] = Tab2Screen;
authScreens[Route.TAB3_SCREEN] = Tab3Screen;
authScreens[Route.LOGIN_SCREEN] = LoginScreen;
authScreens[Route.SIGN_UP_SCREEN] = SignUpScreen;

export const MainStack = () => (
  <Stack.Navigator
    initialRouteName={Route.TAB_STACK}
    screenOptions={{ headerShown: false }}
  >
    {Object.entries({
      ...authScreens,
    }).map(([name, component]: any, index: number) => {
      console.log('name:', name, component, index);
      const keyIdn = name + '-' + index;
      return (
        <Stack.Screen
          key={keyIdn}
          name={name}
          component={component}
          // options={{ headerTitle: 'Button Demo' }}
        />
      );
    })}
  </Stack.Navigator>
);
