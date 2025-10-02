import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { JumpType } from '@/lib/types/jump-type';

export enum HomeFeedModuleStatus {
  active = 'active', // 显示
  inactive = 'inactive', // 隐藏
}

export const HomeFeedModuleStatusTextMap: Record<HomeFeedModuleStatus, string> = {
  [HomeFeedModuleStatus.active]: '显示',
  [HomeFeedModuleStatus.inactive]: '隐藏',
};


@Entity('home_feed_module')
export class HomeFeedModuleEntity extends BaseEntity {
  // 模块名称
  @Column({ comment: '模块名称' })
  name: string;

  // 模块状态
  @Column({
    type: 'enum',
    enum: HomeFeedModuleStatus,
    default: HomeFeedModuleStatus.active,
    comment: '模块状态',
  })
  status: HomeFeedModuleStatus;

  // 排序
  @Column({ comment: '排序' })
  orderNo: number;

  // 点击跳转类型
  @Column('tinyint', { default: JumpType.none, comment: '跳转类型' })
  jumpType: JumpType;

  @Column({ nullable: true, comment: '跳转文本' })
  jumpText: string;

  // 跳转数据
  @Column({ nullable: true, comment: '跳转数据' })
  jumpData: string;
}

export type IHomeFeedModuleEntity = InstanceType<typeof HomeFeedModuleEntity>;