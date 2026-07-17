"use client"

import * as React from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"

import { DataTablePagination } from "./DataTablePagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onCreate: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onCreate,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">

      {/* BUSCADOR */}

      <div className="flex items-center">
        <Input

          placeholder="Buscar cliente..."
          value={
            (table
              .getColumn("nombre")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("nombre")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded-none bg-muted/50 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
        />

        <Button
          onClick={onCreate}
          className="rounded-none bg-green-600 hover:bg-green-700 cursor-pointer py-2 px-4 ml-2 flex items-center gap-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>



      </div>

      {/* TABLA */}

      <div className="overflow-hidden rounded-none border border-slate-200 bg-white shadow-sm">

        <Table>

          <TableHeader className="bg-slate-900">

            {table.getHeaderGroups().map((headerGroup) => (

              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <TableHead
                    key={header.id}
                    className="text-white uppercase font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>

                ))}

              </TableRow>

            ))}

          </TableHeader>

          <TableBody>

            {table.getRowModel().rows?.length ? (

              table.getRowModel().rows.map((row) => (

                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >

                  {row.getVisibleCells().map((cell) => (

                    <TableCell key={cell.id}>

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}

                    </TableCell>

                  ))}

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No existen clientes registrados.
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </div>

      <DataTablePagination table={table} />

    </div>
  )
}