"use server"

import { dataSources } from "@/lib/dao"
import { HomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { In } from "typeorm"

export async function homeFeedModuleInfos(appId: GappId, moduleIds: number[]) {

    const modules = await dataSources.app[appId].withDataSource(async (dataSource) => {
        const repo = dataSource.getRepository(HomeFeedModuleEntity)
        const modules = await repo.findBy({
            id: In(moduleIds),
        })
        return modules
    })
    return modules
}