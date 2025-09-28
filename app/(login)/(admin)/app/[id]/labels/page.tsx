"use client"

import { GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap, GappVideoLabelStatus, GappVideoLabelStatusTextMap, IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity"
import { ProTableFilterVariant, ProTableFilterVariantKey } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import { useAppContext } from "../context"
import { labelList } from "@/actions/video/label/list"
import { ProTable } from "@/pro-components/pro-table"
import { enumToOptions } from "@/lib/enumutil"


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
            enableSorting: false,
        },
        {
            header: "标签分组",
            accessorKey: "groupType",
            cell: info => GappVideoLabelGroupTypeTextMap[info.getValue() as GappVideoLabelGroupType],
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.select,
                [ProTableFilterVariantKey.filterSelectOptions]: enumToOptions(GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap)
            }
        },
        {
            header: "是否首页显示",
            accessorKey: "isHome",
            cell: info => info.getValue() ? "是" : "否",
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.select,
                [ProTableFilterVariantKey.filterSelectOptions]: [
                    { label: "是", value: 1 },
                    { label: "否", value: 0 },
                ]
            }
        },
        {
            header: "排序",
            accessorKey: "orderNo",
            enableColumnFilter: false,
        },
        {
            header: "标签状态",
            accessorKey: "status",
            cell: info => GappVideoLabelStatusTextMap[info.getValue() as GappVideoLabelStatus],
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.select,
                [ProTableFilterVariantKey.filterSelectOptions]: enumToOptions(GappVideoLabelStatus, GappVideoLabelStatusTextMap)
            }
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
        console.log(params)
        const { data, total } = await labelList(appContext.appId, params)
        return {
            data: data,
            total: total,
        }
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