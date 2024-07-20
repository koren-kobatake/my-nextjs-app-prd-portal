'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { API_URLS } from '../consts/apiUrls';

const Dashboard = () => {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    (async () => {
        const cookies = parseCookies();
        const token = cookies.authToken;
        console.log(cookies)
        console.log(token)

        // セッション取得
        const loginResponse = await fetch(API_URLS.GET_SESSION_TOKEN, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(loginResponse)
    })();

    // if (token) {
    //   // トークンの検証（ダミー例。実際にはトークンを検証するロジックをここに実装する）
    //   if (token === 'example-token') {
    //     setIsValidToken(true);
    //   } else {
    //     setIsValidToken(false);
    //     router.push('/login');
    //   }
    // } else {
    //   router.push('/login');
    // }
  }, [router]);

//   if (!isValidToken) {
//     return <p>Loading...</p>;
//   }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
};

export default Dashboard;
