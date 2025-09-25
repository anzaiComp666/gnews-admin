import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { ProSpinner } from "../pro-spinner"
import { ProTableHeaderRender } from "./header-render"

interface Props<T> {
    columns: ColumnDef<T>[]
    onRequest?: (params: any) => Promise<{ data: T[]; total: number }>
}

export const ProTable = <T,>(props: Props<T>) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data: data,
        columns: props.columns,
        state: {
            sorting,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,

        enableFilters: true,
        enableMultiSort: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const requestData = async () => {
        setIsLoading(true)
        try {
            const response = await props.onRequest?.({})
            setData(response?.data || [])
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        requestData()
    }, [sorting, columnFilters])

    useEffect(() => {
        requestData()
    }, [])

    return (
        <ProSpinner isLoading={isLoading}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => <ProTableHeaderRender key={header.id} header={header} />)}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </ProSpinner>
    )


}