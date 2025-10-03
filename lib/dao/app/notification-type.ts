import { NotificationEntity, NotificationType } from "./notification";

export const NotificationTypeTextMap = {
    [NotificationType.system]: '系统通知',
    [NotificationType.activity]: '活动通知',
}

export const NotificationTypeOptions = [
    { label: '系统通知', value: NotificationType.system },
    { label: '活动通知', value: NotificationType.activity },
]

export type INotificationEntity = InstanceType<typeof NotificationEntity>;