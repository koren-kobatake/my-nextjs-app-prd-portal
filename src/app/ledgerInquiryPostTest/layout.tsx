// import { Title } from '@/components/title';
// import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';

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
// export default function LedgerInquiryLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <div className="mb-5">
//         <Title title={PAGE_TITLE_NAMES.LEDGER_INQUIRY} />
//       </div>
//       {children}
//     </div>
//   );
// }


import '@/styles/globals.css'
import { ReactNode } from 'react';
import ErrorBoundary from '@/components/errorBoundary';
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Title } from '@/components/title';
import { PAGE_TITLE_NAMES } from '@/app/consts/pageTitleNames';

/**
 * LedgerInquiryLayoutコンポーネント
 * 
 * 帳票照会ページのレイアウトを定義します。
 * ヘッダー、フッター、エラーバウンダリー、タイトル、および子コンポーネントを含みます。
 * 
 * 使用例:
 * <LedgerInquiryLayout>
 *   <ChildComponent />
 * </LedgerInquiryLayout>
 */
export default function LedgerInquiryLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        <ErrorBoundary>
          <Header />
          <main className='flex-grow'>
            <div className="mb-5">
              <Title title={PAGE_TITLE_NAMES.LEDGER_INQUIRY} />
            </div>
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}