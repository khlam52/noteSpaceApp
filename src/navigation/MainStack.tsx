import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MainStackParams } from './type';
import { Route } from './Route';
import { TabStack } from './TabStack';
import { TaskScreen } from '../screens/tab/TaskScreen';
import { HomeScreen } from '../screens/tab/HomeScreen';
import { NoteScreen } from '../screens/tab/NoteScreen';
import { TaskCreateAndEditScreen } from '../screens/task/TaskCreateAndEditScreen';
import { NoteCreateAndEditScreen } from '../screens/note/NoteCreateAndEditScreen';

const Stack = createStackNavigator<MainStackParams>();

const commonScreens: any = {};
commonScreens[Route.TAB_STACK] = TabStack;
commonScreens[Route.TASK_SCREEN] = TaskScreen;
commonScreens[Route.HOME_SCREEN] = HomeScreen;
commonScreens[Route.NOTE_SCREEN] = NoteScreen;
commonScreens[Route.TASK_CREATE_AND_EDIT_SCREEN] = TaskCreateAndEditScreen;
commonScreens[Route.NOTE_CREATE_AND_EDIT_SCREEN] = NoteCreateAndEditScreen;

export const MainStack = () => (
  <Stack.Navigator
    initialRouteName={Route.TAB_STACK}
    screenOptions={{ headerShown: false }}
  >
    {Object.entries({
      ...commonScreens,
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
