import path from 'path';
// import { getDatabaseUrl } from './lib/getDatabaseUrl'; // パラメータストアからDB URLを取得する関数

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(process.cwd(), 'app');

    // if (isServer) {
    //   config.plugins.push({
    //     apply: (compiler) => {
    //       compiler.hooks.beforeRun.tapAsync('SetDatabaseUrlPlugin', async (compilation, callback) => {
    //         if (process.env.NODE_ENV !== 'development') {
    //           try {
    //             const databaseUrl = await getDatabaseUrl();
    //             process.env.DATABASE_URL = databaseUrl;
    //           } catch (error) {
    //             console.error('Failed to set DATABASE_URL from Parameter Store', error);
    //           }
    //         }
    //         callback();
    //       });
    //     },
    //   });
    // }

    return config;
  },
  reactStrictMode: true,
  // 全ての API routes にマッチ
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  env: {
    ENV: process.env.ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    IS_LOCAL: process.env.IS_LOCAL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SESSION_MAX_AGE: process.env.SESSION_MAX_AGE,
    SESSION_UPDATE_AGE: process.env.SESSION_UPDATE_AGE,
  },
};

console.log('ENV:'+process.env.ENV);
console.log('NEXT_PUBLIC_API_URL:'+process.env.NEXT_PUBLIC_API_URL);
console.log('DATABASE_URL:'+process.env.DATABASE_URL);
console.log('IS_LOCAL:'+process.env.IS_LOCAL);
console.log('NEXTAUTH_URL:'+process.env.NEXTAUTH_URL);
console.log('NEXTAUTH_SECRET:'+process.env.NEXTAUTH_SECRET);
console.log('SESSION_MAX_AGE:'+process.env.SESSION_MAX_AGE);
console.log('SESSION_UPDATE_AGE:'+process.env.SESSION_UPDATE_AGE);

export default nextConfig;

// TODO next.config.mjsでローカル以外はパラメタストアから取得するように工夫すること（以下は例）
// const AWS = require('aws-sdk');

// // AWS Systems Managerクライアントの初期化
// const ssm = new AWS.SSM({
//   region: 'your-region', // 例: 'us-east-1'
// });

// // パラメータを取得する非同期関数
// async function getParameter(name) {
//   const params = {
//     Name: name,
//     WithDecryption: true,
//   };
//   const parameter = await ssm.getParameter(params).promise();
//   return parameter.Parameter.Value;
// }

// async function createConfig() {
//   const isDev = process.env.NODE_ENV !== 'production';

//   // 開発環境用の設定
//   const localConfig = {
//     NEXTAUTH_URL: 'http://localhost:3000',
//     NEXTAUTH_SECRET: 'your-local-secret-key',
//   };

//   // 本番環境用の設定をAWS Systems Managerから取得
//   const prodConfig = {
//     NEXTAUTH_URL: await getParameter('prod-nextauth-url'),
//     NEXTAUTH_SECRET: await getParameter('prod-nextauth-secret'),
//   };

//   const config = isDev ? localConfig : prodConfig;

//   return {
//     reactStrictMode: true,
//     env: {
//       ...config,
//       SESSION_MAX_AGE: (30 * 60).toString(), // 30分
//       SESSION_UPDATE_AGE: (5 * 60).toString(), // 5分
//     },
//   };
// }

// module.exports = createConfig();
