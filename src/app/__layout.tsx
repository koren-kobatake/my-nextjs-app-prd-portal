import '@/styles/globals.css'
import { ReactNode } from 'react';
import ErrorBoundary from '../components/errorBoundary';
import { Header } from '@/components/header'
import { HeaderForBack } from '@/components/headerForBack'
import { Footer } from '@/components/footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        <ErrorBoundary>
          {/* <Header /> */}
          <HeaderForBack />
            <div className='flex-grow'>
              <main className='flex-grow'>{children}</main>
            </div>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
