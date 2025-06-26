import React, { useState } from 'react';
import { Goal } from '../types';
import { CountdownDisplay } from './CountdownDisplay';
import { TrashIcon, PencilIcon } from './icons';

interface GoalCardProps {
  goal: Goal;
  onDelete: (id: string) => void;
  onEditTitle: (id: string, newTitle: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onDelete, onEditTitle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(goal.title);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onEditTitle(goal.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(goal.title);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex-1 mr-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white text-lg font-semibold"
              autoFocus
            />
            <div className="flex mt-2 space-x-2">
              <button
                type="submit"
                className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-sm rounded-md hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                保存
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white text-sm rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                キャンセル
              </button>
            </div>
          </form>
        ) : (
          <h3 className="text-lg font-semibold text-black dark:text-white flex-1">
            {goal.title}
          </h3>
        )}
        
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white p-1 rounded-md"
            aria-label="タイトルを編集"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-md"
            aria-label="削除"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CountdownDisplay targetDate={goal.targetDate} />
    </div>
  );
};
