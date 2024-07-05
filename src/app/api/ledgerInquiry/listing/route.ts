import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  logger.info('[INFO] Listing API called');
  return NextResponse.json({ message: 'Listing API called!' })
}
