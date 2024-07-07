import Image from 'next/image';
import Link from 'next/link';
import { PAGE_TITLE_NAMES } from "@/app/corporateListing/consts";


/**
 * Headerコンポーネント
 * 
 * アプリケーションのヘッダー部分を表します。
 * 
 * 使用例:
 * <HeaderForBack />
 */
export const HeaderForBack = () => {
  return (
    <header className="px-4 lg:px-6 h-20 flex items-center bg-white">
      <div className="flex items-center">
        <Image src="/images/logo.png" alt="Logo" width={180} height={180} />
        <nav className="ml-8 flex space-x-4">
          <Link href="/corporateListing" className="text-lg font-medium text-gray-700 hover:text-gray-900">
            {PAGE_TITLE_NAMES.COPORATE_LISTING}
          </Link>
          <Link href="/ledgerMaster" className="text-lg font-medium text-gray-700 hover:text-gray-900">
            {PAGE_TITLE_NAMES.LEDGER_MASTER}
          </Link>
        </nav>
      </div>
    </header>
  );
};
