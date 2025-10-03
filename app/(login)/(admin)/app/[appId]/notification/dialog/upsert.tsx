import { ProFormDialog } from "@/pro-components/pro-form-dialog"
import { useProTable } from "@/pro-components/pro-table/context"
import { useAppContext } from "../../context"
import { NotificationUpsertSchema, NotificationUpsertSchemaType } from "@/actions/app/notification/upsert-schema"
import { INotificationEntity, NotificationTypeOptions } from "@/lib/dao/app/notification-type"
import { NotificationType } from "@/lib/dao/app/notification"
import { JumpType, JumpTypeOptions } from "@/lib/types/jump-type"
import { notificationUpsert } from "@/actions/app/notification/upsert"

interface Props {
    entity?: INotificationEntity
    children?: React.ReactNode
}
export const NotificationUpsertDialog = (props: Props) => {
    const table = useProTable()
    const appContext = useAppContext()

    const onSubmit = async (data: Record<string, any>) => {
        await notificationUpsert(appContext.appId, data as NotificationUpsertSchemaType)
        await table.refresh()
    }

    return (
        <ProFormDialog<NotificationUpsertSchemaType>
            trigger={props.children}
            header={props.entity ? "编辑通知" : "添加通知"}
            onSubmit={onSubmit}
            schema={NotificationUpsertSchema}
            fields={{
                id: {
                    type: 'numberInput',
                    defaultValue: props.entity?.id ?? 0,
                    hidden: true,
                },
                type: {
                    type: 'select',
                    label: "通知类型",
                    defaultValue: props.entity?.type ?? NotificationType.system,
                    placeholder: "请选择通知类型",
                    options: NotificationTypeOptions,
                },
                target: {
                    type: 'numberInput',
                    label: "目标用户ID",
                    defaultValue: props.entity?.target ?? 0,
                    placeholder: "0表示所有用户",
                    description: "0表示所有用户",
                },
                title: {
                    type: 'input',
                    label: "通知标题",
                    defaultValue: props.entity?.title ?? "",
                },
                content: {
                    type: 'textarea',
                    label: "通知内容",
                    defaultValue: props.entity?.content ?? "",
                },
                jumpType: {
                    type: 'select',
                    label: "跳转类型",
                    defaultValue: props.entity?.jumpType ?? JumpType.none,
                    placeholder: "请选择跳转类型",
                    options: JumpTypeOptions,
                }
                ,
                jumpText: {
                    type: 'input',
                    label: "跳转文本",
                    defaultValue: props.entity?.jumpText ?? "",
                    placeholder: "跳转文本不能超过10字",
                },
                jumpData: {
                    type: 'input',
                    label: "跳转数据",
                    defaultValue: props.entity?.jumpData ?? "",
                    placeholder: "跳转数据不能超过200字",
                },
            }}
        />
    )
}

