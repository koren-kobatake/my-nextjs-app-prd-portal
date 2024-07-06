import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  const { USERID, CIC } = await request.json();

  console.log('USERID', USERID);
  console.log('CIC', CIC);
  if (!USERID) {
    return NextResponse.json({ error: 'USERID is required' }, { status: 400 });
  }

  // TODO 認証処理（Lambda呼び出し）

  // セッション生成
  // TODO：roleは現段階では不要だが、将来的には必要になるかも、一旦削除予定
  const token = await encode({
    token: {
      userId: USERID,
      cic: CIC,
      role: 'AAAA',
      env: process.env.ENV,
      jti: generateSessionId(),
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set('next-auth.session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

function generateSessionId() {
  return 'session_' + Math.random().toString(36).slice(2, 11);
}
