import { Route } from './Route';

type NestedNavigator<
  ParamList,
  K extends keyof ParamList = keyof ParamList,
> = K extends keyof ParamList
  ? {
      screen: K;
      params: ParamList[K];
    }
  : never;

export type MainStackParams = {
  List: undefined;
  TextDemo: undefined;
  FormDemo: undefined;
  ButtonDemo: undefined;
  [Route.LOGIN_SCREEN]: undefined;
  [Route.SIGN_UP_SCREEN]: undefined;
  [Route.TAB_STACK]: undefined;
};

export type RootStackParams = {
  [Route.MAIN_STACK]: NestedNavigator<MainStackParams>;
};
