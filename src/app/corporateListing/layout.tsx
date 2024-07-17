// import { Title } from '@/components/title';
// import { PAGE_TITLE_NAMES } from '@/app/consts_back/pageTitleNames';

/**
 * LedgerInquiryLayoutコンポーネント
 * 
 * このコンポーネントは、帳票照会ページのレイアウトを提供します。
 * 
 * 機能:
 * - `Title`コンポーネントを使用して、ページのタイトルを表示します。
 * - 子コンポーネントを含むコンテンツを表示します。
 * 
 * 使用例:
 * <LedgerInquiryLayout>
 *   <YourChildComponent />
 * </LedgerInquiryLayout>
 * 
 */
// export default function LedgerInquiryLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <div className="mb-5">
//         <Title title={PAGE_TITLE_NAMES.COPORATE_LISTING} />
//       </div>
//       {children}
//     </div>
//   );
// }

import '@/styles/globals.css'
import { ReactNode } from 'react';
import ErrorBoundary from '@/components/errorBoundary';
import { HeaderForBack } from '@/components/headerForBack'
import { Title } from '@/components/title';
import { PAGE_TITLE_NAMES } from '@/app/consts_back/pageTitleNames';

/**
 * CorporateListingLayoutコンポーネント
 * 
 * 法人一覧ページのレイアウトを定義します。
 * ヘッダー、エラーバウンダリー、タイトル、および子コンポーネントを含みます。
 * 
 * 使用例:
 * <CorporateListingLayout>
 *   <ChildComponent />
 * </CorporateListingLayout>
 */
export default function CorporateListingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        <ErrorBoundary>
          <HeaderForBack />
          <main className='flex-grow'>
            <div className="mb-5">
              <Title title={PAGE_TITLE_NAMES.COPORATE_LISTING} />
            </div>
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}