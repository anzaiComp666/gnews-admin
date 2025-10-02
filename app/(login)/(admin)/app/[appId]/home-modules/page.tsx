"use client"

import { TableDateCellRender } from "@/components/table-cell-render/date"
import { HomeFeedModuleStatus, HomeFeedModuleStatusTextMap } from "@/lib/dao/app/home-feed-module"
import { JumpTypeOptions } from "@/lib/types/jump-type"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import { useAppContext } from "../context"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { useRef } from "react"
import { homeFeedModuleList, IHomeFeedModuleEntityWithCount } from "@/actions/app/home-feed-module/list"
import { ActionsCell } from "./cell/acions"
import { HomeFeedModuleUpsertDialog } from "./upsert-dialog"
import { Button } from "@/components/ui/button"
import { VideoCountCell } from "./cell/video-count"

export default () => {
    const columns: ColumnDef<IHomeFeedModuleEntityWithCount>[] = [
        {
            header: "ID",
            accessorKey: "id",
            meta: {
                ...makeFilterVariant({ type: 'number-input' })
            }
        },
        {
            header: "名称",
            accessorKey: "name",
            meta: {
                ...makeFilterVariant({ type: "input" })
            }
        },
        {
            header: "状态",
            accessorKey: "status",
            cell: info => HomeFeedModuleStatusTextMap[info.getValue() as HomeFeedModuleStatus],
            meta: {
                ...makeFilterVariant({
                    type: 'select',
                    options: [
                        { label: '显示', value: HomeFeedModuleStatus.active },
                        { label: '隐藏', value: HomeFeedModuleStatus.inactive },
                    ]
                })
            }
        },
        {
            header: "排序",
            accessorKey: "orderNo",
            enableColumnFilter: false,
        },
        {
            header: "跳转类型",
            accessorKey: "jumpType",
            cell: info => JumpTypeOptions.find(item => item.value === info.getValue())?.label || info.getValue(),
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
            header: "关联视频数",
            accessorKey: "videoCount",
            enableColumnFilter: false,
            cell: info => <VideoCountCell info={info} />
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
            header: "更新时间",
            accessorKey: "updatedAt",
            enableColumnFilter: false,
            cell: info => <TableDateCellRender value={info.getValue()} />
        },
        {
            header: "操作",
            enableSorting: false,
            enableColumnFilter: false,
            cell: info => <ActionsCell info={info} />
        }
    ]

    const appContext = useAppContext()

    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: any
        sorting: any
    }) => {
        const { data, total } = await homeFeedModuleList(appContext.appId, params)
        return {
            data: data,
            total: total,
        }
    }

    const tableRef = useRef<ProTableRef>(null)
    const header = (
        <div className="flex justify-end gap-2">
            <HomeFeedModuleUpsertDialog>
                <Button>添加</Button>
            </HomeFeedModuleUpsertDialog>
            <Button onClick={() => tableRef?.current?.refresh()} variant="outline">刷新</Button>
        </div>
    )



    return <ProTable<IHomeFeedModuleEntityWithCount>
        ref={tableRef}
        rowKey="id"
        header={header}
        columns={columns}
        defaultSorting={[{ id: 'orderNo', desc: true }]}
        onRequest={onRequest}
    />
}