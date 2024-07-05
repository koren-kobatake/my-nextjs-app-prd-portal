import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LedgerTableType } from "./types";
import { API_URLS } from "@/app/consts";

export function useLedgerInquiry() {
    const [ledgerItems, setLedgerItems] = useState<LedgerTableType[]>([]);
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const cic = searchParams.get('cic');

    useEffect(() => {
        async function fetchData() {
            if (userId && cic) {
                console.log('UserID:', userId);
                console.log('CIC:', cic);

                try {
                    // ログイン処理
                    const loginResponse = await fetch(API_URLS.LOGIN, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ USERID: userId, CIC: cic }),
                    });

                    if (!loginResponse.ok) {
                        console.error('Error logging in');
                        return;
                    }

                    // 帳票一覧取得
                    const listingResponse = await fetch(API_URLS.LEDGER_LISTING);

                    if (!listingResponse.ok) {
                        console.error('Error fetching ledger listing');
                        return;
                    }

                    const data = await listingResponse.json();
                    setLedgerItems(data.items);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }

        fetchData();
    }, [userId, cic]);

    return { ledgerItems };
}
