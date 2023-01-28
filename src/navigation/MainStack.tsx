import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
import { MainStackParams } from './type';
import { Route } from './Route';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { TabStack } from './TabStack';
import { TaskScreen } from '../screens/tab/TaskScreen';
import { HomeScreen } from '../screens/tab/HomeScreen';
import { NoteScreen } from '../screens/tab/NoteScreen';
import { TaskCreateAndEditScreen } from '../screens/task/TaskCreateAndEditScreen';
import { NoteCreateAndEditScreen } from '../screens/note/NoteCreateAndEditScreen';

const Stack = createStackNavigator<MainStackParams>();

const authScreens: any = {};
authScreens[Route.TAB_STACK] = TabStack;
authScreens[Route.TASK_SCREEN] = TaskScreen;
authScreens[Route.HOME_SCREEN] = HomeScreen;
authScreens[Route.NOTE_SCREEN] = NoteScreen;
authScreens[Route.TASK_CREATE_AND_EDIT_SCREEN] = TaskCreateAndEditScreen;
authScreens[Route.NOTE_CREATE_AND_EDIT_SCREEN] = NoteCreateAndEditScreen;
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
      // console.log('name:', name);
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
