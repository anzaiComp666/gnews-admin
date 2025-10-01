import z from "zod"

export const LabelChildrenAddSchema = z.object({
    parentId: z.string().min(1, "请填写标签ID"),
    childrenLabelIds: z.array(z.string()).min(1, "请选择要添加的子标签"),
})

export type LabelChildrenAddSchemaType = z.infer<typeof LabelChildrenAddSchema>