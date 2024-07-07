// 帳票テーブル
export type CorporateListingType = {
  id: number;
  cic: string;
  corporateName: string;
}

// メッセージ表示
export type MessageAreaType = {
  text: string;
  type: MessageType;
}
