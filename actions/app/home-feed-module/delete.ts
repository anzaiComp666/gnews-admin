"use server"

import { dataSources } from "@/lib/dao"
import { authVerify } from "../../auth/verify"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { HomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module"
import { HomeFeedModuleVideoEntity } from "@/lib/dao/app/home-feed-module-video"


export const homeFeedModuleDelete = async (appId: GappId, id: number) => {
    await authVerify()

    await dataSources.app[appId].withDataSourceTransaction(async manager => {
        await manager.softDelete(HomeFeedModuleEntity, { id })
        await manager.softDelete(HomeFeedModuleVideoEntity, { moduleId: id })
    })
}