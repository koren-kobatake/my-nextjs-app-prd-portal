// import { NextRequest, NextResponse } from 'next/server';
// import { serialize } from 'cookie';
// import { EncryptJWT, generateSecret } from 'jose';

// async function getSecret() {
//   return await generateSecret('A256GCM');
// }

// // 環境変数から16進数文字列の鍵を取得し、Uint8Arrayに変換
// const secretKey = process.env.SECRET_KEY;
// if (!secretKey) {
//   throw new Error('SECRET_KEY environment variable is not set');
// }
// const secret = Uint8Array.from(Buffer.from(secretKey, 'hex'));

// export async function POST(req: NextRequest) {

//   // const crypto = require('crypto');
//   // const secret = crypto.randomBytes(32);
//   // console.log(secret.toString('hex'));

//   console.log(secret);
//   const formData = await req.formData();
//   const userId = formData.get('userId');
//   const cic = formData.get('cic');

//   if (!userId || typeof userId !== 'string' || !cic || typeof cic !== 'string') {
//     return NextResponse.json({ message: 'Invalid parameters' }, { status: 400 });
//   }

//   if (userId === 'validUser' && cic === 'validCIC') {
//     const encryptedUserId = await new EncryptJWT({ userId })
//       .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
//       .setIssuedAt()
//       .setExpirationTime('1h')
//       .encrypt(secret);

//     const cookie = serialize('user', encryptedUserId, { path: '/', httpOnly: true });
//     // const cookie = serialize('user', encryptedUserId, { path: '/', httpOnly: true, secure: true });

//     const baseUrl = `http://localhost:3000`;
//     const redirectUrl = `${baseUrl}/ledger2`;

//     const response = NextResponse.redirect(redirectUrl);
//     response.headers.set('Set-Cookie', cookie);

//     // CORSヘッダーを追加
//     response.headers.set('Access-Control-Allow-Origin', '127.0.0.1:8000');
//     response.headers.set('Access-Control-Allow-Credentials', 'true');    

//     return response;
//   } else {
//     const response = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     response.headers.set('Access-Control-Allow-Origin', '*');
//     response.headers.set('Access-Control-Allow-Credentials', 'true');
//     return response;
//   }
// }

// export const config = {
//   runtime: 'edge',
// };
