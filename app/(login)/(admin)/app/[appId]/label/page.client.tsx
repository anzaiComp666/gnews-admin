"use client"

import { GappVideoLabelEntity, GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap, GappVideoLabelStatus, GappVideoLabelStatusTextMap } from "@/lib/dao/video/gapp_video_label.entity"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"
import { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { useAppContext } from "../context"
import { labelList } from "@/actions/video/label/list"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { enumToOptions } from "@/lib/enumutil"
import { ActionsCell } from "./cell/acions"
import { ChildrenCell } from "./cell/children-count"
import { LabelUpsertDialog } from "./dialogs/upsert"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { LabelChildrenAddDialog } from "./dialogs/children-add"


interface Props {
    parentId?: string
}

export const LabelsPage = (props: Props) => {
    const columns: ColumnDef<GappVideoLabelEntity>[] = [
        {
            header: "ID",
            accessorKey: "id",
            meta: {
                ...makeFilterVariant({
                    type: 'input'
                })
            }
        },
        {
            header: "标签ID",
            accessorKey: "labelId",
            enableSorting: false,
            meta: {
                ...makeFilterVariant({
                    type: 'input'
                })
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
                ...makeFilterVariant({
                    type: 'select',
                    options: enumToOptions(GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap)
                })
            }
        },
        {
            header: "是否首页显示",
            accessorKey: "isHome",
            cell: info => info.getValue() ? "是" : "否",
            meta: {
                ...makeFilterVariant({
                    type: 'checkbox'
                })
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
                ...makeFilterVariant({
                    type: 'select',
                    options: enumToOptions(GappVideoLabelStatus, GappVideoLabelStatusTextMap)
                })
            }
        },
        {
            header: "标签背景图",
            accessorKey: "bgImageUrl",
            enableSorting: false,
            enableColumnFilter: false,
        },
        {
            header: "子标签数",
            accessorKey: "childrenCount",
            enableSorting: true,
            enableColumnFilter: true,
            cell: info => <ChildrenCell info={info} />,
            meta: {
                ...makeFilterVariant({
                    type: 'select',
                    options: [
                        { label: '有子标签', value: 'has' },
                        { label: '无子标签', value: 'no' },
                    ]
                })
            }
        },
        {
            header: "操作",
            enableSorting: false,
            enableColumnFilter: false,
            cell: info => <ActionsCell parentId={props.parentId} info={info} />
        }
    ]

    const appContext = useAppContext()

    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: ColumnFiltersState
        sorting: SortingState
    }) => {
        const { data, total } = await labelList(appContext.appId, {
            ...params,
            parentId: props.parentId,
        })
        return {
            data: data,
            total: total,
        }
    }


    const tableRef = useRef<ProTableRef>(null)

    const header = (
        <div className="flex justify-end gap-2">
            <LabelUpsertDialog>
                <Button>添加</Button>
            </LabelUpsertDialog>

            <LabelChildrenAddDialog parentId={props.parentId ?? ""}>
                <Button className="aria-hidden:hidden" aria-hidden={props.parentId == null}>
                    添加子标签
                </Button>
            </LabelChildrenAddDialog>

            <Button onClick={() => tableRef?.current?.refresh()} variant="outline">
                刷新
            </Button>
        </div>
    )

    return <ProTable<GappVideoLabelEntity>
        ref={tableRef}
        header={header}
        rowKey="id"
        columns={columns}
        defaultSorting={[
            { id: 'orderNo', desc: true },
        ]}
        onRequest={onRequest}
    />
}