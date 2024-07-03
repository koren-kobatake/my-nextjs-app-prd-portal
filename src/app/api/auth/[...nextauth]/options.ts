// /app/api/auth/[...nextauth]/options.ts
import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const maxAge = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE, 10) : undefined;
const sessionUpdateAge = process.env.SESSION_UPDATE_AGE ? parseInt(process.env.SESSION_UPDATE_AGE, 10) : undefined;

console.log(maxAge)

export const authOptions: NextAuthOptions = {
    providers: [
        // 任意のプロバイダー設定
      ],
      callbacks: {
        async session({ session, token }: { session: any; token: JWT }) {
          session.userId = token.userId;
          session.role = token.role;
          session.env = token.env;
          session.sessionId = token.jti;
          // 有効期限を追加
          if (maxAge) {
            const expiresIn = maxAge * 1000; // ミリ秒に変換
            session.expires = new Date(Date.now() + expiresIn).toISOString();
          }
          console.log(111)
          console.log(session)
          return session;
        },
      },
    //   jwt: {
    //     async encode({ secret, token }) {
    //       // トークンがundefinedでないことを確認
    //       if (!token) {
    //         throw new Error('Token is undefined');
    //       }
    //       // JSON Web Token (JWT) をエンコード
    //       return jwt.sign(token as object, secret);
    //     },
    //     async decode({ secret, token }) {
    //       // トークンがundefinedでないことを確認
    //       if (!token) {
    //         throw new Error('Token is undefined');
    //       }
    //       // JSON Web Token (JWT) をデコード
    //       return jwt.verify(token, secret) as JWT;
    //     },
    //   },
      session: {
        maxAge: maxAge, // セッションの有効期限
        updateAge: sessionUpdateAge, // セッションの更新間隔
      },
      secret: process.env.NEXTAUTH_SECRET,
    };
