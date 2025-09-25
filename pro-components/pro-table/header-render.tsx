import { TableHead } from "@/components/ui/table"
import { flexRender, Header } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"

interface Props<T> {
    header: Header<T, unknown>
}

export const ProTableHeaderRender = <T,>(props: Props<T>) => {
    const { header } = props
    // {...{
    //                     className: header.column.getCanSort()
    //                         ? 'cursor-pointer select-none'
    //                         : '',
    //                     onClick: header.column.getToggleSortingHandler(),
    //                 }}

    const onClick = (event: any) => {
        console.log("onClick", header.column.getCanSort())
        header.column.getToggleSortingHandler()(event)
    }
    return (
        <TableHead colSpan={header.colSpan} key={header.id}>
            {header.isPlaceholder ? null : (
                <div
                    className="flex items-center gap-2 data-[sortable=false]:cursor-not-allowed data-sortable:cursor-pointer"
                    data-sortable={header.column.getCanSort()}
                    onClick={onClick}
                >
                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                    )}
                    {{
                        asc: <ArrowUp />,
                        desc: <ArrowDown />,
                    }[header.column.getIsSorted() as string] ?? null}
                </div>
            )}
        </TableHead>
    )
}