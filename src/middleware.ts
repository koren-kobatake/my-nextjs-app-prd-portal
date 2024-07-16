import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecrypt, generateSecret } from 'jose';

// 環境変数から16進数文字列の鍵を取得し、Uint8Arrayに変換
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not set');
}
const secret = Uint8Array.from(Buffer.from(secretKey, 'hex'));

/**
 * Middleware
 * 
 * Next.jsアプリケーションにおいてリクエストをインターセプトし、
 * 認証、リダイレクト、ロギング、ヘッダー設定などの追加処理を実行します。
 * 
 * 主な役割:
 * 1. 認証と認可:
 *    - 特定のページにアクセスする前にユーザーが認証されているかを確認します。
 *    - ユーザーが特定の権限を持っているかを確認します。
 * 
 * 2. リダイレクト:
 *    - 特定の条件に基づいてユーザーを別のページにリダイレクトします。
 * 
 * 3. ロギング:
 *    - リクエストやレスポンスの情報を記録します。
 * 
 * 4. ヘッダーの設定:
 *    - セキュリティヘッダーやキャッシュ制御ヘッダーを設定します。
 * 
 * 使用例:
 * - このミドルウェアを適用するためには、特定のルートを`matcher`設定で指定します。
 * - 例: '/protected'以下のすべてのルートにミドルウェアを適用するには、`matcher: '/protected/:path*'`を設定します。
 * 
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function middleware(req: NextRequest) {

  // `x-forwarded-host` と `origin` ヘッダーの検証をスキップするためにエラーメッセージを無視
  const xForwardedHost = req.headers.get('x-forwarded-host');
  const originHost = req.headers.get('origin');

  console.log(`x-forwarded-host: ${xForwardedHost}, origin: ${originHost}`);
  
  // ヘッダーの不一致を無視する
  if (xForwardedHost && originHost && xForwardedHost !== originHost) {
    console.warn(`x-forwarded-host header with value ${xForwardedHost} does not match origin header with value ${originHost}. Skipping validation.`);
  }

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
      // response.headers.set('Access-Control-Allow-Origin', '*');
      // response.headers.set('Access-Control-Allow-Credentials', 'true');
      return response;
    }
  } else if (req.nextUrl.pathname === '/ledger') {
    const response = NextResponse.redirect(new URL('/login', req.url));
    // response.headers.set('Access-Control-Allow-Origin', '*');
    // response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/ledger'],
};
