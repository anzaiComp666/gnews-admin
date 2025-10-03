"use server"

import { dataSources } from "@/lib/dao";
import { Between, FindOptionsWhere } from "typeorm";
import { isDateRange } from "react-day-picker";
import { authVerify } from "../../auth/verify";
import { GappId, GappVideoEntity, IGappVideoEntity } from "@/lib/dao/video/gapp_video.entity";
import { instanceToPlain } from "class-transformer";
import { TableListSchema, TableListSchemaType } from "@/schema/table-list.schema";


export async function videoList(appId: GappId, data: TableListSchemaType) {

    await authVerify()
    const params = TableListSchema.parse(data)

    const order: Record<string, "ASC" | "DESC"> = {}
    for (const item of params.sorting) {
        order["gv." + item.id] = item.desc ? "DESC" : "ASC"
    }

    if (order["gv.id"] == null) {
        order["gv.id"] = "DESC"
    }

    const where: FindOptionsWhere<GappVideoEntity> = {
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
                where[filter.id as keyof GappVideoEntity] = filter.value
                break
        }
    }

    const [entities, total] = await dataSources.video.withDataSource(async mgr => {

        const qb = mgr.createQueryBuilder(GappVideoEntity, "gv")
            .select([
                "gv.id",
                "gv.videoId",
                "gv.title",
                "gv.durationSec",
                "gv.lookNum",
                "gv.likeNum",
                "gv.gold",
                "gv.createdAt",
            ])
            .where(where)
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .orderBy(order)


        return qb.getManyAndCount()

    })


    return {
        data: instanceToPlain(entities) as IGappVideoEntity[],
        total: total
    };
}

