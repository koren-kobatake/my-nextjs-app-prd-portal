import { Header } from '@/components/common/Header'
import { Title } from '@/components/common/Title'

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
  