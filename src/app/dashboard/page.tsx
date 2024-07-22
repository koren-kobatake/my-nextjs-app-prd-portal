'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cookies } from 'next/headers'

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [cic, setCic] = useState('');

  useEffect(() => {
    const userId = searchParams.get('userId');
    const sessionId = searchParams.get('sessionId');
    const cic = searchParams.get('cic');

    if (userId && sessionId && cic) {
      setUserId(userId);
      setSessionId(sessionId);
      setCic(cic);
    } else {
      router.push('/login');
    }

    // クッキーを取得
    const cookieStore = cookies()
    console.log(cookieStore);
    // const cookies = document.cookie.split('; ').find(row => row.startsWith('my-cookie='));
    // console.log(document.cookie);
    // console.log(cookies);
    // const value = cookies ? cookies.split('=')[1] : 'クッキーが見つかりません';
    // console.log(value);
    
  }, [searchParams, router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <p>User ID: {userId}</p>
      <p>Session ID: {sessionId}</p>
      <p>CIC: {cic}</p>
    </div>
  );
};

export default Dashboard;
