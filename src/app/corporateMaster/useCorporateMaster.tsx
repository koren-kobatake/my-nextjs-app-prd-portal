import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CorporateMasterType, MessageAreaType } from "./types";
import { API_URLS } from ".//consts";

/**
 * useCorporateMaster
 * 
 * URLのクエリパラメータからユーザーIDとCICを取得し、
 * ログイン処理を行い、指定されたAPIから法人マスタ一覧を取得します。
 * 
 * @returns {Object} - corporateMasterItemsオブジェクト（corporateMasterItemsは取得した帳票データの配列）
 */
export function useCorporateMaster() {
    const [corporateMasterItems, setCorporateMasterItems] = useState<CorporateMasterType[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [messageArea, setMessageArea] = useState<MessageAreaType>({ text: '', type: 'info' });
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
                        setMessage('ログインエラー');
                        setLoading(false);
                        return;
                    }

                    // 法人マスタ一覧取得
                    const listingResponse = await fetch(API_URLS.COPORATE_MASTER_LISTING);

                    if (!listingResponse.ok) {
                        console.error('帳票一覧の取得エラー');
                        setLoading(false);
                        return;
                    }

                    const data = await listingResponse.json();
                    setCorporateMasterItems(data.items);
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
        if (message) {
          setMessageArea({ text: message, type: 'error' });
        }
    }, [message]);    

    return { corporateMasterItems, loading, message, messageArea };
}
