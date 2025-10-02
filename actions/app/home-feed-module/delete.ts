"use server"

import { dataSources } from "@/lib/dao"
import { authVerify } from "../../auth/verify"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { HomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module"


export const homeFeedModuleDelete = async (appId: GappId, id: number) => {
    await authVerify()

    await dataSources.app[appId].withDataSource(async manager => {
        await manager.softDelete(HomeFeedModuleEntity, { id })
    })
}