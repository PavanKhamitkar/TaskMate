import React, { useState } from 'react';
import { Plus, Timer } from 'lucide-react';
import { TaskFormData } from '../types';

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [hasTimer, setHasTimer] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<number>(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      hasTimer,
      duration: hasTimer ? duration : undefined,
    });
    setTitle('');
    setDescription('');
    setHasTimer(false);
    setDuration(30);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasTimer}
              onChange={(e) => setHasTimer(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 flex items-center gap-1">
              <Timer size={16} /> Add Timer
            </span>
          </label>

          {hasTimer && (
            <input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-24 px-3 py-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </form>
  );
}