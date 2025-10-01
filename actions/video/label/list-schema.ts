import { TableListSchema } from "@/schema/table-list.schema"
import z from "zod"

export const LabelListSchema = z.object({
    // 指定父标签ID，返回不包含该标签及其子标签的标签列表
    parentId: z.string().optional(),
    // 是否为添加子标签模式
    isAddMode: z.boolean().optional(),
}).extend(TableListSchema.shape)
export type LabelListSchemaType = z.infer<typeof LabelListSchema>