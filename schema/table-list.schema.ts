import { z } from "zod"




export const TableListSchema = z.object({
    page: z.number().min(1).default(1),
    pageSize: z.number().min(1).max(100).default(10),
    columnFilters: z.array(z.object({
        id: z.string(),
        value: z.any()
    })).default([]),
    sorting: z.array(z.object({
        id: z.string(),
        desc: z.boolean()
    })).default([]),
})

export type TableListSchemaType = z.infer<typeof TableListSchema>