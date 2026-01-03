export type Priority = 'high' | 'medium' | 'low';
export type Status = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  createdAt: string;
}
