import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  const { USERID } = await request.json();

  if (!USERID) {
    return NextResponse.json({ error: 'USERID is required' }, { status: 400 });
  }

  // TODO 認証処理（認証Lambda実行）


  const response = NextResponse.json({ success: true });

  return response;
}

