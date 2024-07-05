import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  logger.info('[INFO] Download API called');
  return NextResponse.json({ message: 'Download API called!' })
}
