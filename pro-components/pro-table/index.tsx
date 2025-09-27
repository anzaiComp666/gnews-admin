import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, PaginationState, SortingState, useReactTable } from "@tanstack/react-table"
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { ProSpinner } from "../pro-spinner"
import { ProTableHeaderRender } from "./header-render"
import { ProPagination } from "../pro-pagination"
import { ProTableFilterForm } from "./filter-form"
import { ProTableContext } from "./context"


export interface ProTableRef {
    refresh: () => Promise<void>
}

interface Props<T> {
    // table instance ref
    ref?: React.Ref<ProTableRef>

    // header
    header?: React.ReactNode

    // table columns
    columns: ColumnDef<T>[]

    // 数据请求
    onRequest?: (params: {
        page: number,
        pageSize: number
        columnFilters: ColumnFiltersState
        sorting: SortingState
    }) => Promise<{ data: T[]; total: number }>

    // 默认排序
    defaultSorting?: SortingState
}

export const ProTable = forwardRef(<T,>(props: Props<T>, ref: React.Ref<ProTableRef>) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [sorting, setSorting] = useState<SortingState>(props.defaultSorting ?? [])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const didInit = useRef(false)

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
        if (!didInit.current) {
            table.setPageSize(loadPageSize('pro-table-page-size'))
            didInit.current = true
            return
        }
        requestData()
    }, [sorting, columnFilters, pagination])

    useImperativeHandle(ref, () => {
        return {
            refresh: requestData
        }
    }, [requestData])

    return (
        <ProTableContext.Provider value={{
            refresh: requestData,
        }}>
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
                            savePageSize('pro-table-page-size', pageSize)
                        }}

                        page={pagination.pageIndex + 1}
                        onPageChange={(page) => {
                            table.setPageIndex(page - 1)
                        }}
                    />
                </div>
            </ProSpinner>
        </ProTableContext.Provider>
    )
}) as <T>(props: Props<T>) => React.ReactNode;


const loadPageSize = (key: string): number => {
    try {
        const value = localStorage.getItem(key)
        if (value) {
            return parseInt(value)
        }
    } catch (error) {
        console.error("load pagination state error:", error)
    }
    return 10
}

const savePageSize = (key: string, pageSize: number) => {
    try {
        localStorage.setItem(key, pageSize.toString())
    } catch (error) {
        console.error("save pagination state error:", error)
    }
}