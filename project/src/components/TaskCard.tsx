import React, { useState, useEffect } from 'react';
import { CheckCircle2, Timer, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(
    task.hasTimer ? task.duration! * 60 : null
  );

  useEffect(() => {
    if (!task.hasTimer || !timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
          return 0;
        }
        return prev! - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [task.hasTimer, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4 transform transition-all hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          <p className="text-gray-600 mt-2">{task.description}</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onComplete(task.id)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <CheckCircle2 size={20} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {task.hasTimer && (
        <div className="flex items-center space-x-2 text-gray-600">
          <Timer size={16} />
          <span className={timeLeft === 0 ? 'text-red-500 font-bold' : ''}>
            {timeLeft === 0 ? 'Time\'s up!' : formatTime(timeLeft!)}
          </span>
        </div>
      )}
    </div>
  );
}