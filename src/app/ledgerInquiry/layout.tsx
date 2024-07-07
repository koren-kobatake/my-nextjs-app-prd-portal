import { Title } from '@/components/common/Title';
import { PAGE_TITLE_NAMES } from '@/app/consts';

/**
 * LedgerInquiryLayoutコンポーネント
 * 
 * 帳票照会ページのレイアウトを提供します。
 * 
 * 機能:
 * - `Title`コンポーネントを使用して、ページのタイトルを表示します。
 * - 子コンポーネントを含むコンテンツを表示します。
 * 
 * 使用例:
 * <LedgerInquiryLayout>
 *   <YourChildComponent />
 * </LedgerInquiryLayout>
 */
export default function LedgerInquiryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <Title title={PAGE_TITLE_NAMES.LEDGER_INQUIRY} />
      </div>
      {children}
    </div>
  );
}
