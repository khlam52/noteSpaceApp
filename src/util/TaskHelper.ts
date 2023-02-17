import 'react-native-get-random-values';
import uuid from 'react-native-uuid';
import { TaskItem, TaskSection } from '../screens/task/TaskModel';
import StorageService from '../services/StorageService';
import _ from 'lodash';

const getTaskSectionList = (taskList: TaskItem[]): TaskSection[] => {
  let completedList: TaskItem[] = [];
  let inProgressList: TaskItem[] = [];
  if (taskList) {
    taskList.forEach((item: TaskItem) => {
      if (item.isCompleted) {
        completedList.push(item);
      } else {
        inProgressList.push(item);
      }
    });
  }

  let taskSectionList = [
    {
      title: 'In Progress',
      data: inProgressList,
      isCompletedList: false,
    },
    {
      title: 'Completed',
      data: completedList,
      isCompletedList: true,
    },
  ];
  return taskSectionList;
};

const createTask = async (title: string, content: string) => {
  let currentList = await StorageService.getTaskList();
  let newTaskList = currentList ? [...currentList] : [];
  let createTaskItem = {
    taskName: title,
    isCompleted: false,
    date: new Date(),
    taskContent: content,
    uuid: uuid.v4(),
  };
  newTaskList.push(createTaskItem);
  StorageService.setTaskList(newTaskList);
};

const editTask = async (
  title: string,
  content: string,
  isCompleted: boolean,
  uuid: string,
) => {
  let currentList = await StorageService.getTaskList();
  let newTaskList = [...currentList];
  newTaskList.forEach((item: TaskItem) => {
    if (item.uuid == uuid) {
      item.taskName = title;
      item.taskContent = content;
      item.date = new Date();
      item.isCompleted = isCompleted;
    }
  });
  console.log('newTaskList:', newTaskList);
  StorageService.setTaskList(newTaskList);
};

const deleteTask = async (uuid: string) => {
  let currentList = await StorageService.getTaskList();
  let newTaskList = [...currentList];
  let deleteTaskList = _.reject(newTaskList, { uuid: uuid });
  console.log('deleteTaskList:', deleteTaskList);
  StorageService.setTaskList(deleteTaskList);
};

export default {
  getTaskSectionList,
  createTask,
  editTask,
  deleteTask,
};
