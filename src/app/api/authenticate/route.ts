import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, sessionId, cic, urlPath } = body;

  // 認証処理（ダミー例。実際の認証ロジックをここに実装する）
  if (userId === 'validUser' && sessionId === 'validSession') {
    const token = 'example-token'; // 実際にはJWTなどを生成する

    const response = NextResponse.json({ token });

    // CORSヘッダーを設定
    response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
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
  