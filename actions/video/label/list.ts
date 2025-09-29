"use server"

import { dataSources } from "@/lib/dao";
import { TableListSchema, TableListSchemaType } from "@/schema/table-list.schema";
import { Between, FindOptionsWhere } from "typeorm";
import { isDateRange } from "react-day-picker";
import { authVerify } from "../../auth/verify";
import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { GappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { instanceToPlain } from "class-transformer";



export async function labelList(appId: GappId, data: TableListSchemaType) {
    await authVerify()
    const params = TableListSchema.parse(data)

    const order: Record<string, "ASC" | "DESC"> = {}
    for (const item of params.sorting) {
        order[item.id] = item.desc ? "DESC" : "ASC"
    }

    const where: FindOptionsWhere<GappVideoLabelEntity> = {
        appId: appId,
    }
    for (const filter of params.columnFilters) {
        switch (filter.id) {
            case "createdAt":
                if (isDateRange(filter.value)) {
                    where.createdAt = Between(filter.value.from!, filter.value.to!)
                }
                break;

            default:
                where[filter.id as keyof GappVideoLabelEntity] = filter.value
                break
        }
    }


    const [entities, total] = await dataSources.video.withDataSource(async mgr => {
        return await mgr.findAndCount(GappVideoLabelEntity, {
            where: where,
            skip: (params.page - 1) * params.pageSize,
            take: params.pageSize,
            order: order,
        })
    })


    return {
        data: instanceToPlain(entities) as GappVideoLabelEntity[],
        total: total
    };
}

