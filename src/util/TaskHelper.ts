import { useCallback } from 'react';
import { TaskItem, TaskSection } from '../screens/task/TaskModel';

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
      title: 'Inprogress',
      data: inProgressList,
    },
    {
      title: 'Completed',
      data: completedList,
    },
  ];
  return taskSectionList;
};

export default {
  getTaskSectionList,
};
