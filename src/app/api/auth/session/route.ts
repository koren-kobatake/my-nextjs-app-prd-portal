import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/options';
import { HTTP_STATUS_CODES } from "@/app/consts";

/**
 * GETリクエストハンドラー
 * 
 * GETリクエストを処理し、現在のセッション情報を返します。
 * 
 * @param {NextRequest} request - Next.jsのリクエストオブジェクト。
 * 
 * @returns {NextResponse} - JSONレスポンスオブジェクトを返します。
 */
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
      status: HTTP_STATUS_CODES.UNAUTHORIZED,
    });
  }

  return new NextResponse(JSON.stringify(session), {
    status: HTTP_STATUS_CODES.OK,
  });
}
