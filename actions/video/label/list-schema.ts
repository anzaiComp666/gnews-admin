import { TableListSchema } from "@/schema/table-list.schema"
import z from "zod"

export const LabelListSchema = z.object({
    labelId: z.string().optional(),
}).extend(TableListSchema.shape)
export type LabelListSchemaType = z.infer<typeof LabelListSchema>