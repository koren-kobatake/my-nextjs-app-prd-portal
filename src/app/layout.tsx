import '@/styles/globals.css'
import { Header } from '@/components/Header'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { NavMenu } from '@/components/NavMenu'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className='flex flex-col min-h-screen'>
        <Header />
        <div className='pt-16 flex-grow'>
          <Navbar />
          <NavMenu />
          <main className='flex-grow'>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
