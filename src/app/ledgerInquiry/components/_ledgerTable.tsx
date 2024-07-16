'use client';

import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/table";
import { Button } from "@/components/button";
import { LedgerTableType } from "../types";
import { API_URLS } from "@/app/consts/apiUrls";

/**
 * LedgerTable
 * 
 * 帳票データをテーブル形式で表示し、ページネーションとダウンロード機能を提供する。
 * 
 */
export function LedgerTable({ items }: { items: LedgerTableType[] }) {
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

  const handleDownload = async (id: number) => {
    try {
      const response = await fetch(API_URLS.LEDGER_DOWNLOAD(id));
      if (!response.ok) {
        throw new Error('ダウンロードAPIでエラーレスポンスが発生');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
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
                    onClick={() => handleDownload(item.id)}
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
