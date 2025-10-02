"use server"

import { dataSources } from "@/lib/dao";
import { TableListSchema, TableListSchemaType } from "@/schema/table-list.schema";
import { Between, FindOptionsWhere } from "typeorm";
import { isDateRange } from "react-day-picker";
import { authVerify } from "../../auth/verify";
import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { HomeFeedModuleEntity, IHomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module";
import { HomeFeedModuleVideoEntity } from "@/lib/dao/app/home-feed-module-video";


export type IHomeFeedModuleEntityWithCount = IHomeFeedModuleEntity & {
    videoCount: number
}

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
        // 先查总数
        const total = await mgr.createQueryBuilder(HomeFeedModuleEntity, "hfm")
            .where(where)
            .getCount()

        // 再查数据和关联视频数
        const entities = await mgr.createQueryBuilder(HomeFeedModuleEntity, "hfm")
            .select("hfm.*")
            .addSelect((subQuery) => {
                // 关联视频数的子查询
                return subQuery
                    .select("count(*)", "count")
                    .from(HomeFeedModuleVideoEntity, "hfmv")
                    .where("hfmv.moduleId = hfm.id")
            }, "videoCount")
            .where(where)
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .orderBy(order)
            .getRawMany<IHomeFeedModuleEntityWithCount>()
        return [entities, total]
    })

    return {
        data: entities,
        total: total
    };
}

