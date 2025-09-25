import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { JumpType } from '@/lib/types/jump-type';

export enum BannerStatus {
  active = 'active',
  inactive = 'inactive',
}

export enum BannerPosition {
  home = 'home',
}

@Entity('banner')
export class BannerEntity extends BaseEntity {
  @Column({ comment: '横幅名称' })
  name: string;

  @Column({
    type: 'enum',
    enum: BannerStatus,
    default: BannerStatus.active,
    comment: '横幅状态',
  })
  status: BannerStatus;

  @Column({
    type: 'enum',
    enum: BannerPosition,
    default: BannerPosition.home,
    comment: '横幅位置',
  })
  position: BannerPosition;

  @Column({ comment: '横幅图片地址' })
  imageURL: string;

  @Column({ comment: '排序' })
  orderNo: number;

  @Column('tinyint', { default: JumpType.none, comment: '跳转类型' })
  jumpType: JumpType;

  @Column({ nullable: true, comment: '跳转数据' })
  jumpData?: string;
}


export type IBannerEntity = InstanceType<typeof BannerEntity>;