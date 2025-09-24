import { Pagination, Select, SelectItem } from "@heroui/react"
import { useContext } from "react"
import { ProTableContext } from "../context"


export const ProTableBottomContent = () => {
    const context = useContext(ProTableContext)!

    return (
        <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
                <span className="whitespace-nowrap text-sm">总数量:{context.total}</span>
                <Select
                    className="w-[150px]"
                    variant="flat"
                    selectedKeys={[context.pageSize.toString()]}
                    onSelectionChange={key => {
                        if (key.currentKey) {
                            context.setPageSize(Number.parseInt(key.currentKey))
                        }
                    }}
                    aria-label="每页条数"
                >
                    <SelectItem key={"20"}>20条/页</SelectItem>
                    <SelectItem key={"50"}>50条/页</SelectItem>
                    <SelectItem key={"100"}>100条/页</SelectItem>
                </Select>
            </div>

            <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={context.page}
                total={Math.ceil(context.total / context.pageSize)}
                onChange={context.setPage}
            />
        </div>
    )
}