import { TableListSchema } from "@/schema/table-list.schema";
import z from "zod";

export const HomeFeedModuleVideoListSchema = z.object({
    moduleId: z.number(),
}).extend(TableListSchema.shape);
export type HomeFeedModuleVideoListSchemaType = z.infer<typeof HomeFeedModuleVideoListSchema>;