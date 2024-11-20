export interface Task {
  id: string;
  title: string;
  description: string;
  hasTimer: boolean;
  duration?: number; // in minutes
  createdAt: Date;
  completed: boolean;
}

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'completed'>;