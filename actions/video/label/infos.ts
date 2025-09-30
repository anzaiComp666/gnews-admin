"use server"

import { dataSources } from "@/lib/dao"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { GappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity"
import { Raw } from "typeorm"

export async function labelInfos(appId: GappId, labelIds: string[]) {

    const labels = await dataSources.video.withDataSource(async (dataSource) => {
        const repo = dataSource.getRepository(GappVideoLabelEntity)
        const labels = await repo.findBy({
            appId,
            labelId: Raw(alias => `${alias} IN (:...labelIds)`, { labelIds }),
        })
        return labels
    })
    return labels
}