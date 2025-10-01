"use server"

import { authVerify } from "@/actions/auth/verify"
import { LabelChildrenAddSchema, LabelChildrenAddSchemaType } from "./children-add-schema"
import { dataSources } from "@/lib/dao"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { GappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity"
import { In } from "typeorm"
import { GappVideoLabelParentEntity } from "@/lib/dao/video/gapp_video_label_parent.entity"

export const labelChildrenAdd = async (appId: GappId, data: LabelChildrenAddSchemaType) => {
    await authVerify()
    const params = LabelChildrenAddSchema.parse(data)


    await dataSources.video.withDataSourceTransaction(async mgr => {
        const parentLabel = await mgr.findOneBy(GappVideoLabelEntity, {
            appId: appId,
            labelId: params.parentId
        })
        if (!parentLabel) {
            throw new Error("标签不存在")
        }

        // 查出所有要添加的子标签
        const childrenLabels = await mgr.findBy(GappVideoLabelEntity, {
            appId: appId,
            labelId: In(params.childrenLabelIds),
        })

        if (childrenLabels.length <= 0) {
            return
        }


        // 查出已存在的 parent-children 关系
        const existing = await mgr.find(GappVideoLabelParentEntity, {
            where: {
                appId: appId,
                parentId: parentLabel.labelId,
                labelId: In(childrenLabels.map(c => c.labelId)),
            }
        })

        // 已存在的 id 集合
        const existingIds = new Set(existing.map(e => e.labelId))

        // 过滤掉已存在的
        const newEntities = childrenLabels
            .filter(c => !existingIds.has(c.labelId))
            .map(c =>
                mgr.create(GappVideoLabelParentEntity, {
                    appId: appId,
                    parentId: parentLabel.labelId,
                    labelId: c.labelId,
                })
            )

        // 批量插入
        if (newEntities.length > 0) {
            await mgr.save(newEntities)
        }

        // 更新 childrenCount
        await mgr.increment(GappVideoLabelEntity,
            { id: parentLabel.id },
            "childrenCount",
            newEntities.length
        )
    })
}