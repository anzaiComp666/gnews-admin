import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, getCoreRowModel, PaginationState, RowSelectionState, SortingState, useReactTable } from "@tanstack/react-table"
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { ProSpinner } from "../pro-spinner"
import { ProTableHeaderRender } from "./header-render"
import { ProPagination } from "../pro-pagination"
import { ProTableFilterForm } from "./filter-form"
import { ProTableContext } from "./context"
import { ProTableRow } from "./row"

export interface ProTableRef {
    refresh: () => Promise<void>
    getSelectedRows: () => Record<string, boolean>
}

interface Props<T> {
    // table instance ref
    ref?: React.Ref<ProTableRef>

    // row key
    rowKey?: string

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
    defaultSorting?: SortingState,

    // 是否启用行选择
    enableRowSelection?: boolean,
}

export const ProTable = forwardRef(<T,>(props: Props<T>, ref: React.Ref<ProTableRef>) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T[]>([])
    const [totalCount, setTotalCount] = useState(0)

    // table state
    const [sorting, setSorting] = useState<SortingState>(props.defaultSorting ?? [])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: loadPageSize('pro-table-page-size'),
    })

    const table = useReactTable({
        data: data,
        columns: props.columns,
        getRowId: (row, index) => {
            if (props.rowKey) {
                return (row as any)[props.rowKey]
            } else {
                return String(index)
            }

        },

        state: {
            sorting,
            columnFilters,
            pagination,
            rowSelection
        },

        getCoreRowModel: getCoreRowModel(),
        enableFilters: true,
        enableMultiSort: true,

        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,

        manualSorting: true,
        onSortingChange: setSorting,

        manualFiltering: true,
        onColumnFiltersChange: setColumnFilters,

        manualPagination: true,
        onPaginationChange: setPagination,
        rowCount: totalCount,


        debugTable: true,

    })

    // - 请求数据
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

    // - 初始化和状态变化时请求数据
    useEffect(() => {
        requestData()
    }, [sorting, columnFilters, pagination])


    // - 暴露给父组件的方法
    useImperativeHandle(ref, () => {
        return {
            refresh: requestData,
            getSelectedRows: () => rowSelection,
        }
    }, [requestData])

    return (
        <ProTableContext.Provider value={{
            refresh: requestData
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
                                    <ProTableRow
                                        key={row.id}
                                        row={row}
                                    />
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
    if (typeof window === 'undefined') {
        return 10
    }

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