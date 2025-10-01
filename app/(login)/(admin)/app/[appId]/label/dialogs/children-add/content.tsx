import { GappVideoLabelEntity, GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap, GappVideoLabelStatus, GappVideoLabelStatusTextMap } from "@/lib/dao/video/gapp_video_label.entity"
import { enumToOptions } from "@/lib/enumutil"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"
import { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { useAppContext } from "../../../context"
import { labelList } from "@/actions/video/label/list"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { useRef, useTransition } from "react"
import { labelChildrenAdd } from "@/actions/video/label/children-add"
import { ProButton } from "@/pro-components/pro-button"
import { ToastUtil } from "@/lib/toastutil"


interface Props {
    parentId: string,
    onConfirm?: () => void
}

export const LabelChildrenAddDialogContent = (props: Props) => {
    const columns: ColumnDef<GappVideoLabelEntity>[] = [
        {
            id: "selection",
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        },
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
        }
    ]

    const appContext = useAppContext()
    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: ColumnFiltersState
        sorting: SortingState
    }) => {


        const columnFilters = [
            ...params.columnFilters,
            {
                id: "childrenCount",
                value: "no"
            }
        ]
        const { data, total } = await labelList(appContext.appId, {
            ...params,
            columnFilters: columnFilters,
            parentId: props.parentId,
            isAddMode: true
        })
        return {
            data: data,
            total: total,
        }
    }


    const tableRef = useRef<ProTableRef>(null)
    const app = useAppContext()
    const [isPending, startTransition] = useTransition()

    const onConfirm = async () => {
        const selectedRows = tableRef?.current?.getSelectedRows() ?? {}
        const labelIds: string[] = []
        for (const key of Object.keys(selectedRows)) {
            if (selectedRows[key]) {
                labelIds.push(key)
            }
        }

        startTransition(async () => {
            try {
                await labelChildrenAdd(app.appId, {
                    parentId: props.parentId,
                    childrenLabelIds: labelIds
                })
                props.onConfirm?.()
            } catch (error) {
                ToastUtil.error(error)
            }
        })

    }

    return (
        <div className="overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden">
                <ProTable<GappVideoLabelEntity>
                    ref={tableRef}
                    rowKey="labelId"
                    columns={columns}
                    defaultSorting={[
                        { id: 'orderNo', desc: true },
                        { id: 'id', desc: false }
                    ]}
                    onRequest={onRequest}
                    enableRowSelection
                />
            </div>
            <div className="flex justify-center gap-2 p-4">
                <ProButton onClick={onConfirm} isLoading={isPending} disabled={isPending}>确定添加</ProButton>
            </div>
        </div>
    )
}