"use client"

import { CellContext } from "@tanstack/react-table"
import { useTransition } from "react"
import { ToastUtil } from "@/lib/toastutil"
import { ProButton } from "@/pro-components/pro-button"
import { ProPopoverConfirm } from "@/pro-components/pro-popover-confirm"
import { useProTable } from "@/pro-components/pro-table/context"
import { homeFeedModuleVideoDelete } from "@/actions/app/home-feed-module-video/delete"
import { useAppContext } from "../../../../context"
import { IHomeFeedModuleVideoEntity } from "@/lib/dao/app/home-feed-module-video"
import { HomeFeedModuleVideoUpsertDialog } from "../dialog/upsert-dialog"
import { Button } from "@/components/ui/button"

interface Props {
    parentId?: string
    info: CellContext<IHomeFeedModuleVideoEntity, unknown>
}

export const ActionsCell = (props: Props) => {
    const { info } = props
    const table = useProTable()
    const app = useAppContext()
    const [isPending, startTransition] = useTransition()
    const onDelete = () => {
        startTransition(async () => {
            try {
                await homeFeedModuleVideoDelete(app.appId, info.row.original.id)
                table.refresh()
            } catch (error) {
                ToastUtil.error(error)
            }
        })
    }

    return (
        <div className="flex space-x-2">
            <HomeFeedModuleVideoUpsertDialog entity={info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </HomeFeedModuleVideoUpsertDialog>
            <ProPopoverConfirm title="确认删除该视频吗？" onConfirm={onDelete}>
                <ProButton
                    variant="destructive"
                    size="sm"
                    isLoading={isPending}
                    disabled={isPending}
                >
                    删除
                </ProButton>
            </ProPopoverConfirm>
        </div>
    )
}
