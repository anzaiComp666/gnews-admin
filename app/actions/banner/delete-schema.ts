import z from "zod"

export const BannerDeleteSchema = z.object({
    id: z.number()
})

export type BannerDeleteSchemaType = z.infer<typeof BannerDeleteSchema>