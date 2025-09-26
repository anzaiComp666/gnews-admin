import { Button } from "@/components/ui/button"
import { IBannerEntity } from "@/lib/dao/biz/banner"
import { CellContext } from "@tanstack/react-table"
import { BannerUpsertDialog } from "../upsert-dialog"

interface Props {
    info: CellContext<IBannerEntity, unknown>
}

export const ActionsRender = (props: Props) => {
    return (
        <div className="flex space-x-2">
            <BannerUpsertDialog entity={props.info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </BannerUpsertDialog>

            <Button variant="destructive" size="sm">删除</Button>
        </div>
    )

}