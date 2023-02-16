import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { MainStackParams } from './type';
import { Route } from './Route';
import { TabStack } from './TabStack';
import { TaskScreen } from '../screens/tab/TaskScreen';
import { HomeScreen } from '../screens/tab/HomeScreen';
import { NoteScreen } from '../screens/tab/NoteScreen';
import { TaskCreateAndEditScreen } from '../screens/task/TaskCreateAndEditScreen';
import { NoteCreateAndEditScreen } from '../screens/note/NoteCreateAndEditScreen';
import { SplashScreen } from '../screens/launch/SplashScreen';

const Stack = createStackNavigator<MainStackParams>();

const commonScreens: any = {};
commonScreens[Route.TAB_STACK] = TabStack;
commonScreens[Route.TASK_SCREEN] = TaskScreen;
commonScreens[Route.HOME_SCREEN] = HomeScreen;
commonScreens[Route.NOTE_SCREEN] = NoteScreen;
commonScreens[Route.TASK_CREATE_AND_EDIT_SCREEN] = TaskCreateAndEditScreen;
commonScreens[Route.NOTE_CREATE_AND_EDIT_SCREEN] = NoteCreateAndEditScreen;

const launchScreen: any = {};
launchScreen[Route.SPLASH_SCREEN] = SplashScreen;

const forFade = ({ current }: any) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const getScreenCardStyleInterpolator = (name: Route) => {
  switch (name) {
    case Route.SPLASH_SCREEN:
    case Route.TAB_STACK:
      return forFade;
    default:
      return CardStyleInterpolators.forHorizontalIOS;
  }
};

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Route.SPLASH_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      {Object.entries({
        ...launchScreen,
        ...commonScreens,
      }).map(([name, component]: any, index: number) => {
        const keyIdn = name + '-' + index;
        return (
          <Stack.Screen
            key={keyIdn}
            name={name}
            component={component}
            options={{
              cardStyleInterpolator: getScreenCardStyleInterpolator(name),
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};
