export const API_URLS = {
    LEDGER_LISTING: '/api/ledgerInquiry/listing',
    LEDGER_DOWNLOAD: (id: number) => `/api/ledgerInquiry/download?id=${id}`,
};

export const TITLE_NAMES = {
    LEDGER_INQUIRY: '帳票照会',
};
