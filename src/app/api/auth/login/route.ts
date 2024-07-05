import { NextRequest, NextResponse } from 'next/server';
import { encode } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  const { USERID } = await request.json();

  // TODO 認証処理

  if (!USERID) {
    return NextResponse.json({ error: 'USERID is required' }, { status: 400 });
  }

  const token = await encode({
    token: {
      userId: USERID,
      role: 'AAAA',
      env: process.env.ENV,
      jti: generateSessionId(),
    },
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set('next-auth.session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

function generateSessionId() {
  return 'session_' + Math.random().toString(36).slice(2, 11);
}

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
//   const userId = await req.json();

//     const encryptedUserId = await new EncryptJWT({ userId })
//       .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
//       .setIssuedAt()
//       .setExpirationTime('1h')
//       .encrypt(secret);

//     const cookie = serialize('user', encryptedUserId, { path: '/', httpOnly: true });
//     // const cookie = serialize('user', encryptedUserId, { path: '/', httpOnly: true, secure: true });
//     const response = NextResponse.json({ success: true });
//     response.headers.set('Set-Cookie', cookie);
//     return response;

//     //   const response = NextResponse.json({ success: true });
// //   response.cookies.set('next-auth.session-token', token, {
// //     httpOnly: true,
// //     secure: process.env.NODE_ENV === 'production',
// //   });

// }

// export const config = {
//   runtime: 'edge',
// };
