import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'next-auth/jwt';
import { HTTP_STATUS_CODES } from "@/app/consts/httpStatusCodes";
import { cookies } from "next/headers";

/**
 * POSTリクエストハンドラー
 * 
 * POSTリクエストを処理し、ユーザーの認証情報を検証してセッションを生成します。
 * 
 * @param {NextRequest} request - Next.jsのリクエストオブジェクト。
 * 
 * @returns {NextResponse} - JSONレスポンスオブジェクトを返します。
 */
export async function POST(request: NextRequest) {
  const { USERID, CIC } = await request.json();

  if (!USERID) {
    return NextResponse.json({ error: 'USERID is required' }, { status: HTTP_STATUS_CODES.BAD_REQUEST });
  }

  // TODO 認証処理（Lambda呼び出し）

  // セッション生成
  // TODO：roleは現段階では不要だが、将来的には必要になるかも、一旦削除予定
  const encodedJwtToken = await encode({
    token: {
      userId: USERID,
      cic: CIC,
      role: 'AAAA',
      env: process.env.ENV,
      jti: generateSessionId(),
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  cookies().delete(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY_NAME ?? "");

  cookies().set(
    process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY_NAME ?? "",
    encodedJwtToken
  );

  const response = NextResponse.json({ success: true });
  // response.cookies.set('next-auth.session-token', encodedJwtToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  // });
  return response;
}

function generateSessionId() {
  return 'session_' + Math.random().toString(36).slice(2, 11);
}
