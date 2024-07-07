import { useEffect, useState } from 'react';
import { CorporateListingType, MessageAreaType } from "./types";
import { API_URLS } from ".//consts";

/**
 * useCorporateListing
 * 
 * 指定されたAPIから法人一覧を取得します。
 * 
 */
export function useCorporateListing() {
    const [corporateMasterItems, setCorporateMasterItems] = useState<CorporateListingType[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [messageArea, setMessageArea] = useState<MessageAreaType>({ text: '', type: 'info' });

    useEffect(() => {
        async function fetchData() {
            try {
                // 法人一覧取得
                const listingResponse = await fetch(API_URLS.COPORATE_LISTING);

                if (!listingResponse.ok) {
                    console.error('法人一覧の取得エラー');
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
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (message) {
          setMessageArea({ text: message, type: 'error' });
        }
    }, [message]);    

    return { corporateMasterItems, loading, messageArea };
}
