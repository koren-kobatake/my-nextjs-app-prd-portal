import { NextRequest, NextResponse } from 'next/server';
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
  cookies().delete(process.env.NEXT_PUBLIC_SESSION_COOKIE_KEY_NAME ?? "");
}
