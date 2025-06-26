import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Goal } from '../types';
import { AppRoutes } from '../constants';
import { GoalCard } from './GoalCard';
import { PlusIcon } from './icons';
import Footer from './Footer';

interface HomeScreenProps {
  goals: Goal[];
  onDeleteGoal: (id: string) => void;
  onEditGoalTitle: (id: string, newTitle: string) => void;
  accountName: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ goals, onDeleteGoal, onEditGoalTitle, accountName }) => {
  const navigate = useNavigate();

  const titleText = accountName ? `${accountName}さんの残り時間` : 'あなたの残り時間';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 pt-12">
            <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">
              {titleText}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              残り時間を可視化して1分1秒を大切に生きよう。
            </p>
          </div>

          {goals.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">残り時間がありません。</p>
              <button
                onClick={() => navigate(AppRoutes.ADD_GOAL)}
                className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-150 ease-in-out inline-flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                最初の残り時間を設定しよう！
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal} 
                  onDelete={onDeleteGoal} 
                  onEditTitle={onEditGoalTitle}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => navigate(AppRoutes.ADD_GOAL)}
            className="fixed bottom-8 right-8 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            aria-label="新しい目標を追加"
          >
            <PlusIcon className="w-8 h-8" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};