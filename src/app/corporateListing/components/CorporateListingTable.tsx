'use client';

import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CorporateListingType } from "../types";
import { API_URLS } from "../consts";
import { CorporateDetailModal } from "./CorporateDetailModal";

/**
 * CorporateListingTable
 * 
 * 法人一覧データをテーブル形式で表示し、ページネーションとダウンロード機能を提供する。
 * 
 */
export function CorporateListingTable({ items }: { items: CorporateListingType[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [detailData, setDetailData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDetail = async (id: number) => {
    try {
      const response = await fetch(API_URLS.COPORATE_DETAIL(id));
      if (!response.ok) {
        throw new Error('詳細APIでエラーレスポンスが発生');
      }
      const data = await response.json();
      setDetailData(data.items);
      setIsModalOpen(true);
    } catch (error) {
      console.error('詳細データ取得エラー:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDetailData(null);
  };

  return (
    <div className='flex items-center py-4'>
      <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right rounded-tl-lg bg-[#fdebd9] border-b border-[#fdebd9]">No.</TableHead>
              <TableHead className="bg-[#fdebd9] border-b border-[#fdebd9]">CIC</TableHead>
              <TableHead className="bg-[#fdebd9] border-b border-[#fdebd9]">法人名</TableHead>
              <TableHead className="rounded-tr-lg bg-[#fdebd9] border-b border-[#fdebd9]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-right border-b border-muted">{item.id}</TableCell>
                <TableCell className="border-b border-muted">{item.cic}</TableCell>
                <TableCell className="border-b border-muted">{item.corporateName}</TableCell>
                <TableCell className="text-right border-b border-muted">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#eb7000] hover:bg-[#fdebd9] text-[#eb7000] hover:text-[#eb7000]　mr-2"
                    onClick={() => handleDetail(item.id)}
                  >
                    詳細
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#eb7000] hover:bg-[#fdebd9] text-[#eb7000] hover:text-[#eb7000]"
                    onClick={() => handleDetail(item.id)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CorporateDetailModal isOpen={isModalOpen} onClose={closeModal}>
        <h2>法人詳細</h2>
        {detailData ? (
          <div>
            <p>項目1: {detailData.aaa}</p>
            <p>項目2: {detailData.bbb}</p>
            <p>項目3: {detailData.ccc}</p>
          </div>
        ) : (
          <p>...</p>
        )}
      </CorporateDetailModal>

    </div>
  );
}
