"use client"

import { IGappVideoEntity } from "@/lib/dao/video/gapp_video.entity"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import { useAppContext } from "../context"
import { videoList } from "@/actions/video/video/list"
import { useRef } from "react"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { DurationCell } from "./cell/duration"
import { Button } from "@/components/ui/button"

export default () => {
    const columns: ColumnDef<IGappVideoEntity>[] = [
        {
            header: "ID",
            accessorKey: "id",
            meta: {
                ...makeFilterVariant({ type: 'number-input' })
            }
        },
        {
            header: "视频ID",
            accessorKey: "videoId",
            enableSorting: false,
            meta: {
                ...makeFilterVariant({ type: 'input' })
            }
        },
        {
            header: "视频标题",
            accessorKey: "title",
            enableSorting: false,
            enableColumnFilter: false,
            meta: {
                ...makeFilterVariant({ type: 'input' })
            }
        },
        {
            header: "时长",
            accessorKey: "durationSec",
            cell: info => <DurationCell info={info} />,
            enableSorting: true,
            enableColumnFilter: false,
        },
        {
            header: "观看次数",
            accessorKey: "lookNum",
            enableSorting: true,
            enableColumnFilter: false,
        },
        {
            header: "点赞次数",
            accessorKey: "likeNum",
            enableSorting: true,
            enableColumnFilter: false,
        },
        {
            header: "是否收费",
            accessorKey: "gold",
            enableSorting: true,
            meta: {
                ...makeFilterVariant({
                    type: "checkbox"
                })
            }
        },

    ]

    const appContext = useAppContext()

    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: any
        sorting: any
    }) => {
        const { data, total } = await videoList(appContext.appId, params)
        return {
            data: data,
            total: total,
        }
    }

    const tableRef = useRef<ProTableRef>(null)
    const header = (
        <div className="flex justify-end gap-2">
            {/* <NotificationUpsertDialog>
                <Button>添加</Button>
            </NotificationUpsertDialog> */}
            <Button onClick={() => tableRef?.current?.refresh()} variant="outline">刷新</Button>
        </div>
    )



    return <ProTable<IGappVideoEntity>
        ref={tableRef}
        rowKey="id"
        header={header}
        columns={columns}
        defaultSorting={[{ id: 'id', desc: true }]}
        onRequest={onRequest}
    />
}