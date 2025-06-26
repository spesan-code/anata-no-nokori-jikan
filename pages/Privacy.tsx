import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '../components/icons';
import Footer from '../components/Footer';

const Privacy: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">プライバシーポリシー</h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p>
              本アプリ「あなたの残り時間」（以下「本サービス」）は、ユーザーの個人情報保護に最大限の注意を払っています。
            </p>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">取得する情報</h2>
              <p>本サービスは、ユーザーのアカウント名やプロフィール画像等の個人情報を取得・外部送信しません。</p>
              <p>すべてのデータはユーザー端末のローカルストレージにのみ保存されます。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">外部サービスとの連携</h2>
              <p>本サービスは、外部サーバーや第三者サービスと連携・通信を行いません。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">広告・アクセス解析</h2>
              <p>広告配信やアクセス解析ツールも一切利用していません（今後追加する場合は本ページでお知らせします）。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">お問い合わせ</h2>
              <p>ご質問・ご要望は下記「お問い合わせ」よりご連絡ください。</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-black dark:text-white mb-3">改訂について</h2>
              <p>プライバシーポリシーは必要に応じて変更する場合があります。変更時は本ページにてお知らせします。</p>
            </section>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">2024年6月制定</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy; 