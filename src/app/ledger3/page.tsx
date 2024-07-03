'use client'; // クライアントコンポーネントとしてマーク

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LedgerTable } from "@/components/LedgerTable";
import { DataTableDemo } from "@/components/DataTableDemo";

import { Payment } from "./constants/data";

export default function DownloadPage() {

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const cic = searchParams.get('cic');

    useEffect(() => {
      if (userId && cic) {
        // ユーザIDとCICを使った処理
        console.log('UserID:', userId);
        console.log('CIC:', cic);
      }
    }, [userId, cic]);

    return (
      <div className='container mx-auto bg-white mb-5'>
        <LedgerTable />
        {/* <DataTableDemo /> */}
      </div>
    );
}
