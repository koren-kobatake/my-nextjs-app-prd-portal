// import { NextRequest, NextResponse } from 'next/server';
// import { setCookie } from 'nookies';

// export async function POST(req: NextRequest) {
//   const formData = await req.formData();
//   const token = formData.get('token');

//   if (typeof token !== 'string') {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
//   }

//   // トークンをセッションに保存（例としてCookieに保存）
//   console.log(req.nextUrl.origin)
//   const response = NextResponse.redirect('http://localhost:3000/dashboard');
//   setCookie({ res: response as any }, 'authToken', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 30 * 24 * 60 * 60,
//     path: '/',
//   });

//   return response;
// }







import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from 'nookies';
import { redirect } from 'next/navigation'

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const token = formData.get('token');

  if (typeof token !== 'string') {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  // ログイン処理
  const response = await fetch(`${req.nextUrl.origin}/api/auth/session/createToken`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ USERID: 'testUser', CIC: 'testCic' }),
  });

  // トークンをセッションに保存（例としてCookieに保存）
  // const response = NextResponse.next();
  // const response = NextResponse.redirect('http://localhost:3000/dashboard');
  // setCookie({ res: response as any }, 'authToken', token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 30 * 24 * 60 * 60,
  //   path: '/',
  // });
  // console.log('token', token)
  // response.cookies.set('authToken', token)

  redirect('/dashboard')
  // // return response;
  // return NextResponse.redirect('/dashboard');
  // return response;
  // return redirect('/dashboard');
  // return response;
}




