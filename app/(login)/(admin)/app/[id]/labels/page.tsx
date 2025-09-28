"use client"

import { IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity"
import { ProTableFilterVariant, ProTableFilterVariantKey } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import { useAppContext } from "../context"
import { labelList } from "@/actions/video/label/list"
import { ProTable } from "@/pro-components/pro-table"


export default () => {
    const columns: ColumnDef<IGappVideoLabelEntity>[] = [
        {
            header: "ID",
            accessorKey: "id",
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.numberInput
            }
        },
        {
            header: "标签ID",
            accessorKey: "labelId",
            enableSorting: false,
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.input
            }
        },
        {
            header: "标签名称",
            accessorKey: "labelName",
            enableColumnFilter: false,
            enableSorting: false,
        },
        {
            header: "标签分组",
            accessorKey: "groupType",
        },
        {
            header: "是否首页显示",
            accessorKey: "isHome",
        },
        {
            header: "排序",
            accessorKey: "orderNo",
            enableColumnFilter: false,
        },
        {
            header: "标签状态",
            accessorKey: "status",
        },
        {
            header: "标签背景图",
            accessorKey: "bgImageUrl",
            enableSorting: false,
            enableColumnFilter: false,
        },
    ]

    const appContext = useAppContext()

    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: any
        sorting: any
    }) => {
        const { data, total } = await labelList(appContext.appId, params)
        return {
            data: data,
            total: total,
        }
    }

    const onRequestExpanded = async (row: IGappVideoLabelEntity) => {

        return [{
            ...row,
            id: 9999,
        }] as IGappVideoLabelEntity[]
    }

    // const tableRef = useRef<ProTableRef>(null)
    // const header = (
    //     <div className="flex justify-end gap-2">
    //         <BannerUpsertDialog>
    //             <Button>添加</Button>
    //         </BannerUpsertDialog>
    //         <Button onClick={() => tableRef?.current?.refresh()} variant="outline">刷新</Button>
    //     </div>
    // )

    return <ProTable<IGappVideoLabelEntity>
        // ref={tableRef}
        // header={header}
        rowKey="id"
        columns={columns}
        defaultSorting={[{ id: 'orderNo', desc: true }]}
        onRequest={onRequest}
    />
}