import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { GappId } from './gapp_video.entity';

@Entity('gapp_video_label_parent')
export class GappVideoLabelParentEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: GappId,
    comment: '应用id',
  })
  appId: GappId;

  @Column({ comment: '标签id' })
  labelId: string;

  @Column({ comment: '父标签id' })
  parentId: string;
}
