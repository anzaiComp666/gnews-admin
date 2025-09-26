import { TableHead } from "@/components/ui/table"
import { flexRender, Header } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"


interface Props<T> {
    header: Header<T, unknown>
}

export const ProTableHeaderRender = <T,>(props: Props<T>) => {
    const { header } = props

    const onClick = (event: any) => {
        header.column.getToggleSortingHandler()(event)
    }

    return (
        <TableHead className="sticky top-0 z-10 bg-gray-200" colSpan={header.colSpan} key={header.id}>
            {header.isPlaceholder ? null : (
                <div className="flex flex-col px-2">
                    <div
                        className="flex items-center gap-2 data-[sortable=false]:cursor-not-allowed data-sortable:cursor-pointer text-sm"
                        data-sortable={header.column.getCanSort()}
                        onClick={onClick}
                    >
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {{
                            asc: <ChevronUp />,
                            desc: <ChevronDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                    </div>
                </div>
            )}
        </TableHead>
    )
}