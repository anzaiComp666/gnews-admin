import { bannerUpsert } from "@/app/actions/banner/upsert"
import { BannerUpsertParams, BannerUpsertSchema } from "@/app/actions/banner/upsert-schema"
import { BannerPosition, BannerStatus, IBannerEntity } from "@/lib/dao/biz/banner"
import { JumpType, JumpTypeOptions } from "@/lib/types/jump-type"
import { ProFormDialog } from "@/pro-components/pro-form-dialog"
import { useProTable } from "@/pro-components/pro-table/context"

interface Props {
    entity?: IBannerEntity
    children?: React.ReactNode
}
export const BannerUpsertDialog = (props: Props) => {
    const table = useProTable()

    const onSubmit = async (data: Record<string, any>) => {
        await bannerUpsert(data as BannerUpsertParams)
        await table.refresh()
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
                position: {
                    type: 'select',
                    label: "位置",
                    defaultValue: props.entity?.position ?? BannerPosition.home,
                    placeholder: "请选择位置",
                    options: [
                        { label: '主页', value: BannerPosition.home },
                    ]

                },
                imageURL: {
                    type: 'input',
                    defaultValue: props.entity?.imageURL ?? "",
                    label: "图片链接"
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

