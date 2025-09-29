import { GappVideoLabelGroupType, GappVideoLabelStatus } from "@/lib/dao/video/gapp_video_label.entity"
import z from "zod"

export const LabelUpsertSchema = z.object({
    labelId: z.string().min(1, "请填写标签ID"),
    labelName: z.string().min(1, "请填写标签名称"),
    groupType: z.enum(GappVideoLabelGroupType, { error: "请选择标签分组" }),
    isHome: z.boolean({ error: "请选择是否首页显示" }),
    orderNo: z.number(),
    status: z.enum(GappVideoLabelStatus, { error: "请选择状态" }),
    bgImageURL: z.httpUrl({
        error: "请填写正确的图片链接"
    }).or(z.literal("")).optional(),
})

export type LabelUpsertSchemaType = z.infer<typeof LabelUpsertSchema>