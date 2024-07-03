import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// MySQL接続設定
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'yourdatabase',
};

export async function POST(req: NextRequest) {
  const { session_key, expire_date } = await req.json();

  if (!session_key || !expire_date) {
    return NextResponse.json({ status: 'error', message: 'Missing session_key or expire_date' }, { status: 400 });
  }

  try {
    // データベース接続を確立
    const connection = await mysql.createConnection(dbConfig);
    
    // セッションのexpire_dateを更新するクエリを実行
    const [result] = await connection.execute<mysql.ResultSetHeader>(
      'UPDATE django_session SET expire_date = ? WHERE session_key = ?',
      [expire_date, session_key]
    );

    connection.end();

    if (result.affectedRows === 0) {
      return NextResponse.json({ status: 'error', message: 'Session not found' }, { status: 404 });
    } else {
      return NextResponse.json({ status: 'success', message: 'Session expire date updated' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error updating session expire date:', error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}
