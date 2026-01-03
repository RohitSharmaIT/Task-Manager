import { useState, useEffect, useMemo } from 'react';
import { Task, Priority, Status } from '@/types/task';

const STORAGE_KEY = 'task-management-tasks';

const generateId = () => Math.random().toString(36).substring(2, 15);

const getInitialTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Demo tasks - Testing - Remove task after finalizing Project
  const demoTasks: Task[] = [
    
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoTasks));
  return demoTasks;
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTasks(getInitialTasks());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          : task
      )
    );
  };

  const getTaskById = (id: string) => tasks.find((task) => task.id === id);

  const tasksByPriority = useMemo(() => ({
    high: tasks.filter((t) => t.priority === 'high'),
    medium: tasks.filter((t) => t.priority === 'medium'),
    low: tasks.filter((t) => t.priority === 'low'),
  }), [tasks]);

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  }), [tasks]);

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    toggleStatus,
    getTaskById,
    tasksByPriority,
    stats,
  };
};
