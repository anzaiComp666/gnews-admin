"use server"

import { dataSources } from "@/lib/dao";
import { BannerEntity, IBannerEntity } from "@/lib/dao/biz/banner";
import { instanceToPlain } from "class-transformer";
import { authVerify } from "../auth/verify";
import { TableListSchema, TableListSchemaType } from "@/schema/table-list.schema";
import { Between, FindOptionsWhere } from "typeorm";
import { isDateRange } from "react-day-picker";


export async function bannerList(data: TableListSchemaType) {
    await authVerify()
    console.log(data)
    const params = TableListSchema.parse(data)

    const order: Record<string, "ASC" | "DESC"> = {}
    for (const item of params.sorting) {
        order[item.id] = item.desc ? "DESC" : "ASC"
    }

    const where: FindOptionsWhere<BannerEntity> = {}
    for (const filter of params.columnFilters) {
        switch (filter.id) {
            case "createdAt":
                if (isDateRange(filter.value)) {
                    where.createdAt = Between(filter.value.from!, filter.value.to!)
                }
                break;

            default:
                where[filter.id as keyof BannerEntity] = filter.value
                break
        }
    }


    const [entities, total] = await dataSources.biz.withDataSource(async mgr => {
        return await mgr.findAndCount(BannerEntity, {
            where: where,
            skip: (params.page - 1) * params.pageSize,
            take: params.pageSize,
            order: order,
        })
    })
    return {
        data: instanceToPlain(entities) as IBannerEntity[],
        total: total
    };
}

