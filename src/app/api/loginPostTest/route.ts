import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId, cic } = await req.json();

  const baseUrl = `http://localhost:3000`;
  const redirectUrl = `${baseUrl}/ledgerInquiryPostTest`;

  const response = NextResponse.json({ redirectUrl });

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
