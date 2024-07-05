import { Title } from '@/components/common/Title';
import { TITLE_NAMES } from '@/app/consts';

export default function LedgerInquiryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <Title title={TITLE_NAMES.LEDGER_INQUIRY} />
      </div>
      {children}
    </div>
  );
}
