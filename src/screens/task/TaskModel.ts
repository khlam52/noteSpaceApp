export interface TaskItem {
  taskName: string;
  isCompleted: boolean;
  date: Date;
  taskContent: string | null;
  uuid: string;
}

export interface TaskSection {
  title: string;
  isCompletedList: boolean;
  data: TaskItem[];
}
