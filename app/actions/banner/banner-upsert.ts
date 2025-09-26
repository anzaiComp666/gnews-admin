import { BannerStatus } from "@/lib/dao/biz/banner"
import { JumpType } from "@/lib/types/jump-type"
import z from "zod"

export const BannerUpsertSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "请填写名称"),
    imageUrl: z.httpUrl().min(1, "请填写图片地址"),
    status: z.enum(BannerStatus),
    jumpType: z.enum(JumpType),
    jumpData: z.string().optional(),
})

export type BannerUpsertParams = z.infer<typeof BannerUpsertSchema>

export const bannerUpsert = async (data: BannerUpsertParams) => {
    const params = BannerUpsertSchema.parse(data)
}