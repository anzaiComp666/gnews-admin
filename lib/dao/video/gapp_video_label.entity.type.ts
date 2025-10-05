import { GappVideoLabelEntity, GappVideoLabelGroupType, GappVideoLabelStatus } from "./gapp_video_label.entity";

export const GappVideoLabelGroupTypeTextMap: Record<GappVideoLabelGroupType, string> = {
    [GappVideoLabelGroupType.region]: '地区',
    [GappVideoLabelGroupType.topic]: '主题',
};


export const GappVideoLabelStatusTextMap: Record<GappVideoLabelStatus, string> = {
    [GappVideoLabelStatus.active]: '启用',
    [GappVideoLabelStatus.inactive]: '禁用',
};


export type IGappVideoLabelEntity = InstanceType<typeof GappVideoLabelEntity>;