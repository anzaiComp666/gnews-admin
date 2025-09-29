"use server"

import { authVerify } from "@/actions/auth/verify";
import { LabelUpsertSchema, LabelUpsertSchemaType } from "./upsert-schema";
import { dataSources } from "@/lib/dao";
import { GappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity";
import { GappId } from "@/lib/dao/video/gapp_video.entity";

export async function labelUpsert(appId: GappId, data: LabelUpsertSchemaType) {
    await authVerify()

    const params = LabelUpsertSchema.parse(data)
    await dataSources.video.withDataSource(async manager => {

        if (params.id && params.id > 0) {

            await manager.update(GappVideoLabelEntity, {
                id: params.id,
            }, {
                labelName: params.labelName,
                groupType: params.groupType,
                isHome: params.isHome,
                orderNo: params.orderNo,
                status: params.status,
                bgImageUrl: params.bgImageURL,
            })
        } else {
            const entity = manager.create(GappVideoLabelEntity, {
                appId: appId,
                labelId: params.labelId,
                labelName: params.labelName,
                groupType: params.groupType,
                isHome: params.isHome,
                orderNo: params.orderNo,
                status: params.status,
                bgImageUrl: params.bgImageURL,
            })
            await manager.save(entity)
        }
    })

}