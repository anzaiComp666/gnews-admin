"use server"

import { dataSources } from "@/lib/dao";
import { Between, EntityManager, FindOptionsWhere } from "typeorm";
import { isDateRange } from "react-day-picker";
import { authVerify } from "../../auth/verify";
import { GappId, GappVideoEntity } from "@/lib/dao/video/gapp_video.entity";
import { instanceToPlain } from "class-transformer";
import { TableListSchema, TableListSchemaType } from "@/schema/table-list.schema";
import { GappVideoLabelRelationEntity } from "@/lib/dao/video/gapp_video_label_relation.entity";
import { GappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { IGappVideoEntity } from "@/lib/dao/video/gapp_video.entity.type";


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

        const countQuery = mgr.createQueryBuilder(GappVideoEntity, "gv")
            .where(where)

        const total = await countQuery.getCount()

        const qb = mgr.createQueryBuilder(GappVideoEntity, "gv")
            .select([
                "gv.id as id",
                "gv.videoId as videoId",
                "gv.title as title",
                "gv.durationSec as durationSec",
                "gv.lookNum as lookNum",
                "gv.likeNum as likeNum",
                "gv.gold as gold",
            ])
            .where(where)
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .orderBy(order)

        const entities = await qb.getRawMany<IGappVideoEntity>()

        const videoIds = entities.map(v => v.videoId);
        const videoLabels = await queryVideoLabels(mgr, videoIds)
        for (const entity of entities) {
            entity.labels = videoLabels.get(entity.videoId) || []
        }
        return [entities, total]

    })


    return {
        data: instanceToPlain(entities) as IGappVideoEntity[],
        total: total
    };
}

async function queryVideoLabels(manager: EntityManager, videoIds: string[]) {

    // 查询视频关联的标签
    const relations = await manager.createQueryBuilder(GappVideoLabelRelationEntity, "gvlr")
        .select([
            "gvlr.videoId as videoId",
            "GROUP_CONCAT(gvlr.labelId) as labelIds"
        ])
        .where("gvlr.videoId IN (:...videoIds)", { videoIds })
        .groupBy("gvlr.videoId")
        .getRawMany<{
            videoId: string,
            labelIds: string
        }>();

    // 查询标签名称
    const labelIds = new Set(relations.flatMap(r => r.labelIds.split(",")));
    const labels = await manager.createQueryBuilder(GappVideoLabelEntity, "gvl")
        .select([
            "gvl.labelId as labelId",
            "gvl.labelName as labelName"
        ])
        .where("gvl.labelId IN (:...labelIds)", { labelIds: Array.from(labelIds) })
        .getRawMany<{
            labelId: string,
            labelName: string
        }>();
    // 组装成 Map
    const labelMap = new Map(labels.map(l => [l.labelId, l.labelName]));
    const map = new Map<string, {
        labelId: string,
        labelName: string
    }[]>();

    for (const rel of relations) {
        const arr = rel.labelIds.split(",").map(labelId => ({
            labelId,
            labelName: labelMap.get(labelId) || ""
        }));
        map.set(rel.videoId, arr);
    }

    return map;
}

