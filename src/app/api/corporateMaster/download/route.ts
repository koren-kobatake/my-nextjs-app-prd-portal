import { NextRequest, NextResponse } from 'next/server';
import logger from '@/lib/logger';

/**
 * 指定されたIDのダウンロード要求を処理し、PDFファイルをレスポンスとして返します。
 * 
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  logger.info(`ダウンロードAPIが呼び出されました。ID: ${id}`);

  // ダミーPDFファイルを作成してレスポンス
  const pdfData = Buffer.from('Dummy PDF content', 'utf-8');
  
  return new NextResponse(pdfData, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=document_${id}.pdf`,
    },
  });
}
