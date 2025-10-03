import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";
import { JumpType } from "@/lib/types/jump-type";


export enum NotificationType {
    system = 'system', // 系统通知
    activity = 'activity', // 活动通知
}


@Entity("notification")
export class NotificationEntity extends BaseEntity {

    @Column({
        type: 'enum',
        enum: NotificationType,
        default: NotificationType.system,
        comment: '通知类型'
    })
    type: NotificationType;


    @Column({ comment: '通知目标' })
    target: number;

    @Column({ comment: '通知标题' })
    title: string;

    @Column({ comment: '通知内容' })
    content: string;

    @Column('tinyint', { default: JumpType.none, comment: '跳转类型' })
    jumpType: JumpType;

    @Column({ nullable: true, comment: '跳转文本' })
    jumpText: string;

    @Column({ nullable: true, comment: '跳转数据' })
    jumpData: string;
}

