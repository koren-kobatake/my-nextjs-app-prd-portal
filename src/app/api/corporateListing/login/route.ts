// TODO 
// 法人ポータルからの画面遷移はセキュリティを考慮してPOSTで本APIをコールして
// 帳票照会画面をリダイレクトしたいのだが、7/5時点でうまくいっていない
// GETなら問題ないため、一旦GETでユーザIDとCICをURLパラメタ渡しする方向で進める
// URL叩けば帳票照会画面に遷移可能なので、その方が開発も進めやすいかも
// ただし、セキュリティ的には平文でGETでユーザIDとCICを渡すのは避けたいので、
// 暗号化して渡すか、POSTでリクエストボディに渡せるように調査するか、検討と判断が必要

import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { EncryptJWT, generateSecret } from 'jose';
import { HTTP_STATUS_CODES } from "@/app/consts_back/httpStatusCodes";

async function getSecret() {
  return await generateSecret('A256GCM');
}

// 環境変数から16進数文字列の鍵を取得し、Uint8Arrayに変換
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('SECRET_KEY環境変数が設定されていません');
}
const secret = Uint8Array.from(Buffer.from(secretKey, 'hex'));

/**
 * 法人ポータルからの画面遷移を処理し、
 * ユーザーIDとCICを受け取り、ユーザーが認証されれば帳票照会画面にリダイレクトします。
 * 
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function POST(req: NextRequest) {
  // const crypto = require('crypto');
  // const secret = crypto.randomBytes(32);
  // console.log(secret.toString('hex'));

  console.log('シークレットキー:', secret);
  const formData = await req.formData();
  const userId = formData.get('userId');
  const cic = formData.get('cic');

  if (!userId || typeof userId !== 'string' || !cic || typeof cic !== 'string') {
    return NextResponse.json({ message: '無効なパラメータ' }, { status: HTTP_STATUS_CODES.BAD_REQUEST });
  }

  if (userId === 'validUser' && cic === 'validCIC') {
    const encryptedUserId = await new EncryptJWT({ userId })
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .encrypt(secret);

    const cookie = serialize('user', encryptedUserId, { path: '/', httpOnly: true });
    // const cookie = serialize('user', encryptedUserId, { path: '/', httpOnly: true, secure: true });

    const baseUrl = `http://localhost:3000`;
    const redirectUrl = `${baseUrl}/CorporateMaster`;

    const response = NextResponse.redirect(redirectUrl);
    response.headers.set('Set-Cookie', cookie);

    // CORSヘッダーを追加
    response.headers.set('Access-Control-Allow-Origin', '127.0.0.1:8000');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    return response;
  } else {
    const response = NextResponse.json({ message: '認証されていません' }, { status: HTTP_STATUS_CODES.UNAUTHORIZED });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }
}
