"use server"

import { dataSources } from "@/lib/dao";
import { Between, FindOptionsWhere, MoreThan } from "typeorm";
import { isDateRange } from "react-day-picker";
import { authVerify } from "../../auth/verify";
import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { GappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { instanceToPlain } from "class-transformer";
import { LabelListSchema, LabelListSchemaType } from "./list-schema";
import { GappVideoLabelParentEntity } from "@/lib/dao/video/gapp_video_label_parent.entity";


export async function labelList(appId: GappId, data: LabelListSchemaType) {

    await authVerify()
    const params = LabelListSchema.parse(data)

    const order: Record<string, "ASC" | "DESC"> = {}
    for (const item of params.sorting) {
        order["gvl." + item.id] = item.desc ? "DESC" : "ASC"
    }

    if (order["gvl.id"] == null) {
        order["gvl.id"] = "DESC"
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

            case "childrenCount":
                if (filter.value == "has") {
                    where.childrenCount = MoreThan(0)
                } else {
                    where.childrenCount = 0
                }
                break;

            default:
                where[filter.id as keyof GappVideoLabelEntity] = filter.value
                break
        }
    }

    const [entities, total] = await dataSources.video.withDataSource(async mgr => {

        const qb = mgr.createQueryBuilder(GappVideoLabelEntity, "gvl")
            .where(where)
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .orderBy(order)

        if (params.parentId) {
            const parentLabel = await mgr.findOneBy(GappVideoLabelEntity, {
                appId: appId,
                labelId: params.parentId
            })

            if (!parentLabel) {
                throw new Error("父标签不存在")
            }

            if (params.isAddMode) {
                // 添加子标签模式，排除已是子标签的
                qb.leftJoin(GappVideoLabelParentEntity, "gvlp", "gvl.labelId = gvlp.labelId AND gvlp.parentId = :parentId", { parentId: params.parentId })
                    .andWhere("gvlp.id IS NULL")
                    .andWhere("gvl.groupType = :groupType", { groupType: parentLabel.groupType })
            } else {
                // 正常模式，筛选出已有的子标签
                qb.innerJoin(GappVideoLabelParentEntity, "gvlp", "gvl.labelId = gvlp.labelId AND gvlp.parentId = :parentId", { parentId: params.parentId })
            }

            // 排除自己
            qb.andWhere("gvl.labelId != :labelId", { labelId: params.parentId })
        }

        return qb.getManyAndCount()

    })


    return {
        data: instanceToPlain(entities) as GappVideoLabelEntity[],
        total: total
    };
}

