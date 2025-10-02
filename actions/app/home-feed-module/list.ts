"use server"

import { dataSources } from "@/lib/dao";
import { instanceToPlain } from "class-transformer";
import { TableListSchema, TableListSchemaType } from "@/schema/table-list.schema";
import { Between, FindOptionsWhere } from "typeorm";
import { isDateRange } from "react-day-picker";
import { authVerify } from "../../auth/verify";
import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { HomeFeedModuleEntity, IHomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module";


export async function homeFeedModuleList(appId: GappId, data: TableListSchemaType) {
    await authVerify()
    const params = TableListSchema.parse(data)

    const order: Record<string, "ASC" | "DESC"> = {}
    for (const item of params.sorting) {
        order[item.id] = item.desc ? "DESC" : "ASC"
    }

    if (order["id"] == null) {
        order["id"] = "DESC"
    }

    const where: FindOptionsWhere<HomeFeedModuleEntity> = {}
    for (const filter of params.columnFilters) {
        switch (filter.id) {
            case "createdAt":
                if (isDateRange(filter.value)) {
                    where.createdAt = Between(filter.value.from!, filter.value.to!)
                }
                break;

            default:
                where[filter.id as keyof HomeFeedModuleEntity] = filter.value
                break
        }
    }


    const [entities, total] = await dataSources.app[appId].withDataSource(async mgr => {
        return await mgr.findAndCount(HomeFeedModuleEntity, {
            where: where,
            skip: (params.page - 1) * params.pageSize,
            take: params.pageSize,
            order: order,
        })
    })
    return {
        data: instanceToPlain(entities) as IHomeFeedModuleEntity[],
        total: total
    };
}

