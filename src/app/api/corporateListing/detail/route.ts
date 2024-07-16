import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';
import { HTTP_STATUS_CODES } from "@/app/consts_back/httpStatusCodes";

/**
 * 法人詳細を返します。
 * 
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  logger.info(`詳細APIが呼び出されました。ID: ${id}`);

  try {
    // TODE X-Ray？
    // TODE パラメタチェック
    // TODE Lambda呼び出し
    // TODE データコンバート
    // TODE X-Ray？
    const items = { aaa: 'AAA', bbb: "BBB", ccc: "CCC" };

    return NextResponse.json({ items });

  } catch (error) {
    logger.error(error, '例外発生');
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR });
  }
}
