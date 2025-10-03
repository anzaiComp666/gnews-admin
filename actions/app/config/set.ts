"use server"

import { authVerify } from "@/actions/auth/verify"
import { dataSources } from "@/lib/dao"
import { AppConfigEntity } from "@/lib/dao/app/app-config"
import { GappId } from "@/lib/dao/video/gapp_video.entity"
import { AppConfigSetSchema, AppConfigSetSchemaType } from "./set-schema"
import z from "zod"

const StringArraySchema = z.array(z.string());

export async function appConfigSet(appId: GappId, data: AppConfigSetSchemaType) {
    await authVerify()
    const params = AppConfigSetSchema.parse(data)

    try {
        StringArraySchema.parse(JSON.parse(params.rechargeTips))
    } catch (error) {
        throw new Error("充值提示格式错误")
    }

    try {
        StringArraySchema.parse(JSON.parse(params.paymentTips))
    } catch (error) {
        throw new Error("支付提示格式错误")
    }


    return await dataSources.app[appId].withDataSource(async mgr => {


        const config = await mgr.findOne(AppConfigEntity, { where: {} })
        if (config) {
            mgr.update(AppConfigEntity, { id: config.id }, {
                dailyFreeCalcMode: params.dailyFreeCalcMode,
                dailyFreeCount: params.dailyFreeCount,
                rechargeTips: params.rechargeTips,
                paymentTips: params.paymentTips,
                inviteRebateRate: params.inviteRebateRate,
            })
        } else {
            const newConfig = mgr.create(AppConfigEntity, {
                dailyFreeCalcMode: params.dailyFreeCalcMode,
                dailyFreeCount: params.dailyFreeCount,
                rechargeTips: params.rechargeTips,
                paymentTips: params.paymentTips,
                inviteRebateRate: params.inviteRebateRate,
            })
            await mgr.save(newConfig)
        }
    })
}