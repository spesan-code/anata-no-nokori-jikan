import React from 'react';
import { Theme } from '../types';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from './icons';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'ライト', value: Theme.LIGHT, icon: <SunIcon className="w-5 h-5 mr-2" /> },
    { name: 'ダーク', value: Theme.DARK, icon: <MoonIcon className="w-5 h-5 mr-2" /> },
    { name: 'システム', value: Theme.SYSTEM, icon: <ComputerDesktopIcon className="w-5 h-5 mr-2" /> },
  ];

  return (
    // 親コンポーネント(SideMenu)がセクションタイトルを提供するため、ここでのh3は削除
    <div className="space-y-2">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`w-full flex items-center px-4 py-2 text-left text-sm rounded-md transition-colors
                      ${theme === t.value 
                        ? 'bg-black text-white dark:bg-white dark:text-black' 
                        : 'text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
          aria-pressed={theme === t.value}
        >
          {t.icon}
          {t.name}
        </button>
      ))}
    </div>
  );
};