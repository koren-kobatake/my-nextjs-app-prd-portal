import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/options';
import { HTTP_STATUS_CODES } from "@/app/consts";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session)

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
      status: HTTP_STATUS_CODES.UNAUTHORIZED,
    });
  }

  return new NextResponse(JSON.stringify(session), {
    status: HTTP_STATUS_CODES.OK,
  });
}


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓　jose版

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtDecrypt, generateSecret } from 'jose';

// // 環境変数から16進数文字列の鍵を取得し、Uint8Arrayに変換
// const secretKey = process.env.SECRET_KEY;
// if (!secretKey) {
//   throw new Error('SECRET_KEY environment variable is not set');
// }
// const secret = Uint8Array.from(Buffer.from(secretKey, 'hex'));



// export async function GET(request: NextRequest) {

//   // // `x-forwarded-host` と `origin` ヘッダーの検証をスキップするためにエラーメッセージを無視
//   // const xForwardedHost = request.headers.get('x-forwarded-host');
//   // const originHost = request.headers.get('origin');

//   // console.log(`x-forwarded-host: ${xForwardedHost}, origin: ${originHost}`);
  
//   // // ヘッダーの不一致を無視する
//   // if (xForwardedHost && originHost && xForwardedHost !== originHost) {
//   //   console.warn(`x-forwarded-host header with value ${xForwardedHost} does not match origin header with value ${originHost}. Skipping validation.`);
//   // }

//   // const secret = new TextEncoder().encode(process.env.SECRET_KEY);
//   const cookieHeader = request.headers.get('cookie');
//   console.log('cookieHeader:', cookieHeader);
//   const token = cookieHeader ? cookieHeader.split('; ').find(cookie => cookie.startsWith('user='))?.split('=')[1] : undefined;

//   console.log('Token:', token);

//   if (token) {
//     try {
//       const { payload } = await jwtDecrypt(token, secret);
//       return new NextResponse(JSON.stringify(payload), {
//         status: 200,
//       });
//     } catch (err) {
//       console.error('Failed to decrypt cookie:', err);
//       return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
//         status: 401,
//       });
//     }
//   } else {
//     return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
//       status: 401,
//     });
//   }
// }
