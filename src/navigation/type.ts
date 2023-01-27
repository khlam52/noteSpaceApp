import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TaskItem } from '../screens/task/TaskModel';
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

export type RootStackParams = {
  [Route.MAIN_STACK]: NestedNavigator<MainStackParams>;
};

export type ScreenNavigationProp<RouteName extends keyof MainStackParams> =
  StackNavigationProp<MainStackParams, RouteName>;
export interface ScreenProp<RouteName extends keyof MainStackParams> {
  navigation: ScreenNavigationProp<RouteName>;
  route: RouteProp<MainStackParams, RouteName>;
}

type TaskCreateAndEditScreenParam = {
  taskItem?: TaskItem | null;
  isCreateTask: boolean;
  headerTitle: string;
  buttonText: string;
};

export type MainStackParams = {
  List: undefined;
  TextDemo: undefined;
  FormDemo: undefined;
  ButtonDemo: undefined;
  [Route.LOGIN_SCREEN]: undefined;
  [Route.SIGN_UP_SCREEN]: undefined;
  [Route.TAB_STACK]: undefined;
  [Route.TASK_CREATE_AND_EDIT_SCREEN]: TaskCreateAndEditScreenParam;
};
