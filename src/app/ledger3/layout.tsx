import { Header } from '@/components/Header'
import { Title } from '@/components/Title'
import { Navbar } from '@/components/Navbar'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
      <div >
        <Header />
        <div className="mb-5">
            <Title />
        </div>
        {children}
      </div>
    )
  }
  