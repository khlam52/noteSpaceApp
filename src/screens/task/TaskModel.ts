export interface TaskItem {
  taskName: string;
  isCompleted: boolean;
  date: Date;
  taskContent: string | null;
}

export interface TaskSection {
  title: string;
  data: TaskItem[];
}
