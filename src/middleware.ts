import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecrypt, generateSecret } from 'jose';

async function getSecret() {
  return await generateSecret('A256GCM');
}

// 環境変数から16進数文字列の鍵を取得し、Uint8Arrayに変換
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not set');
}
const secret = Uint8Array.from(Buffer.from(secretKey, 'hex'));

export async function middleware(req: NextRequest) {

// const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const cookieHeader = req.headers.get('cookie');
  console.log('cookieHeader:', cookieHeader);
  const token = cookieHeader ? cookieHeader.split('; ').find(cookie => cookie.startsWith('user='))?.split('=')[1] : undefined;

  console.log('Token:', token);

  if (token) {
    try {
      const { payload } = await jwtDecrypt(token, secret);
      if (req.nextUrl.pathname === '/ledger') {
        return NextResponse.next();
      }
    } catch (err) {
      console.error('Failed to decrypt cookie:', err);
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      return response;
    }
  } else if (req.nextUrl.pathname === '/ledger') {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ledger/download'],
};
