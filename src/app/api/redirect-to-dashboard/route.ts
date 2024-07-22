import { NextRequest, NextResponse } from 'next/server';
import { parseCookies, setCookie } from 'nookies';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  
  // FormDataEntryValue | null から string への変換
  const csrfToken = formData.get('csrfToken') as string | null;
  const sessionToken = formData.get('sessionToken') as string | null;
  const userId = formData.get('userId') as string | null;
  const sessionId = formData.get('sessionId') as string | null;
  const cic = formData.get('cic') as string | null;
  const urlPath = formData.get('urlPath') as string | null;

  if (!csrfToken || !sessionToken || !userId || !sessionId || !cic || !urlPath) {
    return NextResponse.json({ error: 'Missing required form data' }, { status: 400 });
  }



  // //////////////////////////////
  // // サインインAPI
  // //////////////////////////////
  // // APIコール
  // const bodyParams = {
  //   USERID: userId,
  //   CIC: cic, // Assuming password is sessionId for demonstration
  // };

  // const authResponse = await fetch('http://localhost:3000/api/auth/auth-test/sign-in', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(bodyParams), // JSON形式に変換
  // });

  // if (!authResponse.ok) {
  //   throw new Error(`Failed to call authorization API: ${authResponse.statusText}`);
  // }

  // //////////////////////////////
  // // セッション取得API
  // //////////////////////////////
  // const sessionResponse = await fetch('http://localhost:3000/api/auth/auth-test/get-session', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  // if (!sessionResponse.ok) {
  //   throw new Error(`Failed to call authorization API: ${authResponse.statusText}`);
  // }


  //  // トークンをセッションに保存（例としてCookieに保存）
  // setCookie({ res: req as any }, 'authToken', sessionToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'lax',
  //   maxAge: 30 * 24 * 60 * 60,
  //   path: '/',
  // });
  // const response = redirect(`/${urlPath}?${queryString}`);
  // クッキーを設定
  // res.cookies.set('my-cookie', 'my-value', {
  //   path: '/',
  //   httpOnly: true,
  //   sameSite: 'lax',
  // });

  if (!csrfToken || !sessionToken || !userId || !sessionId || !cic || !urlPath) {
    return NextResponse.json({ error: 'Missing required form data' }, { status: 400 });
  }

  const queryString = new URLSearchParams({ userId, sessionId, cic }).toString();
 
  redirect(`/${urlPath}?${queryString}`);
 
  // if (!csrfToken || !sessionToken || !userId || !sessionId || !cic || !urlPath) {
  //   return NextResponse.json({ error: 'Missing required form data' }, { status: 400 });
  // }

  // const queryString = new URLSearchParams({ userId, sessionId, cic }).toString();

  // return redirect(`/${urlPath}?${queryString}`);
}
