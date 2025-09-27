"use server"

import { dataSources } from "@/lib/dao"
import { BannerEntity, BannerPosition } from "@/lib/dao/biz/banner"
import { authVerify } from "../auth/verify"
import { BannerUpsertParams, BannerUpsertSchema } from "./upsert-schema"


export const bannerUpsert = async (data: BannerUpsertParams) => {
    await authVerify()

    const params = BannerUpsertSchema.parse(data)
    await dataSources.biz.withDataSource(async manager => {
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