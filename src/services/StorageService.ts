import { TaskItem } from '../screens/task/TaskModel';
import DataPersister from '../util/DataPersister';

const enum StorageKey {
  DB_KEY_SAVED_LOCALE = '@locale',
  DB_KEY_SAVED_THEME = '@theme',
  DB_KEY_SAVED_IS_FIRST_LAUNCH = '@isFirstLaunch',
  DB_KEY_SAVED_IS_LOGGED_IN = '@isLoggedIn',
  DB_KEY_SAVED_TASK_LIST = '@taskList',
}

// Locale i18n
async function setLocale(locale: string): Promise<void> {
  return DataPersister.setString(StorageKey.DB_KEY_SAVED_LOCALE, locale);
}

async function getLocale(): Promise<any> {
  return DataPersister.getString(StorageKey.DB_KEY_SAVED_LOCALE);
}

// Task
async function setTaskList(taskList: TaskItem[]): Promise<void> {
  return DataPersister.setJson(StorageKey.DB_KEY_SAVED_TASK_LIST, taskList);
}

async function getTaskList(): Promise<any> {
  return DataPersister.getJson(StorageKey.DB_KEY_SAVED_TASK_LIST);
}

export default {
  setLocale,
  getLocale,
  setTaskList,
  getTaskList,
};
