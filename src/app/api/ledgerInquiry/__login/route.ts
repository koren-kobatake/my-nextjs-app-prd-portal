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
import { HTTP_STATUS_CODES } from "@/app/consts/httpStatusCodes";

/**
 * 法人ポータルからの画面遷移を処理し、
 * ユーザーIDとCICを受け取り、ユーザーが認証されれば帳票照会画面にリダイレクトします。
 * 
 * @param {NextRequest} req - Next.jsのリクエストオブジェクト
 * @returns {NextResponse} - Next.jsのレスポンスオブジェクト
 */
export async function POST(req: NextRequest) {

  const formData = await req.formData();
  const userId = formData.get('userId');
  const cic = formData.get('cic');


    const baseUrl = `http://localhost:3000`;
    const redirectUrl = `${baseUrl}/ledgerInquiry`;

    const response = NextResponse.redirect(redirectUrl);

    return response;
}
