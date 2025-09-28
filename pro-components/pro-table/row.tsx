import { TableCell, TableRow } from "@/components/ui/table"
import { flexRender, Row } from "@tanstack/react-table"

interface Props<T> {
    row: Row<T>
    depth?: number
}



export const ProTableRow = <T,>(props: Props<T>) => {
    const { row, depth } = props

    return (
        <>
            <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id}>
                        <div className="flex flex-row items-center" style={{
                            paddingLeft: index == 0 ? (depth || 0) * 20 : 0,

                        }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    </TableCell>
                ))}
            </TableRow>
            {row.getIsExpanded() && row.subRows.map(subRow => (
                <ProTableRow
                    key={subRow.id}
                    row={subRow}
                    depth={(depth || 0) + 1}
                />
            ))}
        </>
    )
}