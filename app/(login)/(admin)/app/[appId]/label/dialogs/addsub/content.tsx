import { GappVideoLabelEntity, GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap, GappVideoLabelStatus, GappVideoLabelStatusTextMap } from "@/lib/dao/video/gapp_video_label.entity"
import { enumToOptions } from "@/lib/enumutil"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"
import { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import { ChildrenCell } from "../../cell/children-count"
import { useAppContext } from "../../../context"
import { labelList } from "@/actions/video/label/list"
import { ProTable } from "@/pro-components/pro-table"
import { Button } from "@/components/ui/button"

export const AddSubLabelDialogContent = () => {
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
        console.log(params)
        const { data, total } = await labelList(appContext.appId, {
            ...params,
            columnFilters: columnFilters
        })
        return {
            data: data,
            total: total,
        }
    }


    // const tableRef = useRef<ProTableRef>(null)

    // const header = (
    //     <div className="flex justify-end gap-2">
    //         <LabelUpsertDialog>
    //             <Button>添加</Button>
    //         </LabelUpsertDialog>

    //         <AddSubLabelDialog>
    //             <Button className="aria-hidden:hidden" aria-hidden={props.labelId == null}>
    //                 添加子标签
    //             </Button>
    //         </AddSubLabelDialog>

    //         <Button onClick={() => tableRef?.current?.refresh()} variant="outline">
    //             刷新
    //         </Button>
    //     </div>
    // )

    return (
        <div className="overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden">
                <ProTable<GappVideoLabelEntity>
                    // ref={tableRef}
                    // header={header}
                    rowKey="id"
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
                <Button>确定添加</Button>
            </div>
        </div>
    )
}