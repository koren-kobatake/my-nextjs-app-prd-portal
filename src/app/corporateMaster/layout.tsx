import { Title } from '@/components/common/Title';
import { CORPORATE_TITLE_NAMES } from '@/app/corporateMaster/consts';

export default function LedgerInquiryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5">
        <Title title={CORPORATE_TITLE_NAMES.COPORATE_MASTER_LISTING} />
      </div>
      {children}
    </div>
  );
}
