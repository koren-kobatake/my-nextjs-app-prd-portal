import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import logger from '@/lib/logger';
import { HTTP_STATUS_CODES } from "@/app/consts";

/**
 * 法人一覧を返します。
 * 
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error('セッションが見つかりません');
    return new NextResponse(JSON.stringify({ error: '認証されていません' }), { status: HTTP_STATUS_CODES.UNAUTHORIZED });
  }
  
  // loggerの使用例
  const test = '★引数渡しテスト★';
  logger.info(`【API開始】法人一覧取得 ${test}`);
  logger.error('【API開始】法人一覧取得');
  logger.warn('【API開始】法人一覧取得');
  logger.debug('【API開始】法人一覧取得');

  try {
    // TODE X-Ray？
    // TODE パラメタチェック
    // TODE Lambda呼び出し
    // TODE データコンバート
    // TODE X-Ray？
    const items = [
      { id: 1, cic: "1111", corporateName: "AAAAAA" },
      { id: 2, cic: "2222", corporateName: "BBBBBB" },
      { id: 3, cic: "3333", corporateName: "CCCCCC" },
    ];

    return NextResponse.json({ items });

  } catch (error) {
    logger.error(error, '例外発生');
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR });
  }
}
