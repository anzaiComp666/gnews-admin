import { GappVideoEntity } from "./gapp_video.entity";

export type IGappVideoEntity = Omit<GappVideoEntity, "rawVideoLink">;