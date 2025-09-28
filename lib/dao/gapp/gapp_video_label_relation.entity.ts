import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { GappId } from './gapp_video.entity';

@Entity('gapp_video_label_relation')
export class GappVideoLabelRelationEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: GappId,
    comment: '应用id',
  })
  appId: GappId;

  @Index()
  @Column({ comment: '标签id' })
  labelId: string;

  @Index()
  @Column({ comment: '视频id' })
  videoId: string;
}
