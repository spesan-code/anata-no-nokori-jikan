import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Goal } from './types';
import { AppRoutes, LOCAL_STORAGE_GOALS_KEY, LOCAL_STORAGE_ACCOUNT_NAME_KEY } from './constants';
import { ThemeProvider } from './contexts/ThemeContext';
import { HomeScreen } from './components/HomeScreen';
import { GoalAddScreen } from './components/GoalAddScreen';
import { SideMenu } from './components/SideMenu';
import { MenuIcon } from './components/icons';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

const AppContent: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountName, setAccountName] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const storedGoals = localStorage.getItem(LOCAL_STORAGE_GOALS_KEY);
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
    const storedAccountName = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_NAME_KEY);
    if (storedAccountName) {
      setAccountName(storedAccountName);
    }
  }, []);

  const saveGoals = useCallback((updatedGoals: Goal[]) => {
    const sortedGoals = [...updatedGoals].sort((a,b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
    setGoals(sortedGoals);
    localStorage.setItem(LOCAL_STORAGE_GOALS_KEY, JSON.stringify(sortedGoals));
  }, []);

  const handleAddGoal = (newGoalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...newGoalData,
      id: crypto.randomUUID(),
    };
    saveGoals([...goals, newGoal]);
  };

  const handleDeleteGoal = (id: string) => {
    saveGoals(goals.filter(goal => goal.id !== id));
  };

  const handleEditGoalTitle = (id: string, newTitle: string) => {
    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, title: newTitle } : goal
    );
    saveGoals(updatedGoals);
  };

  const handleImportGoals = (importedGoals: Goal[]) => {
    // 既存のゴールと統合（ID重複を避ける）
    const existingIds = new Set(goals.map(g => g.id));
    const newGoals = importedGoals.filter(goal => !existingIds.has(goal.id));
    
    if (newGoals.length > 0) {
      saveGoals([...goals, ...newGoals]);
      alert(`${newGoals.length}個のゴールをインポートしました。`);
    } else {
      alert('インポート可能な新しいゴールがありません。');
    }
  };

  const handleSetAccountName = useCallback((name: string) => {
    setAccountName(name);
    localStorage.setItem(LOCAL_STORAGE_ACCOUNT_NAME_KEY, name);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const showMenuIcon = location.pathname === AppRoutes.HOME;

  return (
    <div className="relative">
      {showMenuIcon && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-full shadow-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
          aria-controls="sidemenu-title"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      )}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        accountName={accountName}
        onSetAccountName={handleSetAccountName}
        goals={goals}
        onImportGoals={handleImportGoals}
      />
      <main>
        <Routes>
          <Route 
            path={AppRoutes.HOME} 
            element={
              <HomeScreen 
                goals={goals} 
                onDeleteGoal={handleDeleteGoal} 
                onEditGoalTitle={handleEditGoalTitle}
                accountName={accountName}
              />
            } 
          />
          <Route 
            path={AppRoutes.ADD_GOAL} 
            element={<GoalAddScreen onAddGoal={handleAddGoal} />} 
          />
          <Route path={AppRoutes.ABOUT} element={<About />} />
          <Route path={AppRoutes.TERMS} element={<Terms />} />
          <Route path={AppRoutes.PRIVACY} element={<Privacy />} />
          <Route path={AppRoutes.CONTACT} element={<Contact />} />
        </Routes>
      </main>
      <PWAInstallPrompt />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;