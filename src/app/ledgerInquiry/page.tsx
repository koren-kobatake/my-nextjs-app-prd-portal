'use client';

import { LedgerTable } from "./components/LedgerTable";
import { useLedgerInquiry } from "./useLedgerInquiry";

export default function LedgerInquiryPage() {
  const { ledgerItems } = useLedgerInquiry();

  return (
    <div className='container mx-auto bg-white mb-5'>
      <LedgerTable items={ledgerItems} />
    </div>
  );
}
