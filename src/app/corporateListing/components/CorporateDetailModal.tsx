'use client';

import { Button } from "@/components/Button";
import { ModalPropsType } from "../types";

/**
 * CorporateDetailModalコンポーネント
 * 
 * 法人詳細を表示するモーダルダイアログを表します。
 * モーダルは、isOpenプロパティがtrueの場合に表示され、falseの場合は表示されません。
 * 
 */
export const CorporateDetailModal = ({ isOpen, onClose, children }: ModalPropsType) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-1/3">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={onClose}>×</button>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} className="bg-red-400 text-white">キャンセル</Button>
          <Button onClick={onClose} className="bg-blue-400 text-white">OK</Button>
        </div>
      </div>
    </div>
  );
};
