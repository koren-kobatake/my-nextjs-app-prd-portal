import '@/styles/globals.css'
import { Footer } from '@/components/common/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex flex-col min-h-screen bg-gray-100'>
        {/* <Navbar />
        <NavMenu /> */}
        <div className='flex-grow'>
          <main className='flex-grow'>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
