import { BreadcrumbChunk } from "@/components/breadcrumb-chunk";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    params: Promise<{
        labelId: string[]
    }>
}

export default async (props: Props) => {
    const params = await props.params

    return (
        <>
            <BreadcrumbChunk title={params.labelId.join('/')} pathname={`/app/1/labels/${params.labelId.join('/')}`} />
            {props.children}
        </>
    )
}