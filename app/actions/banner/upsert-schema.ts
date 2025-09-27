import { BannerStatus } from "@/lib/dao/biz/banner"
import { JumpType } from "@/lib/types/jump-type"
import z from "zod"

export const BannerUpsertSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "请填写名称"),
    imageUrl: z.httpUrl({ error: "请填写正确的图片链接" }),
    status: z.enum(BannerStatus, { error: "请选择状态" }),
    jumpType: z.enum(JumpType, { error: "请选择跳转类型" }),
    jumpData: z.string().optional(),
})

export type BannerUpsertParams = z.infer<typeof BannerUpsertSchema>