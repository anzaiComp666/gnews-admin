
import { makeBreadcrumbMeta } from "@/pro-components/pro-sidebar/breadcrumbs/util";
import { PropsWithChildren } from "react";

export async function generateMetadata(props: {
    params: Promise<{
        appId: string
    }>
}) {
    const params = await props.params
    return {
        title: "首页模块",
        other: {
            ...makeBreadcrumbMeta([{ title: "首页模块", pathname: `/app/${params.appId}/home-modules` }]),
        },
    }
}

export default ({ children }: PropsWithChildren) => {
    return children
}