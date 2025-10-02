"use client"

import { Button } from "@/components/ui/button"
import { CellContext } from "@tanstack/react-table"
import { HomeFeedModuleUpsertDialog } from "../upsert-dialog"
import { useTransition } from "react"
import { homeFeedModuleDelete } from "@/actions/app/home-feed-module/delete"
import { useAppContext } from "../../context"
import { ToastUtil } from "@/lib/toastutil"
import { ProButton } from "@/pro-components/pro-button"
import { ProPopoverConfirm } from "@/pro-components/pro-popover-confirm"
import { useProTable } from "@/pro-components/pro-table/context"
import { IHomeFeedModuleEntityWithCount } from "@/actions/app/home-feed-module/list"

interface Props {
    parentId?: string
    info: CellContext<IHomeFeedModuleEntityWithCount, unknown>
}

export const ActionsCell = (props: Props) => {
    const { info } = props
    const table = useProTable()
    const app = useAppContext()
    const [isPending, startTransition] = useTransition()
    const onDelete = () => {
        startTransition(async () => {
            try {
                await homeFeedModuleDelete(app.appId, info.row.original.id)
                table.refresh()
            } catch (error) {
                ToastUtil.error(error)
            }
        })
    }

    return (
        <div className="flex space-x-2">
            <HomeFeedModuleUpsertDialog entity={info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </HomeFeedModuleUpsertDialog>
            <ProPopoverConfirm title="确认删除该模块吗？" onConfirm={onDelete}>
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
