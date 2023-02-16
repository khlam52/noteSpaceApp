import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NoteItem } from '../screens/note/NoteModel';
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

type NoteCreateAndEditScreenParam = {
  noteItem?: NoteItem | null;
  isCreateNote: boolean;
};

export type MainStackParams = {
  List: undefined;
  TextDemo: undefined;
  FormDemo: undefined;
  ButtonDemo: undefined;
  [Route.TAB_STACK]: undefined;
  [Route.TASK_CREATE_AND_EDIT_SCREEN]: TaskCreateAndEditScreenParam;
  [Route.NOTE_CREATE_AND_EDIT_SCREEN]: NoteCreateAndEditScreenParam;
};
