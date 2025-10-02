import { HomeFeedModuleStatus } from "@/lib/dao/app/home-feed-module"
import { JumpType } from "@/lib/types/jump-type"
import z from "zod"

export const HomeFeedModuleUpsertSchema = z.object({
    id: z.int().optional(),
    name: z.string().min(1, "请填写名称"),
    status: z.enum(HomeFeedModuleStatus, { error: "请选择状态" }),
    orderNo: z.number(),
    jumpType: z.enum(JumpType, { error: "请选择跳转类型" }),
    jumpData: z.string().optional(),
})

export type HomeFeedModuleUpsertType = z.infer<typeof HomeFeedModuleUpsertSchema>