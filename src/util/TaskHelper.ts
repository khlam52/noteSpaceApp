import { TaskItem, TaskSection } from '../screens/task/TaskModel';
import StorageService from '../services/StorageService';
import { v4 as uuidv4 } from 'uuid';
import RootNavigation from '../navigation/RootNavigation';

const getTaskSectionList = (taskList: TaskItem[]): TaskSection[] => {
  let completedList: TaskItem[] = [];
  let inProgressList: TaskItem[] = [];
  taskList.forEach((item: TaskItem) => {
    if (item.isCompleted) {
      completedList.push(item);
    } else {
      inProgressList.push(item);
    }
  });

  let taskSectionList = [
    {
      title: 'In Progress',
      data: inProgressList,
    },
    {
      title: 'Completed',
      data: completedList,
    },
  ];
  return taskSectionList;
};

const createTask = async (title: string, content: string) => {
  let currentList = await StorageService.getTaskList();
  let newTaskList = [...currentList];
  let createTaskItem = {
    taskName: title,
    isCompleted: false,
    date: new Date(),
    taskContent: content,
    uuid: uuidv4(),
  };
  newTaskList.push(createTaskItem);
  console.log('newTaskList:', newTaskList);
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

export default {
  getTaskSectionList,
  createTask,
  editTask,
};
