import pino from 'pino';
import pretty from 'pino-pretty';

const stream = pretty({
  colorize: true, // カラー出力を有効にします
});

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
}, stream);

export default logger;
