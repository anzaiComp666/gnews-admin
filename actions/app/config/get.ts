"use server"

import { authVerify } from "@/actions/auth/verify"
import { dataSources } from "@/lib/dao"
import { AppConfigEntity, IAppConfigEntity } from "@/lib/dao/app/app-config"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { instanceToPlain } from "class-transformer"

export async function appConfigGet(appId: GappId) {
    await authVerify()

    return await dataSources.app[appId].withDataSource(async mgr => {
        const config = await mgr.findOne(AppConfigEntity, { where: {} })
        if (!config) {
            return null
        }
        return instanceToPlain(config) as IAppConfigEntity
    })
}