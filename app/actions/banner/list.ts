"use server"

import { dataSources } from "@/lib/dao";
import { BannerEntity, BannerPosition, IBannerEntity } from "@/lib/dao/biz/banner";
import { instanceToPlain } from "class-transformer";
import { authVerify } from "../auth/verify";


export async function bannerList(position: BannerPosition): Promise<IBannerEntity[]> {
    await authVerify()

    const entities = await dataSources.biz.withDataSource(async mgr => {
        return await mgr.find(BannerEntity, {
            where: {
                position: position
            }
        })
    })
    return entities.map(e => instanceToPlain(e) as IBannerEntity);
}

