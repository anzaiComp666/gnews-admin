"use server"

import { authVerify } from "@/actions/auth/verify";
import { dataSources } from "@/lib/dao";
import { NotificationEntity } from "@/lib/dao/app/notification";
import { INotificationEntity } from "@/lib/dao/app/notification-type";
import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { TableListSchema, TableListSchemaType } from "@/schema/table-list.schema";
import { instanceToPlain } from "class-transformer";
import { isDateRange } from "react-day-picker";
import { Between, FindOptionsWhere } from "typeorm";

export async function notificationList(appId: GappId, data: TableListSchemaType) {
    await authVerify()
    const params = TableListSchema.parse(data)
    const order: Record<string, "ASC" | "DESC"> = {}
    for (const item of params.sorting) {
        order[item.id] = item.desc ? "DESC" : "ASC"
    }
    if (order["id"] == null) {
        order["id"] = "DESC"
    }

    const where: FindOptionsWhere<NotificationEntity> = {}
    for (const filter of params.columnFilters) {
        switch (filter.id) {
            case "createdAt":
                if (isDateRange(filter.value)) {
                    where.createdAt = Between(filter.value.from!, filter.value.to!)
                }
                break;

            default:
                where[filter.id as keyof NotificationEntity] = filter.value
                break
        }
    }


    const [entities, total] = await dataSources.app[appId].withDataSource(async mgr => {
        return await mgr.findAndCount(NotificationEntity, {
            where: where,
            skip: (params.page - 1) * params.pageSize,
            take: params.pageSize,
            order: order,
        })
    })
    return {
        data: instanceToPlain(entities) as INotificationEntity[],
        total: total
    };
}