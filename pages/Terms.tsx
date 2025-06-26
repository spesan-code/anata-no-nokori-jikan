import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '../components/icons';
import Footer from '../components/Footer';

const Terms: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">利用規約</h1>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            本アプリ「あなたの残り時間」（以下「本サービス」）をご利用いただく前に、以下の利用規約をよくお読みください。
          </p>
          <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
            <li>本サービスは、アカウント登録不要・匿名でご利用いただけます。</li>
            <li>プロフィール画像や一言コメント等の個人情報は、ユーザーの端末内（ローカルストレージ）のみで管理され、外部に送信されません。</li>
            <li>本サービスの利用によって生じたいかなる損害についても、運営者は一切の責任を負いません。</li>
            <li>本サービスの内容は予告なく変更・終了する場合があります。</li>
            <li>本規約は予告なく改定されることがあります。</li>
          </ol>
          <p className="text-sm text-gray-500 dark:text-gray-400">2024年6月制定</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms; 