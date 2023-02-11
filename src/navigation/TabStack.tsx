import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TaskScreen } from '../screens/tab/TaskScreen';
import { HomeScreen } from '../screens/tab/HomeScreen';
import { NoteScreen } from '../screens/tab/NoteScreen';
import { Route } from './Route';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

export const TabStack: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={Route.HOME_SCREEN}
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name={Route.TASK_SCREEN} component={TaskScreen} />
      <Tab.Screen name={Route.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={Route.NOTE_SCREEN} component={NoteScreen} />
    </Tab.Navigator>
  );
};
