"use server"

import { authVerify } from "@/actions/auth/verify";
import { LabelChildrenRemoveSchema, LabelChildrenRemoveSchemaType } from "./children-remove-schema";
import { dataSources } from "@/lib/dao";
import { GappVideoLabelParentEntity } from "@/lib/dao/video/gapp_video_label_parent.entity";
import { In } from "typeorm/find-options/operator/In.js";
import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { GappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";

export async function labelChildrenRemove(appId: GappId, data: LabelChildrenRemoveSchemaType) {
    await authVerify()
    const params = LabelChildrenRemoveSchema.parse(data)
    await dataSources.video.withDataSourceTransaction(async mgr => {
        // 删除 parent-children 关系
        await mgr.delete(GappVideoLabelParentEntity, {
            appId: appId,
            parentId: params.parentId,
            labelId: In(params.childrenLabelIds),
        })

        await mgr.decrement(GappVideoLabelEntity,
            {
                appId: appId,
                labelId: params.parentId,
            },
            "childrenCount",
            params.childrenLabelIds.length)
    })
}