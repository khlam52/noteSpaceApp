import * as React from 'react';

import { StackActions, CommonActions } from '@react-navigation/native';

const isReadyRef: React.RefObject<any> = React.createRef<string | null>();
const navigationRef: React.RefObject<any> = React.createRef<string | null>();
const routeNameRef: any = React.createRef<string | null>();
let previousRouteName: string | unknown = '';
let currentRouteName: string | unknown = '';

const getScreenOptions = (route: any): any => {
  // console.log('RootNavigation -> getScreenOptions -> route:', route);

  let defaultOption = {
    cardStyle: { backgroundColor: 'transparent' },
    cardOverlayEnabled: true,
    animationEnabled: false,
    transparentCard: true,
    gestureEnabled: false,
    presentation: 'transparentModal',
  };

  let modalOption = {
    ...defaultOption,
    cardStyleInterpolator: ({ current: { progress } }: any) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: [0, 0.25, 0.7, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.6],
          extrapolate: 'clamp',
        }),
      },
    }),
  };

  const routeName = route.name;

  return defaultOption;
  //   switch (routeName) {
  //     // case Route.COMMON_ALERT_MODAL:
  //     // case Route.ALERT_SCREEN:
  //     // case Route.SPECIAL_ANNOUNCEMENT_MODAL:
  //     // case Route.BOTTOM_SHEET_SELECTION_MOAL:
  //     // case Route.EVENT_CRUD_SCREEN:
  //     //   return modalOption;
  //     case Route.MAIN_STACK:
  //       return defaultOption;
  //     default:
  //       return null;
  //   }
};

// Gets the current screen from navigation state
const getActiveRouteName = (state: any): any => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const onStateChange = async (state: any) => {
  console.log(
    'RootStackScreen -> onStateChange -> currentRouteName:',
    navigationRef.current.getCurrentRoute().name,
  );

  previousRouteName = routeNameRef.current;
  currentRouteName = navigationRef.current.getCurrentRoute().name;

  if (previousRouteName !== currentRouteName) {
    // await analytics().logScreenView({
    //   screen_name: currentRouteName,
    //   screen_class: currentRouteName,
    // });
    console.log(
      'RootStackScreen -> onStateChange -> logScreen: ',
      currentRouteName,
    );
  }

  // console.log('RootStackScreen -> onStateChange -> state: ', state);

  routeNameRef.current = currentRouteName;
};

function navigate(name: any, params: any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    console.log("Attempted to use Navigate but the app hasn't mounted!!!");
  }
}

function push(...args: [routeName: string]) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.push(...args));
  }
}

function back(...args: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(CommonActions.goBack());
  }
}

function replace(...args: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(args));
  }
}

function remove(screenName: any) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch((state: any) => {
      // Remove the home route from the stack
      const routes = state.routes.filter((r: any) => r.name !== screenName);
      console.log('RootNavigation -> routes: ', routes);
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }
}

export default {
  isReadyRef,
  navigationRef,
  routeNameRef,
  previousRouteName,
  currentRouteName,
  getScreenOptions,
  getActiveRouteName,
  onStateChange,
  navigate,
  push,
  back,
  replace,
  remove,
};
