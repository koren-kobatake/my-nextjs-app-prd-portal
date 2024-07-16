// TODO ロガーをカスタマイズするために、pino-prettyを使用してログのフォーマットを変更ししたい
// URL、ユーザーID、CICなどをログに追加するために、ログ出力メソッドを拡張する必要があります

/**
 * 【実装中】完成次第、logger.tsと置き換えます
 * 
 * このモジュールは、Pinoとpino-prettyを使用してログ出力をカスタマイズするための設定を提供します。
 * 
 * - `pino` を使用して、高性能で軽量なログ出力を実現します。
 * - `pino-pretty` を使用して、ログメッセージを見やすく整形します。
 * - `dayjs` を使用して、タイムゾーンを考慮した日時のフォーマットを提供します。
 * - `LoggerWrapper` クラスを使用して、ログ出力メソッドを拡張し、セッション情報（ユーザーID、CICなど）をログに追加します。
 * 
 * 機能:
 * - ログメッセージのカラー出力
 * - JSTタイムゾーンでのタイムスタンプフォーマット
 * - 環境に応じたログレベル設定（productionでは`info`、それ以外では`debug`）
 * - リクエスト情報、セッション情報を含むログメッセージの出力
 */

import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { HTTP_STATUS_CODES } from "@/app/consts/httpStatusCodes";

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
        return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), { status: HTTP_STATUS_CODES.UNAUTHORIZED });
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
