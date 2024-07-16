import { useEffect, useState } from 'react';
import { CorporateListingType } from "./types";
import { MessageAreaType } from "@/components/messageArea";
import { API_URLS } from "@/app/consts_back/apiUrls";

/**
 * useCorporateListing
 * 
 * 指定されたAPIから法人一覧を取得します。
 * 
 */
export function useCorporateListing() {
    const [corporateListingItems, setCorporateListingItems] = useState<CorporateListingType[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [messageArea, setMessageArea] = useState<MessageAreaType>({ message: '', type: 'info' });

    useEffect(() => {
        async function fetchData() {
            try {
                // 法人一覧取得
                const listingResponse = await fetch(API_URLS.COPORATE_LISTING);

                if (!listingResponse.ok) {
                    setMessage('法人一覧の取得エラー');
                    console.error('法人一覧の取得エラー');
                    setLoading(false);
                    return;
                }

                const data = await listingResponse.json();
                setCorporateListingItems(data.items);
            } catch (error) {
                console.error('XXXXXX:', error);
                setMessage('XXXXXX');
        } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (message) {
          setMessageArea({ message: message, type: 'error' });
        }
    }, [message]);    

    return { corporateListingItems, loading, messageArea };
}
