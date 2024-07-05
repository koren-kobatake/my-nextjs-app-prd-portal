import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const maxAge = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE, 10) : undefined;
const sessionUpdateAge = process.env.SESSION_UPDATE_AGE ? parseInt(process.env.SESSION_UPDATE_AGE, 10) : undefined;

export const authOptions: NextAuthOptions = {
    providers: [
        // 任意のプロバイダー設定
      ],
      callbacks: {
        async session({ session, token }: { session: any; token: JWT }) {
          session.userId = token.userId;
          session.cic = token.cic;
          session.role = token.role;
          session.env = token.env;
          session.sessionId = token.jti;
          // 有効期限を追加
          if (maxAge) {
            const expiresIn = maxAge * 1000; // ミリ秒に変換
            session.expires = new Date(Date.now() + expiresIn).toISOString();
          }
          console.log(session)
          return session;
        },
      },
      session: {
        maxAge: maxAge, // セッションの有効期限
        updateAge: sessionUpdateAge, // セッションの更新間隔
      },
      secret: process.env.NEXTAUTH_SECRET,
    };
