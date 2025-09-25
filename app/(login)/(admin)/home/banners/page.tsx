"use client"

import { BannerActions } from "@/app/actions/home/banner"
import { BannerPosition, IBannerEntity } from "@/lib/dao/biz/banner"
import { ProTable } from "@/pro-components/pro-table"
import { ColumnDef } from "@tanstack/react-table"

export default () => {

    const columns: ColumnDef<IBannerEntity>[] = [
        {
            header: "ID",
            accessorKey: "id",
            footer: props => {
                return (
                    <input
                        type="text"
                        placeholder={`筛选 ${props.column.id}...`}
                        // value={props.column.getFilterValue() ?? ''}
                        onChange={e => props.column.setFilterValue(e.target.value)}
                    />
                )
            },
        },
        {
            header: "名称",
            accessorKey: "name",

        },
        {
            header: "图片",
            accessorKey: "imageURL",
            filterFn: "equalsString",
            footer: () => {
                return "图片"
            },
            cell: info => <img src={info.getValue() as string} className="w-32 h-16 object-cover" />
        },
        {
            header: "排序",
            accessorKey: "orderNo",
            enableSorting: false,
            enableColumnFilter: false,
        },
    ]



    const onRequest = async () => {
        const result = await BannerActions.getBanners(BannerPosition.home)
        return {
            data: result,
            total: result.length,
        }
    }


    return <ProTable columns={columns} onRequest={onRequest} />
}