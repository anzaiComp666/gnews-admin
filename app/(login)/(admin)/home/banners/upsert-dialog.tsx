import { BannerUpsertParams, BannerUpsertSchema } from "@/app/actions/banner/banner-upsert"
import { BannerStatus, IBannerEntity } from "@/lib/dao/biz/banner"
import { JumpType, JumpTypeOptions } from "@/lib/types/jump-type"
import { ProFormDialog } from "@/pro-components/pro-form-dialog"

interface Props {
    entity?: IBannerEntity
    children?: React.ReactNode
}
export const BannerUpsertDialog = (props: Props) => {

    const onSubmit = async (data: Record<string, any>) => {
        console.log(data)
    }

    return (
        <ProFormDialog<BannerUpsertParams>
            trigger={props.children}
            header={props.entity ? "编辑轮播图" : "添加轮播图"}
            onSubmit={onSubmit}
            schema={BannerUpsertSchema}
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
                imageUrl: {
                    type: 'input',
                    defaultValue: props.entity?.imageURL ?? "",
                    label: "图片链接"
                },
                status: {
                    type: 'select',
                    label: "状态",
                    defaultValue: props.entity?.status ?? BannerStatus.active,
                    placeholder: "请选择状态",
                    options: [
                        { label: '启用', value: BannerStatus.active },
                        { label: '禁用', value: BannerStatus.inactive },
                    ]

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

