import { Button } from "@/components/ui/button"
import { IBannerEntity } from "@/lib/dao/app/banner"
import { CellContext } from "@tanstack/react-table"
import { BannerUpsertDialog } from "../upsert-dialog"
import { ProPopoverConfirm } from "@/pro-components/pro-popover-confirm"
import { useProTable } from "@/pro-components/pro-table/context"
import { useState } from "react"
import { ProButton } from "@/pro-components/pro-button"
import { ToastUtil } from "@/lib/toastutil"
import { bannerDelete } from "@/actions/app/banner/delete"
import { useAppContext } from "../../context"

interface Props {
    info: CellContext<IBannerEntity, unknown>
}

export const ActionsRender = (props: Props) => {

    const table = useProTable()
    const appContext = useAppContext()
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = async () => {
        setIsLoading(true)
        try {
            await bannerDelete(appContext.appId, { id: props.info.row.original.id })
            await table.refresh()
        } catch (error) {
            ToastUtil.error(error)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="flex space-x-2">
            <BannerUpsertDialog entity={props.info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </BannerUpsertDialog>

            <ProPopoverConfirm title="确认删除该轮播图吗？" onConfirm={onDelete}>
                <ProButton variant="destructive" size="sm" isLoading={isLoading}>删除</ProButton>
            </ProPopoverConfirm>
        </div>
    )

}