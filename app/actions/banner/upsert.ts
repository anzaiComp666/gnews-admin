"use server"

import { BannerUpsertParams, BannerUpsertSchema } from "./upsert-schema"


export const bannerUpsert = async (data: BannerUpsertParams) => {
    const params = BannerUpsertSchema.parse(data)
    console.log("bannerUpsert", params)
}