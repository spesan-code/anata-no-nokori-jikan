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
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            <b>あなたの残り時間</b>は、あなたの人生や目標の「残り時間」を可視化し、1分1秒を大切に生きるための匿名Webアプリです。
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li>アカウント登録不要・完全匿名</li>
            <li>プロフィール画像や一言コメントもローカル保存のみ</li>
            <li>ダークモード・言語切り替え対応</li>
            <li>あなたの大切な「残り時間」を見える化</li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            本アプリは個人情報を一切外部送信しません。安心してご利用ください。
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About; 