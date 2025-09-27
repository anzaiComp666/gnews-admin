"use client"

import { BannerPosition, IBannerEntity } from "@/lib/dao/biz/banner"
import { JumpTypeOptions } from "@/lib/types/jump-type"
import { ProTable } from "@/pro-components/pro-table"
import { ProTableFilterVariant, ProTableFilterVariantKey } from "@/pro-components/pro-table/filter-form"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { Button } from "@/components/ui/button"
import { ActionsRender } from "./columns/actions"
import { BannerUpsertDialog } from "./upsert-dialog"
import { bannerList } from "@/app/actions/banner/list"

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
            cell: info => {
                return info.getValue() === 'active' ? '激活' : '未激活'
            },
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.select,
                [ProTableFilterVariantKey.filterSelectOptions]: [
                    { label: '激活', value: 'active' },
                    { label: '未激活', value: 'inactive' },
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
            cell: info => dayjs(info.getValue() as string).format("YYYY-MM-DD HH:mm:ss"),
            meta: {
                [ProTableFilterVariantKey.filterVariant]: ProTableFilterVariant.dateRange
            }
        },
        {
            header: "更新时间",
            accessorKey: "updatedAt",
            enableSorting: false,
            enableColumnFilter: false,
            cell: info => dayjs(info.getValue() as string).format("YYYY-MM-DD HH:mm:ss")
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
        const result = await bannerList(BannerPosition.home)
        return {
            data: result,
            total: result.length,
        }
    }

    const header = (
        <div className="flex justify-end">
            <BannerUpsertDialog>
                <Button>添加</Button>
            </BannerUpsertDialog>
        </div>
    )

    return <ProTable
        header={header}
        columns={columns}
        onRequest={onRequest}
    />
}