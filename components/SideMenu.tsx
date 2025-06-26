import React, { useState, useEffect } from 'react';
import { ThemeSelector } from './ThemeSelector';
import { XMarkIcon } from './icons';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../constants';
import { Goal } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
  onSetAccountName: (name: string) => void;
  goals: Goal[];
  onImportGoals: (goals: Goal[]) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, accountName, onSetAccountName, goals, onImportGoals }) => {
  const [currentAccountName, setCurrentAccountName] = useState<string>(accountName);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentAccountName(accountName);
  }, [accountName]);

  const handleAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAccountName(e.target.value);
  };
  const handleAccountNameBlur = () => {
    onSetAccountName(currentAccountName);
  };

  // バックアップ機能
  const handleExport = () => {
    const dataStr = JSON.stringify(goals, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anata-no-nokori-jikan-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedGoals = JSON.parse(e.target?.result as string);
          onImportGoals(importedGoals);
          onClose();
        } catch (error) {
          alert('ファイルの読み込みに失敗しました。');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 dark:bg-black/50 z-40 transition-opacity duration-300
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-black shadow-lg z-50 transform transition-transform ease-out duration-300
                    border-r border-gray-200 dark:border-gray-700
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidemenu-title"
      >
        <div className="flex justify-between items-center p-4">
          <h2 id="sidemenu-title" className="text-xl font-semibold text-black dark:text-white">メニュー</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white p-1 rounded-md"
            aria-label="メニューを閉じる"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-8 overflow-y-auto" style={{height: 'calc(100vh - 56px - 48px)'}}>
          {/* アカウント名のみ */}
          <section>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">アカウント名</label>
            <input
              type="text"
              value={currentAccountName}
              onChange={handleAccountNameChange}
              onBlur={handleAccountNameBlur}
              placeholder="例: 太郎"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white mb-2"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">※アカウント登録不要・完全匿名。個人情報は一切保存されません。</p>
          </section>

          {/* 設定 */}
          <section>
            <h4 className="text-md font-semibold mb-2 text-black dark:text-white">設定</h4>
            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">テーマ</span>
              <ThemeSelector />
            </div>
          </section>

          {/* データ管理 */}
          <section>
            <h4 className="text-md font-semibold mb-2 text-black dark:text-white">データ管理</h4>
            <div className="space-y-2">
              <button
                onClick={handleExport}
                className="w-full text-left text-sm text-blue-600 hover:underline py-1"
              >
                バックアップ（エクスポート）
              </button>
              <label className="w-full text-left text-sm text-blue-600 hover:underline py-1 cursor-pointer block">
                復元（インポート）
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </section>

          {/* 情報 */}
          <section>
            <h4 className="text-md font-semibold mb-2 text-black dark:text-white">情報</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-sm text-blue-600 hover:underline" onClick={() => { onClose(); navigate(AppRoutes.TERMS); }}>利用規約</button>
              </li>
              <li>
                <button className="text-sm text-blue-600 hover:underline" onClick={() => { onClose(); navigate(AppRoutes.CONTACT); }}>お問い合わせ</button>
              </li>
              <li>
                <button className="text-sm text-blue-600 hover:underline" onClick={() => { onClose(); navigate(AppRoutes.ABOUT); }}>アプリについて</button>
              </li>
            </ul>
          </section>
        </div>
        {/* 下部 著作権表記 */}
        <div className="text-center text-xs text-gray-400 dark:text-gray-600 py-3">
          © 2025 あなたの残り時間
        </div>
      </div>
    </>
  );
};