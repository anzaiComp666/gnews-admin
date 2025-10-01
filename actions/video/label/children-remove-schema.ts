import z from "zod"

export const LabelChildrenRemoveSchema = z.object({
    parentId: z.string().min(1, "父标签ID不能为空"),
    childrenLabelIds: z.array(z.string()).min(1, "请选择要移除的子标签"),
})

export type LabelChildrenRemoveSchemaType = z.infer<typeof LabelChildrenRemoveSchema>