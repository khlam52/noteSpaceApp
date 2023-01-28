import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TaskScreen } from '../screens/tab/TaskScreen';
import { HomeScreen } from '../screens/tab/HomeScreen';
import { NoteScreen } from '../screens/tab/NoteScreen';
import { Route } from './Route';

const Tab = createBottomTabNavigator();

export const TabStack: React.FC = () => {
  const tab1Title = 'Tab 1';
  const tab2Title = 'Tab 2';
  const tab3Title = 'Tab 3';

  return (
    <Tab.Navigator
      initialRouteName={Route.HOME_SCREEN}
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Route.TASK_SCREEN}
        component={TaskScreen}
        options={{
          tabBarLabel: tab1Title,
        }}
      />
      <Tab.Screen
        name={Route.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: tab2Title,
        }}
      />
      <Tab.Screen
        name={Route.NOTE_SCREEN}
        component={NoteScreen}
        options={{
          tabBarLabel: tab3Title,
        }}
      />
    </Tab.Navigator>
  );
};
