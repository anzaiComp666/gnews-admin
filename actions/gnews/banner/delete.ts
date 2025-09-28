"use server"

import { dataSources } from "@/lib/dao"
import { BannerEntity } from "@/lib/dao/biz/banner"
import { BannerDeleteSchemaType, BannerDeleteSchema } from "./delete-schema"
import { authVerify } from "../../auth/verify"
import { GappId } from "@/lib/dao/gapp/gapp_video.entity"


export const bannerDelete = async (appId: GappId, data: BannerDeleteSchemaType) => {
    await authVerify()

    const params = BannerDeleteSchema.parse(data)
    await dataSources.app[appId].withDataSource(async manager => {
        await manager.delete(BannerEntity, { id: params.id })
    })
}