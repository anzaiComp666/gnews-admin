import { NotificationType } from "@/lib/dao/app/notification"
import { JumpType } from "@/lib/types/jump-type"
import z from "zod"

const baseSchema = z.object({
    id: z.int().optional(),
    type: z.enum(NotificationType, { error: "请选择通知类型" }),
    target: z.number().int().optional(),
    title: z.string().min(1, "通知标题不能为空").max(100, "通知标题不能超过100字"),
    content: z.string().min(1, "通知内容不能为空").max(2000, "通知内容不能超过2000字"),
    jumpType: z.enum(JumpType, { error: "请选择跳转类型" }),
    jumpText: z.string().max(10, "跳转文本不能超过10字").optional(),
    jumpData: z.string().max(200, "跳转数据不能超过200字").optional(),
})

export const NotificationUpsertSchema = baseSchema.superRefine((data, ctx) => {
    if (data.jumpType !== JumpType.none) {
        if (!data.jumpData) {
            ctx.addIssue({
                code: "custom",
                message: "必须填写跳转数据",
                path: ["jumpData"],
            })
        }
    }
})


export type NotificationUpsertSchemaType = z.infer<typeof NotificationUpsertSchema>