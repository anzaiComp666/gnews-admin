import { labelInfos } from "@/actions/video/label/infos";
import { IBreadcrumbItem, makeBreadcrumbMeta } from "@/pro-components/pro-sidebar/breadcrumbs/util";
import { PropsWithChildren } from "react";


export async function generateMetadata(props: {
    params: Promise<{
        appId: string,
        labelId: string[],
    }>
}) {


    const params = await props.params
    const infos = await labelInfos(Number(params.appId), params.labelId)
    const infosMap = new Map(infos.map(i => [i.labelId, i]))

    const items: IBreadcrumbItem[] = []
    let basePath = `/app/${params.appId}/label`
    for (const element of params.labelId) {
        basePath += `/${element}`
        items.push({
            title: infosMap.get(element)?.labelName ?? element,
            pathname: basePath
        })
    }


    return {
        title: '标签管理-' + items[items.length - 1].title,
        other: {
            ...makeBreadcrumbMeta(items)
        },
    }
}

interface Props extends PropsWithChildren {
}

export default (props: Props) => {
    return props.children
}