"use client"

import { NotificationEntity, NotificationType } from "@/lib/dao/app/notification"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import { useAppContext } from "../context"
import { notificationList } from "@/actions/app/notification/list"
import { useRef } from "react"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { INotificationEntity, NotificationTypeOptions, NotificationTypeTextMap } from "@/lib/dao/app/notification-type"
import { JumpType, JumpTypeOptions, JumpTypeTextMap } from "@/lib/types/jump-type"
import { JumpTextCell } from "./cell/jump-text"
import { ActionsCell } from "./cell/acions"
import { NotificationUpsertDialog } from "./dialog/upsert"
import { Button } from "@/components/ui/button"
import { TableDateCellRender } from "@/components/table-cell-render/date"

export default () => {

    const columns: ColumnDef<NotificationEntity>[] = [
        {
            header: "ID",
            accessorKey: "id",
            meta: {
                ...makeFilterVariant({ type: 'number-input' })
            }
        },
        {
            header: "通知类型",
            accessorKey: "type",
            cell: info => NotificationTypeTextMap[info.getValue() as NotificationType],
            meta: {
                ...makeFilterVariant({
                    type: 'select',
                    options: NotificationTypeOptions,
                })
            }
        },
        {
            header: "目标用户ID",
            accessorKey: "target",
            meta: {
                ...makeFilterVariant({ type: 'number-input' })
            }
        },
        {
            header: "通知标题",
            accessorKey: "title",
            enableSorting: false,
            meta: {
                ...makeFilterVariant({ type: "input" })
            }
        },
        {
            header: "通知内容",
            accessorKey: "content",
            enableSorting: false,
            enableColumnFilter: false,
        },
        {
            header: "跳转文本",
            accessorKey: "jumpText",
            cell: info => <JumpTextCell info={info} />,
            enableSorting: false,
            enableColumnFilter: false,
        },
        {
            header: "跳转类型",
            accessorKey: "jumpType",
            cell: info => JumpTypeTextMap[info.getValue() as JumpType],
            meta: {
                ...makeFilterVariant({
                    type: 'select',
                    options: JumpTypeOptions
                })
            }
        },
        {
            header: "跳转数据",
            accessorKey: "jumpData",
            enableSorting: false,
            enableColumnFilter: false,
        },
        {
            header: "创建时间",
            accessorKey: "createdAt",
            cell: info => <TableDateCellRender value={info.getValue()} />,
            meta: {
                ...makeFilterVariant({
                    type: 'date-range'
                })
            }
        },
        {
            header: "操作",
            cell: info => (
                <ActionsCell info={info} />
            )
        }
    ]

    const appContext = useAppContext()

    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: any
        sorting: any
    }) => {
        const { data, total } = await notificationList(appContext.appId, params)
        return {
            data: data,
            total: total,
        }
    }

    const tableRef = useRef<ProTableRef>(null)
    const header = (
        <div className="flex justify-end gap-2">
            <NotificationUpsertDialog>
                <Button>添加</Button>
            </NotificationUpsertDialog>
            <Button onClick={() => tableRef?.current?.refresh()} variant="outline">刷新</Button>
        </div>
    )



    return <ProTable<INotificationEntity>
        ref={tableRef}
        rowKey="id"
        header={header}
        columns={columns}
        defaultSorting={[{ id: 'id', desc: true }]}
        onRequest={onRequest}
    />
}