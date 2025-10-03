"use client"

import { Button } from "@/components/ui/button"
import { CellContext } from "@tanstack/react-table"
import { INotificationEntity } from "@/lib/dao/app/notification-type"
import { NotificationUpsertDialog } from "../dialog/upsert"
import { ProPopoverConfirm } from "@/pro-components/pro-popover-confirm"
import { ProButton } from "@/pro-components/pro-button"
import { useProTable } from "@/pro-components/pro-table/context"
import { useAppContext } from "../../context"
import { useTransition } from "react"
import { ToastUtil } from "@/lib/toastutil"
import { notificationDelete } from "@/actions/app/notification/delete"

interface Props {
    parentId?: string
    info: CellContext<INotificationEntity, unknown>
}

export const ActionsCell = (props: Props) => {
    const { info } = props
    const table = useProTable()
    const app = useAppContext()
    const [isPending, startTransition] = useTransition()
    const onDelete = () => {
        startTransition(async () => {
            try {
                await notificationDelete(app.appId, info.row.original.id)
                table.refresh()
            } catch (error) {
                ToastUtil.error(error)
            }
        })
    }

    return (
        <div className="flex space-x-2">
            <NotificationUpsertDialog entity={info.row.original}>
                <Button variant="outline" size="sm">编辑</Button>
            </NotificationUpsertDialog>
            <ProPopoverConfirm title="确认删除该通知吗？" onConfirm={onDelete}>
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
