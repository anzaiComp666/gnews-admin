"use client"

import { TableDateCellRender } from "@/components/table-cell-render/date"
import { HomeFeedModuleVideoStatus, HomeFeedModuleVideoStatusTextMap, IHomeFeedModuleVideoEntity } from "@/lib/dao/app/home-feed-module-video"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import { useAppContext } from "../../../context"
import { homeFeedModuleVideoList } from "@/actions/app/home-feed-module-video/list"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { useRef } from "react"

interface Props {
    moduleId: number
}

export const HomeFeedModuleVideoPage = (props: Props) => {
    const columns: ColumnDef<IHomeFeedModuleVideoEntity>[] = [
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
            meta: {
                ...makeFilterVariant({ type: "input" })
            }
        },
        {
            header: "排序",
            accessorKey: "orderNo",
            enableColumnFilter: false,
        },
        {
            header: "状态",
            accessorKey: "status",
            cell: info => HomeFeedModuleVideoStatusTextMap[info.getValue() as HomeFeedModuleVideoStatus],
            meta: {
                ...makeFilterVariant({
                    type: 'select',
                    options: [
                        { label: '显示', value: HomeFeedModuleVideoStatus.active },
                        { label: '隐藏', value: HomeFeedModuleVideoStatus.inactive },
                    ]
                })
            }
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
    ]

    const appContext = useAppContext()

    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: any
        sorting: any
    }) => {
        const { data, total } = await homeFeedModuleVideoList(appContext.appId, {
            ...params,
            moduleId: props.moduleId,
        })
        return {
            data: data,
            total: total,
        }
    }

    const tableRef = useRef<ProTableRef>(null)
    // const header = (
    //     <div className="flex justify-end gap-2">
    //         <HomeFeedModuleUpsertDialog>
    //             <Button>添加</Button>
    //         </HomeFeedModuleUpsertDialog>
    //         <Button onClick={() => tableRef?.current?.refresh()} variant="outline">刷新</Button>
    //     </div>
    // )



    return <ProTable<IHomeFeedModuleVideoEntity>
        ref={tableRef}
        rowKey="id"
        // header={header}
        columns={columns}
        defaultSorting={[{ id: 'orderNo', desc: true }]}
        onRequest={onRequest}
    />
}