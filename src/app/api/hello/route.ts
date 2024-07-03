import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  logger.info('[INFO] Hello API called');
  logger.warn('[WARN] Hello API called');
  logger.error('[ERROR] Hello API called');
  return NextResponse.json({ message: 'Hello, World!' })
}
