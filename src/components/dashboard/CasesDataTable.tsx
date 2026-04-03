'use client'

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import Link from 'next/link'
import { ArrowUpDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDate, STATUS_LABELS, STATUS_COLORS, PRIORITY_LABELS, PRIORITY_COLORS } from '@/lib/utils'

export function CasesDataTable({ data }: { data: any[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'case_number',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="-ml-4 font-semibold">
            Case #
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-mono text-[#0A1628] font-medium">{row.getValue('case_number')}</span>
    },
    {
      accessorFn: row => row.service?.name,
      id: 'service',
      header: 'Service',
      cell: ({ row }) => <span className="text-slate-600">{row.getValue('service')}</span>
    },
    {
      accessorFn: row => row.client?.full_name,
      id: 'client',
      header: 'Client',
      cell: ({ row }) => <span className="text-slate-600">{row.getValue('client')}</span>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}`}>{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</span>
      }
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const priority = row.getValue('priority') as string
        return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS]}`}>{PRIORITY_LABELS[priority as keyof typeof PRIORITY_LABELS]}</span>
      }
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => <span className="text-slate-400 text-sm">{formatDate(row.getValue('created_at'))}</span>
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <Link href={`/dashboard/cases/${row.original.id}`} className="text-[#C9A84C] font-medium hover:underline whitespace-nowrap">
            Open →
          </Link>
        )
      }
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4 mb-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Filter by Case #..."
            value={(table.getColumn('case_number')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('case_number')?.setFilterValue(event.target.value)}
            className="pl-9 bg-white focus-visible:ring-[#C9A84C]"
          />
        </div>
      </div>
      <div className="bg-white border text-sm border-slate-200 rounded-sm shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-slate-500">
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
