import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { ProSpinner } from "../pro-spinner"
import { ProTableHeaderRender } from "./header-render"
import { ProPagination } from "../pro-pagination"
import { ProTableFilterForm } from "./filter-form"

interface Props<T> {
    header?: React.ReactNode
    columns: ColumnDef<T>[]
    onRequest?: (params: {
        page: number,
        pageSize: number
        columnFilters: ColumnFiltersState
        sorting: SortingState
    }) => Promise<{ data: T[]; total: number }>
}

export const ProTable = <T,>(props: Props<T>) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data: data,
        columns: props.columns,
        state: {
            sorting,
            columnFilters,
            pagination
        },

        getCoreRowModel: getCoreRowModel(),
        enableFilters: true,
        enableMultiSort: true,

        manualSorting: true,
        onSortingChange: setSorting,

        manualFiltering: true,
        onColumnFiltersChange: setColumnFilters,


        manualPagination: true,
        onPaginationChange: setPagination,
        rowCount: totalCount,
    })

    const requestData = async () => {
        setIsLoading(true)
        try {
            const response = await props.onRequest?.({
                page: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                columnFilters,
                sorting
            })
            setData(response?.data || [])
            setTotalCount(response?.total || 0)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        requestData()
    }, [sorting, columnFilters, pagination])

    return (
        <ProSpinner isLoading={isLoading} className="w-full h-full overflow-hidden">
            <div className="h-full flex flex-col p-2.5 gap-2.5">
                <ProTableFilterForm isPending={isLoading} columns={table.getAllColumns()} />
                {props.header}

                <div className="flex-1 p-2 overflow-auto rounded-md border">
                    <Table disableOverflow>
                        <TableHeader className="[&_tr]:border-none">
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow
                                    key={headerGroup.id}
                                    className={
                                        "[&_th:first-child]:rounded-l-lg [&_th:last-child]:rounded-r-lg"
                                    }
                                >
                                    {headerGroup.headers.map(header => (
                                        <ProTableHeaderRender key={header.id} header={header} />
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map(row => (
                                <TableRow className={`border-none ${row.index % 2 == 0 ? "bg-muted/50" : ""}`} key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            <div className="px-2">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>


                <ProPagination

                    totalCount={table.getRowCount()}
                    pageSize={pagination.pageSize}
                    onPageSizeChange={(pageSize) => {
                        table.setPageSize(pageSize)
                    }}

                    page={pagination.pageIndex + 1}
                    onPageChange={(page) => {
                        table.setPageIndex(page - 1)
                    }}
                />
            </div>
        </ProSpinner>
    )


}