'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type PaginationState,
    type SortingState,
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { createUserColumns, type UserRow } from './users-columns';

interface UsersTableProps {
    data: UserRow[];
    currentUserId: string;
}

export function UsersTable({ data, currentUserId }: UsersTableProps) {
    const columns = useMemo(() => createUserColumns(currentUserId), [currentUserId]);

    const [sorting, setSorting] = useState<SortingState>([{ id: 'nome', desc: false }]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter, columnFilters, pagination },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    function resetPage() {
        setPagination((p) => ({ ...p, pageIndex: 0 }));
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-48 flex-1">
                    <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar usuários..."
                        value={globalFilter}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                            resetPage();
                        }}
                        className="pl-8"
                    />
                </div>

                <Select
                    onValueChange={(val) => {
                        table
                            .getColumn('role')
                            ?.setFilterValue(val === 'all' ? undefined : val);
                        resetPage();
                    }}
                >
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Papel" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os papéis</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Membro">Membro</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    onValueChange={(val) => {
                        table
                            .getColumn('ativo')
                            ?.setFilterValue(val === 'all' ? undefined : val === 'true');
                        resetPage();
                    }}
                >
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="true">Ativo</SelectItem>
                        <SelectItem value="false">Inativo</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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
                                    className="h-32 text-center text-muted-foreground"
                                >
                                    Nenhum usuário encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} usuário(s) · página{' '}
                    {table.getState().pagination.pageIndex + 1} de{' '}
                    {Math.max(table.getPageCount(), 1)}
                </p>
                <div className="flex items-center gap-1">
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
