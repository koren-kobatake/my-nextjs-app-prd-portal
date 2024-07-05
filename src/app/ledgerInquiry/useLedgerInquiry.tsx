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
        if (userId && cic) {
            console.log('UserID:', userId);
            console.log('CIC:', cic);
            fetch(API_URLS.LEDGER_LISTING)
                .then(response => response.json())
                .then(data => {
                    setLedgerItems(data.items);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [userId, cic]);

    return { ledgerItems };
}
