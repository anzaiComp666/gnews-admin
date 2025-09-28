"use server"

import { dataSources } from "@/lib/dao"
import { BannerEntity } from "@/lib/dao/biz/banner"
import { BannerUpsertParams, BannerUpsertSchema } from "./upsert-schema"
import { authVerify } from "@/actions/auth/verify"
import { GappId } from "@/lib/dao/gapp/gapp_video.entity"


export const bannerUpsert = async (appId: GappId, data: BannerUpsertParams) => {
    await authVerify()

    const params = BannerUpsertSchema.parse(data)
    await dataSources.app[appId].withDataSource(async manager => {

        if (params.id && params.id > 0) {
            await manager.update("banner", {
                id: params.id
            }, {
                name: params.name,
                status: params.status,
                position: params.position,
                imageURL: params.imageURL,
                orderNo: params.orderNo,
                jumpType: params.jumpType,
                jumpData: params.jumpData,
            })
        } else {
            const entity = manager.create(BannerEntity, {
                name: params.name,
                status: params.status,
                position: params.position,
                imageURL: params.imageURL,
                orderNo: params.orderNo,
                jumpType: params.jumpType,
                jumpData: params.jumpData,
            })
            await manager.save(entity)
        }
    })
}