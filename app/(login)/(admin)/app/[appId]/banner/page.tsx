"use client"

import { BannerPosition, IBannerEntity } from "@/lib/dao/app/banner"
import { JumpTypeOptions } from "@/lib/types/jump-type"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ActionsRender } from "./columns/actions"
import { BannerUpsertDialog } from "./upsert-dialog"
import { useEffect, useRef } from "react"
import { StatusRender } from "./columns/status"
import { PositionRender } from "./columns/position"
import { TableDateCellRender } from "@/components/table-cell-render/date"
import { ProImage } from "@/pro-components/pro-image"
import { bannerList } from "@/actions/app/banner/list"
import { useAppContext } from "../context"
import { makeFilterVariant } from "@/pro-components/pro-table/filter-form"


export default () => {

    const columns: ColumnDef<IBannerEntity>[] = [
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
            header: "图片",
            accessorKey: "imageURL",
            enableColumnFilter: false,
            enableSorting: false,
            cell: info => (
                <ProImage src={info.getValue() as string} className="w-32 h-16 object-cover" />
            )
        },
        {
            header: "状态",
            accessorKey: "status",
            cell: info => <StatusRender info={info} />,
            meta: {
                ...makeFilterVariant({
                    type: 'select',
                    options: [
                        { label: '激活', value: 'active' },
                        { label: '未激活', value: 'inactive' },
                    ]
                })
            }
        },
        {
            header: "位置",
            accessorKey: "position",
            cell: info => <PositionRender info={info} />,
            meta: {
                ...makeFilterVariant({
                    type: 'select',
                    options: [
                        { label: '首页', value: BannerPosition.home },
                    ]
                })
            }
        },
        {
            header: "排序",
            accessorKey: "orderNo",
            enableSorting: false,
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
            enableSorting: false,
            enableColumnFilter: false,
            cell: info => <TableDateCellRender value={info.getValue()} />
        },
        {
            header: "操作",
            enableSorting: false,
            enableColumnFilter: false,
            cell: info => <ActionsRender info={info} />
        }
    ]

    const appContext = useAppContext()

    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: any
        sorting: any
    }) => {
        const { data, total } = await bannerList(appContext.appId, params)
        return {
            data: data,
            total: total,
        }
    }

    const tableRef = useRef<ProTableRef>(null)
    const header = (
        <div className="flex justify-end gap-2">
            <BannerUpsertDialog>
                <Button>添加</Button>
            </BannerUpsertDialog>
            <Button onClick={() => tableRef?.current?.refresh()} variant="outline">刷新</Button>
        </div>
    )



    return <ProTable<IBannerEntity>
        ref={tableRef}
        rowKey="id"
        header={header}
        columns={columns}
        defaultSorting={[{ id: 'orderNo', desc: true }]}
        onRequest={onRequest}
    />
}