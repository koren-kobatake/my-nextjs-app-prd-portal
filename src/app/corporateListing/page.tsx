'use client';

import '@/styles/globals.css';
import { Suspense } from 'react';
import { CorporateListingTable } from "./components/corporateListingTable";
import { useCorporateListing } from "./useCorporateListing";
import { MessageArea } from "@/components/messageArea";

/**
 * CorporateListingPageコンポーネント
 * 
 * 法人一覧を表示します。
 * 
 * 機能:
 * - `useCorporateListing`カスタムフックを使用して法人マスタ一覧データを取得します。
 * - 取得した帳票データを`CorporateListing`コンポーネントに渡して表示します。
 * 
 * 使用例:
 * <CorporateListingPage />
 */
export default function CorporateListingPage() {
  const { corporateListingItems, loading, messageArea } = useCorporateListing();

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader'></div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container mx-auto bg-white'>
        <MessageArea message={messageArea.message} type={messageArea.type} />
        <div className='mt-1'>
          <CorporateListingTable items={corporateListingItems} />
        </div>
      </div>
    </Suspense>
  );
}
