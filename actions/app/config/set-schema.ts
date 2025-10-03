import { DailyFreeCalcMode } from "@/lib/dao/app/app-config";
import z from "zod";

export const AppConfigSetSchema = z.object({
    dailyFreeCalcMode: z.enum(DailyFreeCalcMode, { error: "请选择每日免费计算方式" }),
    dailyFreeCount: z.number().min(0, "每日免费观看次数不能小于0").max(100, "每日免费观看次数不能大于100"),
    rechargeTips: z.string().max(2000, "充值提示不能超过2000字"),
    paymentTips: z.string().max(2000, "支付提示不能超过2000字"),
    inviteRebateRate: z.number().min(0, "邀请返现比例不能小于0").max(1, "邀请返现比例不能大于1"),
})

export type AppConfigSetSchemaType = z.infer<typeof AppConfigSetSchema>