import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  logger.info('Listing API called');

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
}
