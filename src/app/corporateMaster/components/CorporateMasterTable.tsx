'use client';

import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CorporateMasterType } from "../types";
import { API_URLS } from "../consts";

/**
 * CorporateMasterTable
 * 
 * 法人マスタデータをテーブル形式で表示し、ページネーションとダウンロード機能を提供する。
 * 
 * @param {CorporateMasterType[]} props.items - 法人マスタデータの配列
 * 
 * @returns {JSX.Element} - テーブルコンポーネント
 */
export function CorporateMasterTable({ items }: { items: CorporateMasterType[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
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
      const response = await fetch(API_URLS.COPORATE_MASTER_DETAIL(id));
      if (!response.ok) {
        throw new Error('詳細APIでエラーレスポンスが発生');
      }
    } catch (error) {
      console.error('ファイルのダウンロードエラー:', error);
    }
  };

  return (
    <div className='flex items-center py-4'>
      <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right rounded-tl-lg bg-[#fdebd9] border-b border-[#fdebd9]">No.</TableHead>
              <TableHead className="bg-[#fdebd9] border-b border-[#fdebd9]">発行日</TableHead>
              <TableHead className="bg-[#fdebd9] border-b border-[#fdebd9]">書類名</TableHead>
              <TableHead className="rounded-tr-lg bg-[#fdebd9] border-b border-[#fdebd9]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-right border-b border-muted">{item.id}</TableCell>
                <TableCell className="border-b border-muted">{item.issueDate}</TableCell>
                <TableCell className="border-b border-muted">{item.documentName}</TableCell>
                <TableCell className="text-right border-b border-muted">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#eb7000] hover:bg-[#fdebd9] text-[#eb7000] hover:text-[#eb7000]"
                    onClick={() => handleDetail(item.id)}
                  >
                    ダウンロード
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
