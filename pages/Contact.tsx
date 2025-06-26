import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '../components/icons';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // メール送信のためのmailtoリンクを作成
      const mailtoLink = `mailto:revenge-fiats4a@icloud.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `お名前: ${formData.name}\n` +
        `メールアドレス: ${formData.email}\n\n` +
        `お問い合わせ内容:\n${formData.message}`
      )}`;

      // メールクライアントを開く
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.subject.trim() && formData.message.trim();

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
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              ご意見・ご要望・不具合報告などがありましたら、下記フォームよりご連絡ください。
            </p>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded-md">
                <p className="text-green-800 dark:text-green-200">
                  お問い合わせありがとうございます。メールクライアントが開きますので、送信を完了してください。
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-md">
                <p className="text-red-800 dark:text-red-200">
                  エラーが発生しました。もう一度お試しください。
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="例: 山田太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white"
                  placeholder="例: example@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  件名 <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                  <option value="">選択してください</option>
                  <option value="機能要望">機能要望</option>
                  <option value="不具合報告">不具合報告</option>
                  <option value="ご質問">ご質問</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white bg-white dark:bg-gray-700 text-black dark:text-white resize-vertical"
                  placeholder="お問い合わせ内容を詳しくお書きください。"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isFormValid && !isSubmitting
                    ? 'bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black focus:ring-gray-500'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? '送信中...' : 'お問い合わせを送信'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>注意:</strong> 送信ボタンを押すと、お使いのメールクライアントが開きます。
                メールの送信は手動で完了してください。
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact; 