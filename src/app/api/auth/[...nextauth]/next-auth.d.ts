import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// セッションとトークンにカスタムプロパティを追加するための型拡張
declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      cic?: string;
      role?: string;
      env?: string;
    } & DefaultSession["user"];
    sessionId?: string;
    expires: string;
  }

  interface User extends DefaultUser {
    userId: string;
    cic?: string;
    role?: string;
    env?: string;
    jti?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    cic?: string;
    role?: string;
    env?: string;
    jti?: string;
  }
}
