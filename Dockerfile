# ベースイメージとしてnodeを使用
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# 環境変数ファイルをコピー (このステップで .env ファイルを含める)
ARG ENV_FILE
COPY ${ENV_FILE} .env

# アプリケーションをビルド
RUN npm run build

# ポートを開放
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]
