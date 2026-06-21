/**
 * TaskContext - Görev durumu yönetimi (Context API)
 * 
 * Tasarım: Modern Minimalist Produktivite
 * Temel Prensipler: Merkezi Durum Yönetimi, LocalStorage Entegrasyonu
 */

import { createContext, useContext, ReactNode } from 'react';
import { Task, TaskContextType, TaskStatus, TaskPriority } from '@/interfaces/Task';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { nanoid } from 'nanoid';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => task.status !== 'completed'));
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const getTasksByPriority = (priority: TaskPriority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    clearCompleted,
    getTasksByStatus,
    getTasksByPriority,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
