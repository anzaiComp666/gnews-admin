"use client"

import { IBannerEntity } from "@/lib/dao/biz/banner"
import { JumpTypeOptions } from "@/lib/types/jump-type"
import { ProTable, ProTableRef } from "@/pro-components/pro-table"
import { ProTableFilterVariant, ProTableFilterVariantKey } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ActionsRender } from "./columns/actions"
import { BannerUpsertDialog } from "./upsert-dialog"
import { bannerList } from "@/app/actions/banner/list"
import { useRef } from "react"
import { StatusRender } from "./columns/status"
import { PositionRender } from "./columns/position"
import { TableDateCellRender } from "@/components/table-cell-render/date"

export default () => {

    const columns: ColumnDef<IBannerEntity>[] = [
        {
            header: "ID",
            accessorKey: "id",
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.numberInput
            }
        },
        {
            header: "名称",
            accessorKey: "name",
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.input
            }
        },
        {
            header: "图片",
            accessorKey: "imageURL",
            enableColumnFilter: false,
            enableSorting: false,
            cell: info => (
                <img src={info.getValue() as string} className="w-32 h-16 object-cover" />
            )
        },
        {
            header: "状态",
            accessorKey: "status",
            cell: info => <StatusRender info={info} />,
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.select,
                [ProTableFilterVariantKey.filterSelectOptions]: [
                    { label: '激活', value: 'active' },
                    { label: '未激活', value: 'inactive' },
                ]
            }
        },
        {
            header: "位置",
            accessorKey: "position",
            cell: info => <PositionRender info={info} />,
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.select,
                [ProTableFilterVariantKey.filterSelectOptions]: [
                    { label: '首页', value: 'home' },
                ]
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
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.select,
                [ProTableFilterVariantKey.filterSelectOptions]: JumpTypeOptions
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
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.dateRange
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



    const onRequest = async (params: {
        page: number,
        pageSize: number
        columnFilters: any
        sorting: any
    }) => {
        const { data, total } = await bannerList(params)
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
        header={header}
        columns={columns}
        defaultSorting={[{ id: 'orderNo', desc: true }]}
        onRequest={onRequest}
    />
}