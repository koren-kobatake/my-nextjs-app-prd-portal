// 帳票テーブル
export type LedgerTableType = {
  id: number;
  issueDate: string;
  documentName: string;
}

// メッセージ表示
export type MessageAreaType = {
  text: string;
  type: MessageType;
}
