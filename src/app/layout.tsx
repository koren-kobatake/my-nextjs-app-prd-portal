import '@/styles/globals.css'
import { ReactNode } from 'react';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        <ErrorBoundary>
          <Header />
          <div className='flex-grow'>
            <main className='flex-grow'>{children}</main>
          </div>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
