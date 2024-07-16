'use client';

import '@/styles/globals.css';
import { CorporateListingTable } from "./components/CorporateListingTable";
import { useCorporateListing } from "./useCorporateListing";
import { MessageArea } from "@/components/MessageArea";

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
    <div className='container mx-auto bg-white'>
      <MessageArea message={messageArea.text} type={messageArea.type} />
      <div className='mt-1'>
        <CorporateListingTable items={corporateListingItems} />
      </div>
    </div>
  );
}
