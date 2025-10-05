import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { GappId } from './gapp_video.entity';


// 标签分组类型
export enum GappVideoLabelGroupType {
  region = 'region', // 地区
  topic = 'topic', // 主题
}


// 标签状态
export enum GappVideoLabelStatus {
  active = 'active', // 启用
  inactive = 'inactive', // 禁用
}


@Entity('gapp_video_label')
export class GappVideoLabelEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: GappId,
    comment: '应用id',
  })
  appId: GappId;

  @Index()
  @Column({ comment: '标签id' })
  labelId: string;

  @Column({ comment: '标签名称' })
  labelName: string;

  @Column({
    type: 'enum',
    enum: GappVideoLabelGroupType,
    default: GappVideoLabelGroupType.topic,
    comment: '标签分组类型',
  })
  groupType: GappVideoLabelGroupType;

  @Column({ comment: '是否首页显示', default: false })
  isHome: boolean;

  @Column({ comment: '排序，越大越靠前', default: 0 })
  orderNo: number;

  @Column({
    type: 'enum',
    enum: GappVideoLabelStatus,
    default: GappVideoLabelStatus.active,
    comment: '标签状态',
  })
  status: GappVideoLabelStatus;

  @Column({ nullable: true, comment: '标签背景图' })
  bgImageUrl?: string;

  @Column({ default: 0, comment: '子标签数量' })
  childrenCount: number;
}


