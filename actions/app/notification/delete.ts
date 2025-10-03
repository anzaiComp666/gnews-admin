"use server"

import { authVerify } from "@/actions/auth/verify"
import { dataSources } from "@/lib/dao"
import { NotificationEntity } from "@/lib/dao/app/notification"
import { GappId } from "@/lib/dao/video/gapp_video.entity"



export const notificationDelete = async (appId: GappId, id: number) => {
    await authVerify()

    await dataSources.app[appId].withDataSourceTransaction(async manager => {
        await manager.softDelete(NotificationEntity, { id })
    })
}