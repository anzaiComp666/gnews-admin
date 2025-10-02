"use server"

import { dataSources } from "@/lib/dao";
import { Between, FindOptionsWhere } from "typeorm";
import { isDateRange } from "react-day-picker";
import { authVerify } from "../../auth/verify";
import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { HomeFeedModuleVideoEntity, IHomeFeedModuleVideoEntity } from "@/lib/dao/app/home-feed-module-video";
import { HomeFeedModuleVideoListSchema, HomeFeedModuleVideoListSchemaType } from "./list-schema";
import { instanceToPlain } from "class-transformer";

export async function homeFeedModuleVideoList(appId: GappId, data: HomeFeedModuleVideoListSchemaType) {
    await authVerify()
    const params = HomeFeedModuleVideoListSchema.parse(data)

    const order: Record<string, "ASC" | "DESC"> = {}
    for (const item of params.sorting) {
        order[item.id] = item.desc ? "DESC" : "ASC"
    }

    if (order["id"] == null) {
        order["id"] = "DESC"
    }

    const where: FindOptionsWhere<HomeFeedModuleVideoEntity> = {
        moduleId: params.moduleId,
    }

    for (const filter of params.columnFilters) {
        switch (filter.id) {
            case "createdAt":
                if (isDateRange(filter.value)) {
                    where.createdAt = Between(filter.value.from!, filter.value.to!)
                }
                break;

            default:
                where[filter.id as keyof HomeFeedModuleVideoEntity] = filter.value
                break
        }
    }


    const [entities, total] = await dataSources.app[appId].withDataSource(async mgr => {
        return await mgr.findAndCount(HomeFeedModuleVideoEntity, {
            where: where,
            skip: (params.page - 1) * params.pageSize,
            take: params.pageSize,
            order: order,
        })
    })

    return {
        data: instanceToPlain(entities) as IHomeFeedModuleVideoEntity[],
        total: total
    };
}

