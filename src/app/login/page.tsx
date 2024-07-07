'use client';

import '@/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from './useLogin';

/**
 * LoginPageコンポーネント
 * 
 * このコンポーネントは、ユーザーのログイン処理を行い、ログイン成功後に
 * 法人マスタページにリダイレクトするページです。
 * 
 * 使用例:
 * <LoginPage />
 * 
 */
const LoginPage = () => {
  const { loading, messageArea, isLoggedIn } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/corporateListing');
    }
  }, [isLoggedIn, router]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader'></div>
      </div>
    );
  }

  return (
    <div>
      {messageArea.text && <p className={`message-${messageArea.type}`}>{messageArea.text}</p>}
    </div>
  );
};

export default LoginPage;
