import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LedgerTableType, MessageAreaType } from "./types";
import { API_URLS } from "@/app/consts";

/**
 * useLedgerInquiry
 * 
 * URLのクエリパラメータからユーザーIDとCICを取得し、
 * ログイン処理を行い、指定されたAPIから帳票一覧を取得します。
 * 
 * @returns {Object} - ledgerItemsオブジェクト（ledgerItemsは取得した帳票データの配列）
 */
export function useLedgerInquiry() {
    const [ledgerItems, setLedgerItems] = useState<LedgerTableType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<MessageAreaType>({ text: '', type: 'info' });
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const cic = searchParams.get('cic');

    useEffect(() => {
        async function fetchData() {
            if (userId && cic) {
                try {
                    // ログイン処理
                    const loginResponse = await fetch(API_URLS.LOGIN, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ USERID: userId, CIC: cic }),
                    });

                    console.log(loginResponse)

                    if (!loginResponse.ok) {
                        setError('ログインエラー');
                        setLoading(false);
                        return;
                    }

                    // 帳票一覧取得
                    const listingResponse = await fetch(API_URLS.LEDGER_LISTING);

                    if (!listingResponse.ok) {
                        console.error('帳票一覧の取得エラー');
                        setLoading(false);
                        return;
                    }

                    const data = await listingResponse.json();
                    setLedgerItems(data.items);
                } catch (error) {
                    console.error('データ取得エラー:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId, cic]);

    useEffect(() => {
        // エラーメッセージがある場合、メッセージエリアにセット
        if (error) {
          setMessage({ text: error, type: 'error' });
        }
    }, [error]);    

    return { ledgerItems, loading, error, message };  // loadingを追加
}
