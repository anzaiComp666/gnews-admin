import { ProFormDialog } from "@/pro-components/pro-form-dialog"
import { useProTable } from "@/pro-components/pro-table/context"
import { useAppContext } from "../context"
import { GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap, GappVideoLabelStatus, GappVideoLabelStatusTextMap, IGappVideoLabelEntity } from "@/lib/dao/video/gapp_video_label.entity"
import { LabelUpsertSchema, LabelUpsertSchemaType } from "@/actions/video/label/upsert-schema"
import { enumToOptions } from "@/lib/enumutil"
import { labelUpsert } from "@/actions/video/label/upsert"

interface Props {
    entity?: IGappVideoLabelEntity
    children?: React.ReactNode
}
export const LabelUpsertDialog = (props: Props) => {
    const table = useProTable()
    const appContext = useAppContext()

    const onSubmit = async (data: Record<string, any>) => {
        labelUpsert(appContext.appId, data as LabelUpsertSchemaType)
        await table.refresh()
    }

    return (
        <ProFormDialog<LabelUpsertSchemaType>
            trigger={props.children}
            header={props.entity ? "编辑标签" : "添加标签"}
            onSubmit={onSubmit}
            schema={LabelUpsertSchema}
            fields={{
                labelId: {
                    type: 'input',
                    defaultValue: props.entity?.labelId ?? "",
                    readonly: props.entity != null,
                    label: "标签ID"
                },
                labelName: {
                    type: 'input',
                    defaultValue: props.entity?.labelName ?? "",
                    label: "标签名称"
                },
                groupType: {
                    type: 'select',
                    defaultValue: props.entity?.groupType ?? GappVideoLabelGroupType.region,
                    label: "标签分组",
                    placeholder: "请选择标签分组",
                    options: enumToOptions(GappVideoLabelGroupType, GappVideoLabelGroupTypeTextMap)
                },
                isHome: {
                    type: 'checkbox',
                    defaultValue: props.entity?.isHome ?? false,
                    label: "是否首页显示",
                },
                orderNo: {
                    type: 'numberInput',
                    defaultValue: props.entity?.orderNo ?? 0,
                    label: "排序"
                },
                status: {
                    type: 'select',
                    defaultValue: props.entity?.status ?? GappVideoLabelStatus.active,
                    label: "状态",
                    placeholder: "请选择状态",
                    options: enumToOptions(GappVideoLabelStatus, GappVideoLabelStatusTextMap)
                },
                bgImageURL: {
                    type: 'input',
                    defaultValue: props.entity?.bgImageUrl ?? "",
                    label: "图片链接"
                },
            }}
        />
    )
}

