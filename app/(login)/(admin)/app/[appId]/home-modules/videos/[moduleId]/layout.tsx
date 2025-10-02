import { homeFeedModuleInfos } from "@/actions/app/home-feed-module/info"
import { makeBreadcrumbMeta } from "@/pro-components/pro-sidebar/breadcrumbs/util"
import { PropsWithChildren } from "react"

export async function generateMetadata(props: {
    params: Promise<{
        appId: string,
        moduleId: string,
    }>
}) {


    const params = await props.params
    const infos = await homeFeedModuleInfos(Number(params.appId), [Number(params.moduleId)])

    return {
        title: infos[0].name,
        other: {
            ...makeBreadcrumbMeta([
                { title: infos[0].name, pathname: `/app/${params.appId}/home-modules/videos/${params.moduleId}` },
            ])
        },
    }
}


export default (props: PropsWithChildren) => {
    return props.children
}