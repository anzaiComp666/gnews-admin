import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';

export enum HomeFeedModuleVideoStatus {
  active = 'active',
  inactive = 'inactive',
}

export const HomeFeedModuleVideoStatusTextMap: Record<HomeFeedModuleVideoStatus, string> = {
  [HomeFeedModuleVideoStatus.active]: '显示',
  [HomeFeedModuleVideoStatus.inactive]: '隐藏',
};


@Entity('home_feed_module_video')
export class HomeFeedModuleVideoEntity extends BaseEntity {

  @Column({ comment: '对应模块id' })
  moduleId: number;

  @Column({ comment: '视频ID' })
  videoId: string;

  @Column({ comment: '排序' })
  orderNo: number;

  @Column({
    type: 'enum',
    enum: HomeFeedModuleVideoStatus,
    default: HomeFeedModuleVideoStatus.active,
    comment: '状态',
  })
  status: HomeFeedModuleVideoStatus;
}

export type IHomeFeedModuleVideoEntity = InstanceType<typeof HomeFeedModuleVideoEntity>;
