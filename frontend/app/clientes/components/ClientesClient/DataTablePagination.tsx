"use client"

import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-t bg-white">

      <div className="text-sm text-muted-foreground">
        Mostrando{" "}
        <strong>{table.getRowModel().rows.length}</strong>{" "}
        de{" "}
        <strong>{table.getFilteredRowModel().rows.length}</strong>{" "}
        registros
      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2">
          <span className="text-sm">
            Filas por página
          </span>

          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="w-20 rounded-none">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {[5, 10, 20, 30, 50].map((size) => (
                <SelectItem
                  key={size}
                  value={`${size}`}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm">
          Página{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1}
          </strong>{" "}
          de{" "}
          <strong>
            {table.getPageCount()}
          </strong>
        </div>

        <div className="flex items-center gap-2">

          <Button
            variant="outline"
            size="icon"
            className="rounded-none"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-none"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-none"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-none"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>

        </div>

      </div>

    </div>
  )
}