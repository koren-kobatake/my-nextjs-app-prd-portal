'use client';

import '@/styles/globals.css';
import { CorporateMasterTable } from "./components/CorporateMasterTable";
import { useCorporateMaster } from "./useCorporateMaster";
import { MessageArea } from "@/components/common/MessageArea";

/**
 * CorporateMasterPageコンポーネント
 * 
 * 法人マスタ一覧ページを表し、法人マスタデータのテーブルを表示します。
 * 
 * 機能:
 * - `useCorporateMaster`カスタムフックを使用して法人マスタ一覧データを取得します。
 * - 取得した帳票データを`CorporateMaster`コンポーネントに渡して表示します。
 * 
 * 使用例:
 * <CorporateMasterPage />
 */
export default function CorporateMasterPage() {
  const { corporateMasterItems, loading, messageArea } = useCorporateMaster();

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
        <CorporateMasterTable items={corporateMasterItems} />
      </div>
    </div>
  );
}
