import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import logger from '@/lib/logger';
import { HTTP_STATUS_CODES } from "@/app/consts/httpStatusCodes";

/**
 * 帳票一覧を返します。
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
  logger.info(`【API開始】帳票一覧取得 ${test}`);
  logger.error('【API開始】帳票一覧取得');
  logger.warn('【API開始】帳票一覧取得');
  logger.debug('【API開始】帳票一覧取得');

  try {
    // TODE X-Ray？
    // TODE パラメタチェック
    // TODE Lambda呼び出し
    // TODE データコンバート
    // TODE X-Ray？
    const items = [
      { id: 1, issueDate: "2024-05-01", documentName: "XXXXXXXXXX" },
      { id: 2, issueDate: "2024-04-01", documentName: "YYYYYYYYYY" },
      { id: 3, issueDate: "2024-03-01", documentName: "ZZZZZZZZZZ" },
      { id: 4, issueDate: "2024-02-01", documentName: "XXXXXXXXXX" },
      { id: 5, issueDate: "2024-01-01", documentName: "YYYYYYYYYY" },
      { id: 6, issueDate: "2023-12-01", documentName: "ZZZZZZZZZZ" },
      { id: 7, issueDate: "2023-11-01", documentName: "XXXXXXXXXX" },
      { id: 8, issueDate: "2023-10-01", documentName: "YYYYYYYYYY" },
      { id: 9, issueDate: "2023-09-01", documentName: "ZZZZZZZZZZ" },
      { id: 10, issueDate: "2023-08-01", documentName: "XXXXXXXXXX" },
      { id: 11, issueDate: "2023-07-01", documentName: "XXXXXXXXXX" },
      { id: 12, issueDate: "2023-06-15", documentName: "YYYYYYYYYY" },
    ];

    return NextResponse.json({ items });

  } catch (error) {
    logger.error(error, '例外発生');
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR });
  }
}
