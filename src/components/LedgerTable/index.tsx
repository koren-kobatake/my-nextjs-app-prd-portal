// components/DataTableDemo.tsx
'use client'

import { useState } from "react"
import Link from "next/link"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"

export function LedgerTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const totalItems = 40
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = [
    { id: 1, issueDate: "2024-05-01", documentName: "XXXXXXXXXX" },
    { id: 2, issueDate: "2024-04-01", documentName: "YYYYYYYYYY" },
    { id: 3, issueDate: "2024-03-01", documentName: "ZZZZZZZZZZ" },
    { id: 4, issueDate: "2024-02-01", documentName: "XXXXXXXXXX" },
    { id: 5, issueDate: "2024-01-01", documentName: "YYYYYYYYYY" },
    { id: 6, issueDate: "2023-12-01", documentName: "ZZZZZZZZZZ" },
    { id: 7, issueDate: "2023-11-01", documentName: "XXXXXXXXXX" },
    { id: 8, issueDate: "2023-10-01", documentName: "YYYYYYYYYY" },
    { id: 9, issueDate: "2023-09-01", documentName: "ZZZZZZZZZZ" },
    { id: 10, issueDate: "2023-08-01", documentName: "XXXXXXXXXX" },
    { id: 11, issueDate: "2023-07-01", documentName: "XXXXXXXXXX" },
    { id: 12, issueDate: "2023-06-15", documentName: "YYYYYYYYYY" },
    // { id: 13, issueDate: "2023-05-01", documentName: "ZZZZZZZZZZ" },
    // { id: 14, issueDate: "2023-04-01", documentName: "XXXXXXXXXX" },
    // { id: 15, issueDate: "2023-03-01", documentName: "YYYYYYYYYY" },
    // { id: 16, issueDate: "2023-02-01", documentName: "ZZZZZZZZZZ" },
    // { id: 17, issueDate: "2023-01-01", documentName: "XXXXXXXXXX" },
    // { id: 18, issueDate: "2022-12-01", documentName: "YYYYYYYYYY" },
    // { id: 19, issueDate: "2022-11-01", documentName: "ZZZZZZZZZZ" },
    // { id: 20, issueDate: "2022-10-01", documentName: "XXXXXXXXXX" },
  ].slice(indexOfFirstItem, indexOfLastItem)
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='flex items-center py-4'>
      <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg my-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right rounded-tl-lg bg-[#ffefd5] border-b border-[#d4d5d5]">No.</TableHead>
            <TableHead className="bg-[#ffefd5] border-b border-[#d4d5d5]">発行日</TableHead>
            <TableHead className="bg-[#ffefd5] border-b border-[#d4d5d5]">帳票</TableHead>
            <TableHead className="rounded-tr-lg bg-[#ffefd5] border-b border-[#d4d5d5]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-right border-b border-muted">{item.id}</TableCell>
              <TableCell className="border-b border-muted">{item.issueDate}</TableCell>
              <TableCell className="border-b border-muted">{item.documentName}</TableCell>
              <TableCell className="text-right border-b border-muted">
                <Button size="sm" variant="outline" className="border-[#eb7000] hover:bg-[#eb7000]">
                  ダウンロード
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>

  )
}
