"use server"

import { dataSources } from "@/lib/dao"
import { authVerify } from "@/actions/auth/verify"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { HomeFeedModuleUpsertSchema, HomeFeedModuleUpsertType } from "./upsert-schema"
import { HomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module"


export const homeFeedModuleUpsert = async (appId: GappId, data: HomeFeedModuleUpsertType) => {
    await authVerify()

    const params = HomeFeedModuleUpsertSchema.parse(data)
    await dataSources.app[appId].withDataSource(async manager => {

        if (params.id && params.id > 0) {
            await manager.update(HomeFeedModuleEntity, {
                id: params.id
            }, {
                name: params.name,
                status: params.status,
                orderNo: params.orderNo,
                jumpType: params.jumpType,
                jumpData: params.jumpData,
            })
        } else {
            const entity = manager.create(HomeFeedModuleEntity, {
                name: params.name,
                status: params.status,
                orderNo: params.orderNo,
                jumpType: params.jumpType,
                jumpData: params.jumpData,
            })
            await manager.save(entity)
        }
    })
}