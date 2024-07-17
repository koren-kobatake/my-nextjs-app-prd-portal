// import { NextRequest, NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]/options';
// import { NextApiRequest, NextApiResponse } from 'next';

// export async function POST(req: NextRequest) {
//   const { userId, sessionId, cic, urlPath } = await req.json();

//   // NextRequestからNextApiRequestに変換する
//   const apiRequest = req as unknown as NextApiRequest;
//   const apiResponse = NextResponse.next() as unknown as NextApiResponse;

//   // 認証情報を用いてセッションを作成
//   const credentials = { userId };
//   const provider = authOptions.providers.find(provider => provider.id === 'test');

//   if (provider?.type === 'credentials' && 'authorize' in provider) {
//     // const user = await provider.authorize(credentials, apiRequest );
//     const user = await provider.authorize(credentials, apiRequest );

//     if (!user) {
//       return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
//     }

//     // セッションを取得
//     const session = await getServerSession(apiRequest, apiResponse, authOptions);

//     if (!session) {
//       return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
//     }

//     // トークンを取得
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     if (!token) {
//       return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
//     }

//     const baseUrl = `http://localhost:3000`;
//     const redirectUrl = `${baseUrl}/${urlPath}`;

//     const response = NextResponse.json({ redirectUrl });

//     // CORSヘッダーを設定
//     response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
//     response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//     response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

//     return response;
//   }

//   return new NextResponse(JSON.stringify({ error: 'Authorization provider not found' }), { status: 500 });
// }

// export async function OPTIONS(req: NextRequest) {
//   const response = new NextResponse(null, { status: 204 });

//   // CORSヘッダーを設定
//   response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
//   response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
//   response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

//   return response;
// }




import { NextRequest, NextResponse } from 'next/server';
import { getCsrfToken } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const { userId, sessionId, cic, urlPath } = await req.json();

    // NextRequestからヘッダーを取得
    const headers: { [key: string]: string } = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    // 新しいリクエストオブジェクトを作成
    const apiRequest = {
      headers,
      body: null,
      query: {},
      cookies: {},
      method: req.method,
    } as unknown as NextApiRequest;

    // 新しいレスポンスオブジェクトを作成
    const apiResponse = {} as NextApiResponse;

    // CSRFトークンを取得
    const csrfToken = await getCsrfToken({ req: apiRequest });

    if (!csrfToken) {
      throw new Error('Failed to obtain CSRF token');
    }

    // APIコール
    const bodyParams = new URLSearchParams({
      csrfToken,
      username: userId,
      password: sessionId, // Assuming password is sessionId for demonstration
    });

    const authResponse = await fetch('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams,
    });

    if (!authResponse.ok) {
      throw new Error(`Failed to call authorization API: ${authResponse.statusText}`);
    }

    // 認証後のクッキーを取得して設定
    const cookies = authResponse.headers.get('set-cookie');
    if (cookies) {
      cookies.split(',').forEach(cookie => {
        const parsedCookie = cookie.split(';')[0];
        const [name, value] = parsedCookie.split('=');
        if (name && value) {
          apiRequest.cookies[name.trim()] = value.trim();
        }
      });
    }

    // // 認証後のセッションを取得
    // const session = await getServerSession(authOptions);
    // // const session = await getServerSession(apiRequest, apiResponse, authOptions);

    // if (!session) {
    //   throw new Error('Failed to get session after authentication');
    // }

    // console.log('Session:', session);

    const baseUrl = `http://localhost:3000`;
    const redirectUrl = `${baseUrl}/${urlPath}`;

    const response = NextResponse.json({ redirectUrl });

    // CORSヘッダーを設定
    response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error during authentication:', error);

    return new NextResponse(
      JSON.stringify({
        error: 'An error occurred during the authentication process',
        message: 'error.message',
        stack: 'error.stack',
      }),
      { status: 500 }
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });

  // CORSヘッダーを設定
  response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
