"use server"

import { dataSources } from "@/lib/dao"
import { authVerify } from "@/actions/auth/verify"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { HomeFeedModuleVideoUpsertSchema, HomeFeedModuleVideoUpsertSchemaType } from "./upsert-schema"
import { HomeFeedModuleVideoEntity } from "@/lib/dao/app/home-feed-module-video"


export const homeFeedModuleVideoUpsert = async (appId: GappId, data: HomeFeedModuleVideoUpsertSchemaType) => {
    await authVerify()

    const params = HomeFeedModuleVideoUpsertSchema.parse(data)
    await dataSources.app[appId].withDataSource(async manager => {

        if (params.id && params.id > 0) {
            await manager.update(HomeFeedModuleVideoEntity, {
                id: params.id
            }, {
                videoId: params.videoId,
                orderNo: params.orderNo,
                status: params.status,
            })
        } else {
            const entity = manager.create(HomeFeedModuleVideoEntity, {
                moduleId: params.moduleId,
                videoId: params.videoId,
                orderNo: params.orderNo,
                status: params.status,
            })
            await manager.save(entity)
        }
    })
}