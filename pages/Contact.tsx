import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '../components/icons';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">お問い合わせ</h1>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            ご意見・ご要望・不具合報告などがありましたら、下記よりご連絡ください。
          </p>
          <div className="mb-4 text-gray-700 dark:text-gray-300">
            <b>※現在、お問い合わせ先は未設定です。</b><br />
            今後、専用フォームやメールアドレスを設置予定です。
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            しばらくお待ちください。
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact; 