import { ProFormDialog } from "@/pro-components/pro-form-dialog"
import { useProTable } from "@/pro-components/pro-table/context"
import { useAppContext } from "../../../../context"
import { HomeFeedModuleVideoUpsertSchema, HomeFeedModuleVideoUpsertSchemaType } from "@/actions/app/home-feed-module-video/upsert-schema"
import { homeFeedModuleVideoUpsert } from "@/actions/app/home-feed-module-video/upsert"
import { HomeFeedModuleVideoStatus, IHomeFeedModuleVideoEntity } from "@/lib/dao/app/home-feed-module-video"

interface Props {
    moduleId?: number
    entity?: IHomeFeedModuleVideoEntity
    children?: React.ReactNode
}

export const HomeFeedModuleVideoUpsertDialog = (props: Props) => {
    const table = useProTable()
    const appContext = useAppContext()

    const onSubmit = async (data: Record<string, any>) => {
        await homeFeedModuleVideoUpsert(appContext.appId, data as HomeFeedModuleVideoUpsertSchemaType)
        await table.refresh()
    }

    return (
        <ProFormDialog<HomeFeedModuleVideoUpsertSchemaType>
            trigger={props.children}
            header={props.entity ? "编辑视频" : "添加视频"}
            onSubmit={onSubmit}
            schema={HomeFeedModuleVideoUpsertSchema}
            fields={{
                id: {
                    type: 'numberInput',
                    defaultValue: props.entity?.id ?? 0,
                    readonly: true,
                    hidden: props.entity == null,
                    label: "ID"
                },
                moduleId: {
                    type: 'numberInput',
                    defaultValue: props.entity?.moduleId ?? props.moduleId ?? 0,
                    readonly: true,
                    hidden: props.entity != null,
                    label: "模块ID"
                },
                videoId: {
                    type: 'input',
                    defaultValue: props.entity?.videoId ?? "",
                    label: "视频ID"
                },
                orderNo: {
                    type: 'numberInput',
                    defaultValue: props.entity?.orderNo ?? 0,
                    label: "排序"
                },
                status: {
                    type: 'select',
                    label: "状态",
                    defaultValue: props.entity?.status ?? HomeFeedModuleVideoStatus.active,
                    placeholder: "请选择状态",
                    options: [
                        { label: '显示', value: HomeFeedModuleVideoStatus.active },
                        { label: '隐藏', value: HomeFeedModuleVideoStatus.inactive },
                    ]

                },
            }}
        />
    )
}

