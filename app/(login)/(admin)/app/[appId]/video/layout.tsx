
import { makeBreadcrumbMeta } from "@/pro-components/pro-sidebar/breadcrumbs/util";
import { PropsWithChildren } from "react";

export async function generateMetadata(props: {
    params: Promise<{
        appId: string
    }>
}) {
    const params = await props.params
    return {
        title: "视频管理",
        other: {
            ...makeBreadcrumbMeta([{ title: "视频管理", pathname: `/app/${params.appId}/video` }]),
        },
    }
}

export default ({ children }: PropsWithChildren) => {
    return children
}