import { ReactNode } from "react";

// 帳票テーブル
export type CorporateListingType = {
  id: number;
  cic: string;
  corporateName: string;
}

// モーダル
export type ModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
