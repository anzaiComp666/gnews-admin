import { HomeFeedModuleVideoStatus } from "@/lib/dao/app/home-feed-module-video"
import z from "zod"

export const HomeFeedModuleVideoUpsertSchema = z.object({
    id: z.int().optional(),
    moduleId: z.number().optional(),
    videoId: z.string().min(1, "请填写视频ID"),
    status: z.enum(HomeFeedModuleVideoStatus, { error: "请选择状态" }),
    orderNo: z.number(),
})

export type HomeFeedModuleVideoUpsertSchemaType = z.infer<typeof HomeFeedModuleVideoUpsertSchema>