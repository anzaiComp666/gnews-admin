"use client"

import { SortDescriptor, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { ProTableBottomContent } from "./bottom-content"
import { LoadingContent } from "./loading-content"
import { NoSSR } from "@/app/_components/nossr"
import { ProTableTopContent, ProTableTopContentProps } from "./top-content"
import { IProTableColumn } from "./column"
import { ProTableContext } from "./context"
import { TableResultVo } from "@/app/_lib/models/table-result.vo"

interface Props {
    // 唯一标识每一行的键
    rowKey: string

    // 表格列定义
    columns: IProTableColumn<any>[]

    // 顶部内容的属性
    topContentProps?: ProTableTopContentProps

    // 请求数据的回调函数
    onRequest: (page: number, pageSize: number, sortDescriptor?: Record<string, any>, filters?: Record<string, any>) => Promise<TableResultVo<any> | undefined>
}

// ProTableRef 定义了 ProTable 组件暴露给父组件的方法
export interface ProTableRef {
    refresh: () => void
}

export const ProTable = forwardRef<ProTableRef, Props>((props, ref) => {
    const displayColumns = props.columns.filter(column => !column.hidden)

    const [items, setItems] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(getPageSizeFromLocalStorage())
    const [total, setTotal] = useState(1)
    const [sortDescriptor, setSortDescriptor] = useState(getDefaultSortDescriptor(displayColumns))
    const [filters, setFilters] = useState<Record<string, any>>(getDefaultFilter(displayColumns))
    const [isRequesting, setIsRequesting] = useState(false)
    const requestData = async () => {
        try {
            setIsRequesting(true)
            const formatSortDescriptor = sortDescriptor && {
                [sortDescriptor.column]: sortDescriptor.direction
            }
            const result = await props.onRequest(page, pageSize, formatSortDescriptor, filters)

            if (!result) {
                return
            }

            setItems(result.data)
            setTotal(result.total)
        } catch (error) {

        } finally {
            setIsRequesting(false)
        }
    }

    // 当 page, pageSize 或 sortDescriptor 变化时，重新加载数据
    useEffect(() => {
        requestData()
    }, [page, pageSize, sortDescriptor, filters])

    // 保存 pageSize 到 localStorage
    useEffect(() => {
        localStorage.setItem("pro-table-page-size", pageSize.toString())
    }, [pageSize])

    // 暴露 refresh 方法给父组件
    useImperativeHandle(ref, () => ({
        refresh: () => {
            requestData()
        }
    }), [page, pageSize, filters, sortDescriptor])

    // 底部内容
    const bottomContent = (
        <NoSSR>
            <ProTableBottomContent />
        </NoSSR>
    )


    // 顶部内容
    const topContent = (
        <ProTableTopContent
            {...props.topContentProps}
        />
    )

    return (
        <ProTableContext.Provider value={{
            columns: props.columns,
            page: page,
            setPage: setPage,
            pageSize: pageSize,
            setPageSize: setPageSize,
            total: total,
            isRequesting: isRequesting,
            refresh: () => {
                requestData()
            },
            filters: filters,
            setFilters: setFilters
        }}>
            <Table
                classNames={{
                    base: "h-full",
                    wrapper: "h-full",
                }}
                topContent={topContent}
                topContentPlacement="outside"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                isStriped
                isHeaderSticky
                sortDescriptor={sortDescriptor}
                onSortChange={(sort) => {
                    setSortDescriptor(sort)
                }}
                aria-label="Pro Table"
            >
                <TableHeader columns={displayColumns}>
                    {column => (
                        <TableColumn key={column.dataIndex.toString()} className="text-left" allowsSorting={column.sortable}>
                            {column.title}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items} isLoading={isRequesting} loadingContent={<LoadingContent />}>
                    {(item) => (
                        <TableRow key={item[props.rowKey]}>
                            {displayColumns.map(column => (
                                <TableCell key={column.dataIndex.toString()}>
                                    {column.render ? column.render(item) : item[column.dataIndex]?.toString()}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </ProTableContext.Provider>
    )
})


const getPageSizeFromLocalStorage = () => {
    if (typeof window === "undefined") {
        return 0 // 默认值
    }

    const pageSize = localStorage.getItem("pro-table-page-size")
    return pageSize ? parseInt(pageSize) : 20
}

const getDefaultSortDescriptor = (columns: IProTableColumn<any>[]): SortDescriptor | undefined => {
    const column = columns.find(column => column.defaultSortDirection && column.sortable)
    if (!column || !column.defaultSortDirection) {
        return
    }
    return {
        column: column.dataIndex.toString(),
        direction: column.defaultSortDirection
    }
}

const getDefaultFilter = (columns: IProTableColumn<any>[]): Record<string, any> => {
    const filters: Record<string, any> = {}
    const filterColumns = columns.filter(column => column.filterVariant !== undefined)
    for (const column of filterColumns) {
        switch (column.filterVariant) {
            case 'range-slider':
                filters[column.dataIndex.toString()] = [
                    column.filterSliderProps?.min ?? 0,
                    column.filterSliderProps?.max ?? 100
                ]
                break;

            case 'slider':
                filters[column.dataIndex.toString()] = column.filterSliderProps?.min ?? 0
                break;

            default:
                break;
        }
    }
    return filters
}