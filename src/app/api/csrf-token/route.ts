import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from 'nookies';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  const csrfToken = crypto.randomBytes(32).toString('hex');
  const response = NextResponse.json({ csrfToken });

  setCookie({ res: response as any }, 'csrfToken', csrfToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1時間有効
    path: '/',
  });

  // CORSヘッダーを設定
  response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}

export async function OPTIONS(req: NextRequest) {
    const response = new NextResponse(null, { status: 204 });
  
    // CORSヘッダーを設定
    response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
    return response;
  }
  