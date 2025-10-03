"use server"

import { GappId } from "@/lib/dao/video/gapp_video.entity";
import { NotificationUpsertSchema, NotificationUpsertSchemaType } from "./upsert-schema";
import { authVerify } from "@/actions/auth/verify";
import { dataSources } from "@/lib/dao";

export async function notificationUpsert(appId: GappId, data: NotificationUpsertSchemaType) {
    await authVerify()
    const params = NotificationUpsertSchema.parse(data)
    return await dataSources.app[appId].withDataSource(async mgr => {
        if (params.id && params.id > 0) {
            await mgr.update("notification", { id: params.id }, {
                type: params.type,
                target: params.target,
                title: params.title,
                content: params.content,
                jumpType: params.jumpType,
                jumpText: params.jumpText,
                jumpData: params.jumpData,
            })
        } else {
            const entity = mgr.create("notification", {
                type: params.type,
                target: params.target,
                title: params.title,
                content: params.content,
                jumpType: params.jumpType,
                jumpText: params.jumpText,
                jumpData: params.jumpData,
            })
            await mgr.save(entity)
        }
    })
}