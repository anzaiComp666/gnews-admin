import { makeBreadcrumbMeta } from "@/pro-components/pro-sidebar/breadcrumbs/util";
import { PropsWithChildren } from "react";


export async function generateMetadata(props: {
    params: Promise<{ labelId: string[], appId: string }>
}) {
    const params = await props.params
    return {
        title: "T0001标签管理",
        other: {
            ...makeBreadcrumbMeta({ title: "T0001标签管理", pathname: `/app/${params.appId}/labels/${params.labelId.join("/")}` })
        },
    }
}

interface Props extends PropsWithChildren {
}

export default (props: Props) => {
    return props.children
}