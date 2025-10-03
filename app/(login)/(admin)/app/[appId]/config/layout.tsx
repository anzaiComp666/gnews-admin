
import { makeBreadcrumbMeta } from "@/pro-components/pro-sidebar/breadcrumbs/util";
import { PropsWithChildren } from "react";

export async function generateMetadata(props: {
    params: Promise<{
        appId: string
    }>
}) {
    const params = await props.params
    return {
        title: "应用配置",
        other: {
            ...makeBreadcrumbMeta([{ title: "应用配置", pathname: `/app/${params.appId}/config` }]),
        },
    }
}

export default ({ children }: PropsWithChildren) => {
    return children
}