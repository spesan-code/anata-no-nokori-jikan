import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '../components/icons';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="max-w-xl mx-auto py-12 px-4">
          <div className="flex items-center mb-8 pt-4">
            <button
              onClick={() => navigate('/')}
              className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full mr-2"
              aria-label="ホームに戻る"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex-1" />
          </div>
          <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">アプリについて</h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              「あなたの残り時間」は、あなたの人生や目標の「残り時間」を可視化し、1分1秒を大切に生きるための匿名Webアプリです。
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-4">主な特徴</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-orange-400 mr-2">✓</span>
                  <span>アカウント登録不要・完全匿名</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-orange-400 mr-2">✓</span>
                  <span>プロフィール画像やアカウント名はローカル保存のみ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-orange-400 mr-2">✓</span>
                  <span>ダークモード・ライトモード・言語切り替え対応</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-orange-400 mr-2">✓</span>
                  <span>データの外部送信や収集はありません</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <p className="text-green-800 dark:text-green-200 font-medium">
                安心してご利用いただけます。
              </p>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              詳細な仕様やプライバシーポリシーは各ページをご覧ください。
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About; 