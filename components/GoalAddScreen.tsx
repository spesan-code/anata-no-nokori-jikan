import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Goal } from '../types';
import { AppRoutes } from '../constants';
import { ChevronLeftIcon } from './icons';

interface GoalAddScreenProps {
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
}

// Helper function to get a Date object whose UTC date/time parts represent current JST.
const getJSTNow = (): Date => {
  const nowUtc = new Date();
  // JST is UTC+9
  const jstOffsetMilliseconds = 9 * 60 * 60 * 1000;
  // Create a new Date object whose time value is shifted to JST.
  // When we use getUTCFullYear(), getUTCMonth(), etc. on this object,
  // they will return the year, month, etc. in JST.
  return new Date(nowUtc.getTime() + jstOffsetMilliseconds);
};

const formatUTCDatePart = (datePart: number): string => {
    return String(datePart).padStart(2, '0');
};

export const GoalAddScreen: React.FC<GoalAddScreenProps> = ({ onAddGoal }) => {
  const jstNowForMinAttributes = getJSTNow();
  const minDateJST = `${jstNowForMinAttributes.getUTCFullYear()}-${formatUTCDatePart(jstNowForMinAttributes.getUTCMonth() + 1)}-${formatUTCDatePart(jstNowForMinAttributes.getUTCDate())}`;

  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(''); // YYYY-MM-DD
  const [selectedTime, setSelectedTime] = useState(''); // HH:mm
  
  // minDateValue for the date input is based on JST's current date.
  const [minDateValue] = useState(minDateJST);
  const [minTimeValue, setMinTimeValue] = useState('00:00'); 
  
  const navigate = useNavigate();

  useEffect(() => {
    // Recalculate current JST for dynamic minTimeValue comparison
    const currentJST = getJSTNow();
    const currentJSTDateString = `${currentJST.getUTCFullYear()}-${formatUTCDatePart(currentJST.getUTCMonth() + 1)}-${formatUTCDatePart(currentJST.getUTCDate())}`;
    const currentJSTTimeString = `${formatUTCDatePart(currentJST.getUTCHours())}:${formatUTCDatePart(currentJST.getUTCMinutes())}`;

    if (selectedDate === currentJSTDateString) { // If selected date is JST's current "today"
      setMinTimeValue(currentJSTTimeString);
      // If a time was already selected for today and it's now in the past (JST), clear it.
      if (selectedTime && selectedTime < currentJSTTimeString) {
        setSelectedTime('');
      }
    } else if (selectedDate && selectedDate < currentJSTDateString) {
      // This case should ideally be prevented by the min attribute on the date input.
      // As a fallback, if a past JST date is somehow selected, reset to current JST date.
      setSelectedDate(currentJSTDateString);
      setSelectedTime(''); // Clear time as date changed
      setMinTimeValue(currentJSTTimeString); // Set min time for the new (current JST) date
    } else { // Selected date is in the future (JST) or not set
      setMinTimeValue('00:00');
    }
  }, [selectedDate, selectedTime, minDateValue]); // minDateValue is included as it's part of the component's state logic boundary

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && selectedDate && selectedTime) {
      // Combine date and time. new Date() interprets this as local time.
      // targetDate will be stored as a UTC ISO string.
      const targetDateTime = new Date(`${selectedDate}T${selectedTime}:00`); // Added seconds for robustness in parsing
      onAddGoal({ 
        title, 
        targetDate: targetDateTime.toISOString(),
      });
      navigate(AppRoutes.HOME);
    } else {
      alert('タイトル、設定日、設定時刻をすべて入力してください。');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center mb-8 pt-4">
        <button
          onClick={() => navigate(AppRoutes.HOME)}
          className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full mr-2"
          aria-label="ホームに戻る"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex-1" />
      </div>
      <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">新しい残り時間</h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-black dark:text-white mb-1">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: 還暦を迎える日"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="targetDate" className="block text-sm font-medium text-black dark:text-white mb-1">
            設定日 (JST基準)
          </label>
          <input
            type="date"
            id="targetDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white"
            min={minDateValue} // Min date is JST's current date
            required
          />
        </div>

        <div>
          <label htmlFor="targetTime" className="block text-sm font-medium text-black dark:text-white mb-1">
            設定時刻 (JST基準)
          </label>
          <input
            type="time"
            id="targetTime"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white"
            min={minTimeValue} // Min time depends on selectedDate (JST)
            disabled={!selectedDate}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black font-semibold py-3 px-4 rounded-md shadow-sm hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          残り時間を設定する
        </button>
      </form>
    </div>
  );
};
