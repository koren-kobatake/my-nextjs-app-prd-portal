/**
 * HTTPステータスコードの定数を定義しています。
 * 各ステータスコードは数値として定義されており、APIレスポンスのステータス設定に使用されます。
 * 
 * 使用例：
 * import { HTTP_STATUS_CODES } from '@/app/consts/httpStatusCodes';
 * console.log(HTTP_STATUS_CODES.OK);
 */

export const HTTP_STATUS_CODES = {
    OK: 200,            // 正常（デフォルトで設定されるため明示的に使用する必要なし）
    BAD_REQUEST: 400,   // リクエストが不正な場合に使用
    UNAUTHORIZED: 401,  // 認証が必要なリソースに対して認証情報がない、または無効な場合に使用
    FORBIDDEN: 403,     // リクエストされたリソースにアクセスする権限がない場合に使用
    NOT_FOUND: 404,     // リクエストされたリソースが存在しない場合に使用
    INTERNAL_SERVER_ERROR: 500, // サーバー内部で予期しないエラーが発生した場合に使用
    SERVICE_UNAVAILABLE: 503,   // サービスが一時的に利用できない場合に使用
};
