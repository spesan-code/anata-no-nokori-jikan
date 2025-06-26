
import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownDisplayProps {
  targetDate: string;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ targetDate }) => {
  const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate);

  if (isPast) {
    return <p className="text-xl font-semibold text-red-600 dark:text-red-400">時間切れです！</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div>
        <span className="text-2xl font-bold text-black dark:text-white">{String(days).padStart(2, '0')}</span>
        <span className="block text-xs text-gray-600 dark:text-gray-400">日</span>
      </div>
      <div>
        <span className="text-2xl font-bold text-black dark:text-white">{String(hours).padStart(2, '0')}</span>
        <span className="block text-xs text-gray-600 dark:text-gray-400">時間</span>
      </div>
      <div>
        <span className="text-2xl font-bold text-black dark:text-white">{String(minutes).padStart(2, '0')}</span>
        <span className="block text-xs text-gray-600 dark:text-gray-400">分</span>
      </div>
      <div>
        <span className="text-2xl font-bold text-black dark:text-white">{String(seconds).padStart(2, '0')}</span>
        <span className="block text-xs text-gray-600 dark:text-gray-400">秒</span>
      </div>
    </div>
  );
};
