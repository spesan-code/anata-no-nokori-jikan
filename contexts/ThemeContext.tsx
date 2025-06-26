
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Theme } from '../types';
import { LOCAL_STORAGE_THEME_KEY } from '../constants';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null;
    return storedTheme || Theme.LIGHT; // デフォルトをLIGHTに変更
  });

  const applyTheme = useCallback((selectedTheme: Theme) => {
    if (selectedTheme === Theme.SYSTEM) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', systemPrefersDark);
      // システム設定に応じてbodyのクラスも更新 (オプション)
      // document.body.classList.toggle('dark', systemPrefersDark);
    } else {
      document.documentElement.classList.toggle('dark', selectedTheme === Theme.DARK);
      // document.body.classList.toggle('dark', selectedTheme === Theme.DARK);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === Theme.SYSTEM) {
        applyTheme(Theme.SYSTEM);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);
  
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
