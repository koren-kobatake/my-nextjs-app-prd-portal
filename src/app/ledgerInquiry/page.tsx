'use client';

import '@/styles/globals.css';
import { LedgerTable } from "./components/LedgerTable";
import { useLedgerInquiry } from "./useLedgerInquiry";
import { MessageArea } from "@/components/messageArea";

/**
 * LedgerInquiryPageコンポーネント
 * 
 * 帳票照会ページを表し、帳票データのテーブルを表示します。
 * 
 * 機能:
 * - `useLedgerInquiry`カスタムフックを使用して帳票データを取得します。
 * - 取得した帳票データを`LedgerTable`コンポーネントに渡して表示します。
 * 
 * 使用例:
 * <LedgerInquiryPage />
 */
export default function LedgerInquiryPage() {
  const { ledgerItems, loading, messageArea } = useLedgerInquiry();

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
        <LedgerTable items={ledgerItems} />
      </div>
    </div>
  );
}
