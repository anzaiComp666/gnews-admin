import { JumpType, JumpTypeOptions } from "@/lib/types/jump-type"
import { ProFormDialog } from "@/pro-components/pro-form-dialog"
import { useProTable } from "@/pro-components/pro-table/context"
import { useAppContext } from "../context"
import { HomeFeedModuleStatus, IHomeFeedModuleEntity } from "@/lib/dao/app/home-feed-module"
import { HomeFeedModuleUpsertSchema, HomeFeedModuleUpsertType } from "@/actions/app/home-feed-module/upsert-schema"
import { homeFeedModuleUpsert } from "@/actions/app/home-feed-module/upsert"

interface Props {
    entity?: IHomeFeedModuleEntity
    children?: React.ReactNode
}
export const HomeFeedModuleUpsertDialog = (props: Props) => {
    const table = useProTable()
    const appContext = useAppContext()

    const onSubmit = async (data: Record<string, any>) => {
        await homeFeedModuleUpsert(appContext.appId, data as HomeFeedModuleUpsertType)
        await table.refresh()
    }

    return (
        <ProFormDialog<HomeFeedModuleUpsertType>
            trigger={props.children}
            header={props.entity ? "编辑模块" : "添加模块"}
            onSubmit={onSubmit}
            schema={HomeFeedModuleUpsertSchema}
            fields={{
                id: {
                    type: 'numberInput',
                    defaultValue: props.entity?.id ?? 0,
                    readonly: true,
                    hidden: props.entity == null,
                    label: "ID"
                },
                name: {
                    type: 'input',
                    defaultValue: props.entity?.name ?? "",
                    label: "名称"
                },
                status: {
                    type: 'select',
                    label: "状态",
                    defaultValue: props.entity?.status ?? HomeFeedModuleStatus.active,
                    placeholder: "请选择状态",
                    options: [
                        { label: '显示', value: HomeFeedModuleStatus.active },
                        { label: '隐藏', value: HomeFeedModuleStatus.inactive },
                    ]

                },
                orderNo: {
                    type: 'numberInput',
                    defaultValue: props.entity?.orderNo ?? 0,
                    label: "排序"
                },
                jumpType: {
                    type: 'select',
                    defaultValue: props.entity?.jumpType ?? JumpType.none,
                    label: "跳转类型",
                    placeholder: "请选择跳转类型",
                    options: JumpTypeOptions
                },
                jumpData: {
                    type: 'input',
                    defaultValue: props.entity?.jumpData ?? "",
                    label: "跳转数据"
                },
            }}
        />
    )
}

