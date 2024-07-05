'use client'; // クライアントコンポーネントとしてマーク

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LedgerTable } from "@/components/LedgerTable";
import { RedgerTable } from "@/components/LedgerTable/types";

export default function LedgerInquiryPage() {
    const [ledgerItems, setLedgerItems] = useState<RedgerTable[]>([]);
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const cic = searchParams.get('cic');

    useEffect(() => {
        if (userId && cic) {
            console.log('UserID:', userId);
            console.log('CIC:', cic);
            fetch('/api/ledgerInquiry/listing')
                .then(response => response.json())
                .then(data => {
                    setLedgerItems(data.items);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [userId, cic]);

    return (
        <div className='container mx-auto bg-white mb-5'>
            <LedgerTable items={ledgerItems} />
        </div>
    );
}
