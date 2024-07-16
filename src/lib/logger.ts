/**
 * Pinoとその周辺ライブラリを使用して、アプリケーションのログ出力を管理するための設定を提供します。
 * 
 * - `pino` を使用して、高性能で軽量なログ出力を実現します。
 * - `pino-pretty` を使用して、開発環境でのログ出力を見やすく整形します。
 * - `dayjs` を使用して、タイムゾーンを考慮した日時のフォーマットを提供します。
 * 
 * 機能:
 * - ログメッセージのカラー出力
 * - JSTタイムゾーンでのタイムスタンプフォーマット
 * - 環境に応じたログレベル設定（productionでは`info`、それ以外では`debug`）
 */

import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const stream = pretty({
  colorize: true, // カラー出力を有効にします
  translateTime: false, // Pinoの標準タイムスタンプを無効にします
  messageFormat: '{msg}', // メッセージのフォーマット
});

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  base: { pid: process.pid, hostname: require('os').hostname() }, // 固定フィールドの設定
  timestamp: () => `,"time":"${dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss.SSS')}"` // JSTタイムスタンプにミリ秒を追加
}, stream);

export default logger;
