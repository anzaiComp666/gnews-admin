"use server"

import { dataSources } from "@/lib/dao"
import { BannerEntity } from "@/lib/dao/biz/banner"
import { BannerDeleteSchemaType, BannerDeleteSchema } from "./delete-schema"
import { authVerify } from "../../auth/verify"


export const bannerDelete = async (data: BannerDeleteSchemaType) => {
    await authVerify()

    const params = BannerDeleteSchema.parse(data)
    await dataSources.biz.withDataSource(async manager => {
        await manager.delete(BannerEntity, { id: params.id })
    })
}