import z from "zod"

export const BannerDeleteSchema = z.object({
    id: z.int()
})

export type BannerDeleteSchemaType = z.infer<typeof BannerDeleteSchema>