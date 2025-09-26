import { BannerUpsertParams, BannerUpsertSchema } from "@/app/actions/banner/banner-upsert"
import { IBannerEntity } from "@/lib/dao/biz/banner"
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
                    type: 'input',
                    defaultValue: "",
                    label: "ID"
                },
                name: {
                    type: 'input',
                    defaultValue: "",
                    label: "名称"
                },
                imageUrl: {
                    type: 'input',
                    defaultValue: props.entity?.imageURL || '',
                    label: "图片链接"
                },
                status: {
                    type: 'input',
                    defaultValue: props.entity?.status || 'disabled',
                    label: "状态"
                },
                jumpType: {
                    type: 'input',
                    defaultValue: "",
                    label: "跳转类型"
                },
                jumpData: {
                    type: 'input',
                    defaultValue: "",
                    label: "跳转数据"
                },
            }}
        />
    )
}

