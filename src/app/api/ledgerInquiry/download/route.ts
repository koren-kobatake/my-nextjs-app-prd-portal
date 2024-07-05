import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  logger.info(`Download API called for ID: ${id}`);

  // ダミーPDFファイルを作成してレスポンス
  const pdfData = Buffer.from('Dummy PDF content', 'utf-8');
  
  return new NextResponse(pdfData, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=document_${id}.pdf`,
    },
  });
}
