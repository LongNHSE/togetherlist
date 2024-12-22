'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserType } from '@/lib/schema/user.schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { useEffect, useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends UserType, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [numberOfPremium, setNumberOfPremium] = useState<number>(0);
  const [numberOfFree, setNumberOfFree] = useState<number>(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });
  const countNumber = () => {
    let freeUser = 0;
    let premiunUser = 0;
    const users: UserType[] = data;
    users.forEach((el) => {
      if (
        el?.subscriptionPlan?.subscriptionType.name.toLowerCase() === 'premium'
      ) {
        premiunUser += 1;
      } else {
        freeUser += 1;
      }
    });
    setNumberOfFree(freeUser);
    setNumberOfPremium(premiunUser);
  };
  useEffect(() => {
    countNumber();
  }, [data]);
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex items-center py-4">
          <select
            value={
              (table
                .getColumn('subscriptionPlan_subscriptionType.name')
                ?.getFilterValue() as string) ?? ''
            }
            onChange={(event) => {
              table
                .getColumn('subscriptionPlan_subscriptionType.name')
                ?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          >
            <option value="">All</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="flex flex-col space-y-5">
          <div>Number of Free user: {numberOfFree}</div>
          <div>Number of Premium user: {numberOfPremium}</div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="mt-5 py-6 px-5 w-screen text-center align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
