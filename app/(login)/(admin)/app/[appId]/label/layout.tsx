
import { makeBreadcrumbMeta } from "@/pro-components/pro-sidebar/breadcrumbs/util";
import { PropsWithChildren } from "react";

export async function generateMetadata(props: {
    params: Promise<{
        appId: string
    }>
}) {
    const params = await props.params
    return {
        title: "标签管理",
        other: {
            ...makeBreadcrumbMeta([{ title: "标签管理", pathname: `/app/${params.appId}/labels` }]),
        },
    }
}

export default ({ children }: PropsWithChildren) => {
    return children
}