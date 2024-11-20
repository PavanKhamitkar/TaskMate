import React, { useState, useEffect } from 'react';
import { CheckCircle, ListTodo } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import { Task, TaskFormData } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      return JSON.parse(saved).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: true } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <ListTodo className="text-blue-600" size={40} />
            Task Manager Pro
          </h1>
          <p className="text-gray-600">Organize your tasks efficiently with timer support</p>
        </div>

        <TaskForm onSubmit={addTask} />

        <div className="space-y-8">
          {activeTasks.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Active Tasks</h2>
              <div className="space-y-4">
                {activeTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                Completed Tasks
              </h2>
              <div className="space-y-4 opacity-75">
                {completedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tasks yet. Add your first task above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;