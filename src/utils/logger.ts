// TODO ロガーをカスタマイズするために、pino-prettyを使用してログのフォーマットを変更ししたい
// URL、ユーザーID、CICなどをログに追加するために、ログ出力メソッドを拡張する必要があります
import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const levelLabels: { [key: string]: string } = {
    '10': 'TRACE',
    '20': 'DEBUG',
    '30': 'INFO',
    '40': 'WARN',
    '50': 'ERROR',
    '60': 'FATAL'
  };

const stream = pretty({
    colorize: true,
    messageFormat: (log, messageKey) => {
      const level = typeof log.level === 'number' ? levelLabels[log.level.toString()] || 'UNKNOWN' : 'UNKNOWN';
      const timestamp = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss.SSS');
    //   return `(${log.hostname})(${log.userId || 'unknown'})(${log.cic || 'unknown'}): ${log[messageKey]}`;
      return `${log[messageKey]}`;
    },
    levelFirst: true,
    translateTime: false,
    singleLine: true,
});

const baseLogger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  base: { pid: process.pid, hostname: require('os').hostname() }, // 固定フィールドの設定
  timestamp: () => `,"time":"${dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss.SSS')}"` // JSTタイムスタンプにミリ秒を追加
}, stream);

class LoggerWrapper {
    private logger: Logger;
  
    constructor(logger: Logger) {
      this.logger = logger;
    }
  
    // セッション情報を追加してログを出力
    private async logWithSession(
      level: 'info' | 'error' | 'warn' | 'debug',
      msg: string,
      ...args: any[]
    ) {
      try {
        const session = await getServerSession(authOptions);
        if (!session) {
        this.logger.error('Session not found');
        return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
        }
    
        // userIDをログ出力
        const userId = session.user?.userId || 'unknown';
        const cic = session.user?.cic || 'unknown';
        this.logger[level]({ userId, cic }, msg, ...args);
      } catch (error) {
        this.logger.error({ error, msg: 'Failed to get session information' });
        this.logger[level](msg, ...args);
      }
    }
  
    async info(msg: string, ...args: any[]) {
      await this.logWithSession('info', msg, ...args);
    }
  
    async error(msg: string, ...args: any[]) {
      await this.logWithSession('error', msg, ...args);
    }
  
    async warn(msg: string, ...args: any[]) {
      await this.logWithSession('warn', msg, ...args);
    }
  
    async debug(msg: string, ...args: any[]) {
      await this.logWithSession('debug', msg, ...args);
    }
}
  
// インスタンスをデフォルトエクスポート
const logger = new LoggerWrapper(baseLogger);
export default logger;
