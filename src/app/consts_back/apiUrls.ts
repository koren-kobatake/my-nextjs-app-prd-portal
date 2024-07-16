/**
 * APIエンドポイントの定数を定義しています。
 * 各エンドポイントはURLの文字列として定義されており、API呼び出しの際に使用されます。
 * 
 * 使用例：
 * import { API_URLS } from '@/constants/apiUrls';
 * console.log(API_URLS.LOGIN); // '/api/auth/login'
 */

export const API_URLS = {
    LOGIN: '/api/auth/login',
    COPORATE_LISTING: '/api/corporateListing/listing',
    COPORATE_DETAIL: (id: number) => `/api/corporateListing/detail?id=${id}`,
};
