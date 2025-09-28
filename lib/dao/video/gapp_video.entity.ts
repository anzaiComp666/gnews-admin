import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base-entity';

export enum GappId {
  toutiao = 1,
  qidian = 2,
  cartoon = 3,
}

export enum GappVideoFlag {
  deleted = -2,
  hidden = -1,
  unhandled = 0,
  handled = 1,
}

export enum GappVideoFetchStatus {
  waited = '0',
  success = '1',
  failed = '2',
}

@Entity('gapp_video')
export class GappVideoEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: GappId,
    comment: '应用ID',
  })
  appId: GappId;

  @Column({ comment: '视频标题' })
  title: string;

  @Index()
  @Column({ comment: '视频id' })
  videoId: string;

  @Column({ comment: '视频封面地址' })
  videoPic: string;

  @Column({ nullable: false, default: '', comment: '自己封面地址' })
  videoPicSelf: string;

  @Column({ nullable: false, default: '', comment: '视频预览地址(对方)' })
  videoPreviewLink: string;

  @Column({ nullable: false, default: '', comment: '视频预览地址(自己)' })
  videoPreviewLinkSelf: string;

  @Column({ nullable: false, default: '', comment: '视频预览地址(备份)' })
  videoPreviewLinkBak: string;

  @Column({ comment: '视频播放地址(对方)' })
  videoLink: string;

  @Column({ nullable: false, default: '', comment: '自己视频地址(自己)' })
  videoLinkSelf: string;

  @Column({ nullable: false, default: '', comment: '视频地址备份(备份)' })
  videoLinkBak: string;

  @Column('longtext', { nullable: true, comment: '原始视频连接数据' })
  rawVideoLink: string | null;

  @Column({ comment: '视频时长（秒）' })
  durationSec: number;

  @Column({ comment: '视频观看次数' })
  lookNum: number;

  @Column({ comment: '视频点赞次数' })
  likeNum: number;

  @Column({ comment: '是否收费' })
  gold: boolean;

  @Column({
    type: 'enum',
    enum: GappVideoFlag,
    default: GappVideoFlag.unhandled,
    comment: '视频处理状态',
  })
  flag: GappVideoFlag;

  @Column({
    type: 'enum',
    enum: GappVideoFetchStatus,
    default: GappVideoFetchStatus.waited,
    comment: '视频详情提取状态',
  })
  fetchDetailStatus: GappVideoFetchStatus;

  @Column({
    type: 'enum',
    enum: GappVideoFetchStatus,
    default: GappVideoFetchStatus.waited,
    comment: '视频连接提取状态',
  })
  fetchLinkStatus: GappVideoFetchStatus;
}
