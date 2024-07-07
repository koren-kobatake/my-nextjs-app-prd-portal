import { Title } from '@/components/common/Title';
import { PAGE_TITLE_NAMES } from '@/app/corporateListing/consts';

export default function LedgerInquiryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <Title title={PAGE_TITLE_NAMES.LOGIN} />
      </div>
      {children}
    </div>
  );
}
