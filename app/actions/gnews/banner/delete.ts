"use server"

import { dataSources } from "@/lib/dao"
import { BannerEntity, BannerPosition } from "@/lib/dao/biz/banner"
import { authVerify } from "../auth/verify"
import { BannerDeleteSchemaType, BannerDeleteSchema } from "./delete-schema"


export const bannerDelete = async (data: BannerDeleteSchemaType) => {
    await authVerify()

    const params = BannerDeleteSchema.parse(data)
    await dataSources.biz.withDataSource(async manager => {
        await manager.delete(BannerEntity, { id: params.id })
    })
}