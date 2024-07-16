/**
 * apiUrls.ts
 * 
 * アプリケーション内で使用されるAPIエンドポイントの定数を定義しています。
 * 各エンドポイントはURLの文字列として定義されており、API呼び出しの際に使用されます。
 * 
 * 使用例:
 * import { API_URLS } from '@/app/constants/apiUrls';
 * console.log(API_URLS.LOGIN);
 */

export const API_URLS = {
    LOGIN: '/api/auth/login',
    LEDGER_LISTING: '/api/ledgerInquiry/listing',
    LEDGER_DOWNLOAD: (id: number) => `/api/ledgerInquiry/download?id=${id}`,
    COPORATE_MASTER_LISTING: '/api/corporateMaster/listing',
    COPORATE_MASTER_DETAIL: (id: number) => `/api/corporateMaster/detail?id=${id}`,
};
