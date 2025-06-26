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
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              本アプリ「あなたの残り時間」（以下「本サービス」）をご利用いただく前に、以下の利用規約をよくお読みください。
            </p>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">利用について</h2>
              <p className="mb-2">本サービスは、アカウント登録不要・匿名でご利用いただけます。</p>
              <p>ご利用は、利用者ご自身の責任において行ってください。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">個人情報の取り扱い</h2>
              <p>プロフィール画像やアカウント名などの個人情報は、ユーザーの端末内（ローカルストレージ）のみで管理され、外部に送信されません。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">禁止事項</h2>
              <p>法令や公序良俗に反する行為、または他のユーザーの迷惑となる行為はご遠慮ください。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">免責事項</h2>
              <p>本サービスの利用により生じたいかなる損害についても、運営者は一切責任を負いません。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">サービス内容の変更・終了</h2>
              <p>本サービスの内容は、予告なく変更または終了する場合があります。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">規約の変更</h2>
              <p>本規約は、必要に応じて予告なく改定されることがあります。改定後も引き続きご利用いただいた場合、変更内容に同意したものとみなします。</p>
            </section>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">2024年6月制定</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms; 