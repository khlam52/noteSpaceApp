import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Tab1Screen } from '../screens/tab/Tab1Screen';
import { Tab2Screen } from '../screens/tab/Tab2Screen';
import { Tab3Screen } from '../screens/tab/Tab3Screen';
import { Route } from './Route';

const Tab = createBottomTabNavigator();

export const TabStack: React.FC = () => {
  const tab1Title = 'Tab 1';
  const tab2Title = 'Tab 2';
  const tab3Title = 'Tab 3';

  return (
    <Tab.Navigator
      initialRouteName={Route.TAB2_SCREEN}
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Route.TAB1_SCREEN}
        component={Tab1Screen}
        options={{
          tabBarLabel: tab1Title,
        }}
      />
      <Tab.Screen
        name={Route.TAB2_SCREEN}
        component={Tab2Screen}
        options={{
          tabBarLabel: tab2Title,
        }}
      />
      <Tab.Screen
        name={Route.TAB3_SCREEN}
        component={Tab3Screen}
        options={{
          tabBarLabel: tab3Title,
        }}
      />
    </Tab.Navigator>
  );
};
